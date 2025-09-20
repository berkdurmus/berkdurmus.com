If you’ve ever tried to remember “that one thing someone said three Tuesdays ago at 4:13pm,” you’ve felt the pain of flat, unstructured memory. Traditional summarization-based memory systems are like stuffing your life into a single sock drawer: eventually you can’t find anything, socks contradict each other, and once you compress it, good luck uncompressing it without losing a few.

This post is a deep dive into a different approach we built: a Self‑Evolving Hybrid Layered Structured Memory System. Think of it as a living, versioned, schema-aware, contradiction‑resistant memory that grows with the user—without devolving into semantic soup or rigid schemas that fossilize on day one. Also, yes, we use JSON Patches like surgical tools instead of sledgehammers.

### TL;DR

Flat text memories are brittle: summaries lose signal, small edits cause unintended changes, and rollback is a nightmare. Pure vectors are great for “vibes” but not for precise updates. Pure rigid schemas are tidy yet can’t evolve fast enough. We combine a structured core, episodic records, and a schema‑evolution manager so memory can grow safely and stay queryable. Everything is versioned and updated via JSON Patch so changes are targeted, auditable, and reversible.

### The Problem We Set Out to Solve

Our previous two‑phase memory (Extract → Summarize → Store flat text) created technical and UX friction. Important micro‑facts vanished in summarization. We had no way to make surgical updates, so any change risked touching unrelated text. There was no version history to support rollbacks. Contradictions were summarized away instead of resolved. We lost typed distinctions between facts, preferences, episodes, and goals. The system couldn’t adapt to new info types without manual schema work. And retrieval fell back to brittle regex or expensive re‑embedding.

### The Mental Model: Memory as a Living Organism

Users don’t speak in schemas; they speak in episodes. Systems, however, need structure to reason, retrieve, and evolve reliably. Our compromise uses four parts: Core Memory for canonical typed facts updated via JSON Patch, Episodic Storage to preserve wording, tone, time, and topic links, a Schema‑Evolution manager to detect patterns and promote new categories, and Meta‑Memory to generate insights and track active problems.

The result is both human‑faithful (we keep episodes!) and machine‑tractable (we structure facts!)—with an upgrade path when new information keeps showing up.

### Architecture (Dessert First)

```mermaid
graph LR
  subgraph Core["Self-Evolving Core Memory"]
    CM["Structured JSON"];
  end

  subgraph Episodic["Enhanced Episodic Storage"]
    ES["Convo Snippets + Metadata + Links"];
  end

  subgraph Evolution["Schema Evolution Manager"]
    SEM["Pattern detection, creation, promotion"];
  end

  subgraph Meta["Meta-Memory Generation"]
    MM["Active problems, insights, summaries"];
  end

  ES-->CM;
  SEM<-->CM;
  MM-->CM;
  ES<-->MM;
```

### Core Memory: Structured, Precise, Patchable

The core is a strongly structured JSON document that captures the user’s durable facts and preferences. It combines a well‑defined schema with a `dynamicCategories` space for emerging information.

```json
{
  "healthProfile": {
    "conditions": [{ "name": "Type 2 Diabetes", "since": "2018-03", "confidence": 0.95 }],
    "other": { "recentA1c": "6.8 as of November 2023" }
  },
  "dietaryProfile": {
    "preferences": { "likes": ["greek yogurt", "berries"], "dislikes": ["kale"] }
  },
  "dynamicCategories": {
    "exerciseRoutine": {
      "description": "User's exercise habits",
      "data": { "preferred_activities": ["walking", "swimming"] }
    }
  },
  "_meta": {
    "version": 7,
    "lastUpdated": "2024-11-30T12:34:56Z",
    "schemaEvolution": []
  }
}
```

Key properties include targeted updates via JSON Patch (RFC 6902), full versioning so we can diff, audit, and roll back, and a dynamic space for uncaptured patterns that avoids polluting the core prematurely.

#### JSON Patch: Surgical Edits, Not Summaries

Instead of re‑summarizing, we apply precise patches so we don’t accidentally delete unrelated facts.

```json
[
  {
    "op": "add",
    "path": "/dynamicCategories/exerciseRoutine/data/yoga",
    "value": "three times weekly"
  },
  {
    "op": "add",
    "path": "/dynamicCategories/stressManagement",
    "value": {
      "description": "User's stress management techniques",
      "data": { "techniques": ["yoga"] },
      "createdAt": "2023-12-15T10:30:00Z"
    }
  }
]
```

Contradiction example:

```json
{ "op": "replace", "path": "/healthProfile/conditions/0/since", "value": "2019-03" }
```

We record confidence and source alongside the patch metadata in the event log (see Versioning), rather than shoving it into the core doc itself unless you prefer to mirror it in `_meta`.

#### Versioning and Audit Trail

We maintain an append‑only event stream of patches. The current state is the fold of all accepted patches. Rollback = replay without the bad patch(es). Cherry‑pick = replay a subset.

```ts
// TypeScript sketch
type JsonValue = null | boolean | number | string | JsonValue[] | { [k: string]: JsonValue };

export interface JsonPatchOp {
  op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
  path: string;
  value?: JsonValue;
  from?: string; // for move/copy
}

export interface MemoryEvent {
  id: string;
  timestamp: string;
  actor: 'system' | 'user' | 'agent';
  source?: string; // e.g., message id, tool name
  confidence?: number;
  rationale?: string;
  patch: JsonPatchOp[];
}

export interface VersionedMemory {
  version: number;
  document: JsonValue;
}

export function applyEvents(base: JsonValue, events: MemoryEvent[]): VersionedMemory {
  // In prod, use a robust RFC6902 lib; this is conceptual
  let doc = structuredClone(base);
  let version = 0;
  for (const ev of events) {
    for (const op of ev.patch) {
      // applyOp(doc, op) — left as an exercise; libraries exist
    }
    version += 1;
  }
  return { version, document: doc };
}
```

Operationally, we store events in an append‑only collection (indexed by `userId, timestamp`) and periodically materialize snapshots for fast reads.

### Enhanced Episodic Storage: Keep the Human Bits

Core memory captures facts; episodes capture the story. We store important snippets with rich metadata and relational links back to the core.

```json
{
  "timestamp": "2023-12-05T18:30:22Z",
  "content": "I tried that dawn phenomenon strategy... It's been working really well!",
  "metadata": {
    "topics": ["dawn phenomenon", "blood glucose", "insulin management", "success story"],
    "sentiment": "positive",
    "importance": 8,
    "relatedPaths": ["/healthProfile/conditions/0"]
  }
}
```

Why it matters: this preserves recall specificity—“What exactly did we decide last week?”—keeps attribution clear—“Who said this and when?”—and grounds facts by linking episodes to the core fields they influenced.

#### Retrieval Sketch

```ts
interface Episode {
  timestamp: string;
  content: string;
  metadata: {
    topics: string[];
    sentiment?: 'positive' | 'neutral' | 'negative';
    importance?: number; // 1..10
    relatedPaths?: string[];
  };
}

function scoreEpisode(ep: Episode, queryTopics: string[], relatedPaths?: string[]): number {
  const topicOverlap = ep.metadata.topics.filter((t) => queryTopics.includes(t)).length;
  const pathOverlap =
    relatedPaths?.filter((p) => ep.metadata.relatedPaths?.includes(p)).length ?? 0;
  const importance = ep.metadata.importance ?? 5;
  return topicOverlap * 3 + pathOverlap * 4 + importance;
}

function retrieveEpisodes(
  episodes: Episode[],
  queryTopics: string[],
  relatedPaths?: string[],
  k = 5
): Episode[] {
  return episodes
    .map((ep) => ({ ep, score: scoreEpisode(ep, queryTopics, relatedPaths) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.ep);
}
```

### Active Problem Tracking: Memory That Plans With You

Some user details are not just facts; they’re ongoing quests. We track problems, attempted solutions, and outcomes over time.

```json
{
  "description": "Post-dinner glucose spikes",
  "status": "active",
  "priority": 8,
  "attempts": [
    {
      "date": "2023-11-20",
      "approach": "Walking after dinner",
      "outcome": "20-30 point reduction",
      "successful": true
    },
    {
      "date": "2023-11-25",
      "approach": "Reduced carb portion",
      "outcome": "40-50 point reduction",
      "successful": true
    }
  ]
}
```

This gives the system memory of what worked for this person—so advice gets sharper over time.

### Schema Evolution: From Chaos to Categories (Without Manual Babysitting)

Rigid schemas break; amorphous blobs rot. The evolution manager inspects uncategorized and dynamic data, then promotes patterns to first‑class citizens.

Process: mine `uncategorized` and `dynamicCategories` for recurring keys and topics, track usage frequency and recency along with cross‑links, propose a normalized category when thresholds are met, migrate existing instances into the new structure, and log the evolution in `_meta.schemaEvolution`.

Before → After:

```json
{
  "uncategorized": {
    "sleep_note_1": "Having trouble staying asleep",
    "sleep_note_2": "Higher BG after poor sleep",
    "sleep_note_3": "Started using sleep mask"
  }
}
```

```json
{
  "sleepHealth": {
    "duration": "6-7 hours",
    "challenges": "Difficulty staying asleep",
    "impact": "Higher morning BG after poor sleep",
    "aids": ["sleep mask"]
  }
}
```

Detection sketch:

```ts
interface EvolutionCandidate {
  key: string;
  occurrences: number;
  relatedTopics: string[];
}

function detectCandidates(doc: any): EvolutionCandidate[] {
  // Walk uncategorized/dynamic, tally recurring structures/terms
  // Return candidates ordered by support
  return [];
}

function promoteCategory(doc: any, candidate: EvolutionCandidate, categoryName: string): any {
  // Create structured destination, migrate instances, update _meta
  return doc;
}
```

### Contradiction Handling: Be Picky, Not Forgetful

Contradictions aren’t failure; they’re progress with context. We detect conflicting fields (for example, the diagnosis year), compare source credibility and confidence, replace or deprecate the old value with a patch, and record the event with its rationale and updated confidence.

```json
{
  "op": "replace",
  "path": "/healthProfile/conditions/0/since",
  "value": "2019-03",
  "_event": { "confidence": 0.98, "source": "user_correction" }
}
```

We retain the prior state in the event log for full auditability.

### Migration: From Flat Text to Living Structure

To convert legacy summaries into the new model, extract entities such as conditions, medications, preferences, and habits. Map high‑confidence items into core fields and route the rest to `dynamicCategories` or `uncategorized` with rationale. Generate JSON Patches instead of wholesale writes. When confidence is low, surface diffs for approval. Finally, keep the original sentences as episodes and link them to the fields they influenced.

Example:

Flat:

```text
User has type 2 diabetes, diagnosed in 2018. Takes Metformin. Likes Greek yogurt but dislikes kale. Tries to walk daily.
```

Structured:

```json
{
  "healthProfile": {
    "conditions": [{ "name": "Type 2 Diabetes", "since": "2018" }],
    "medications": [{ "name": "Metformin" }]
  },
  "dietaryProfile": { "preferences": { "likes": ["greek yogurt"], "dislikes": ["kale"] } },
  "dynamicCategories": {
    "exerciseRoutine": { "description": "User's exercise habits", "data": { "walking": "daily" } }
  }
}
```

### Retrieval: Context Packing Without Hallucinating

When answering a question, we retrieve targeted core fields by JSON pointer paths, the top episodes ranked by topic or path overlap and importance, and any active problems or goals that provide context. We then format a succinct, grounded context for the model—no need to ship the entire memory document.

```ts
interface RetrievalQuery {
  topics: string[];
  paths?: string[];
}

function retrieveContext(core: any, episodes: Episode[], q: RetrievalQuery) {
  const relevantEpisodes = retrieveEpisodes(episodes, q.topics, q.paths, 5);
  const coreSnippets = (q.paths ?? []).map((p) => ({ path: p, value: getByPointer(core, p) }));
  return { coreSnippets, relevantEpisodes };
}
```

### Storage & Ops: Practical Considerations

Operationally, store memory events (patches) in an append‑only table such as `MemoryEvents(userId, timestamp)` and materialize snapshots in `MemorySnapshots(userId, version)`. Index `metadata.topics`, `metadata.relatedPaths`, and timestamps on episodes for fast retrieval. Treat patch application as transactional; if validations fail, reject and queue for review. Record schema changes as first‑class events with migration details. With snapshots and events together, rollback becomes routine.

### Guardrails (a.k.a. Things We Learned The Hard Way)

Don’t over‑summarize; keep the human phrasing in episodes because you’ll need it later. Don’t over‑evolve the schema; promotions should be rare and justified. Prefer additive changes and reserve replacements for true contradictions. Keep confidence and source on the event as well as in the document so attribution remains clear. And make retrieval boring on purpose—deterministic, explainable scoring beats magical but flaky recall.

### Putting It All Together: A Day in the Life

A user says, “I started yoga three times a week for stress.” Extraction detects both an exercise update and a stress technique. The system emits patches to add `exerciseRoutine.data.yoga` and create a `stressManagement` dynamic category. The sentence is stored as an episode with topics like “yoga” and “stress,” linked to the related paths. As `stressManagement` shows up more often, the evolution manager proposes promoting it to a core category and migrates existing instances. A week later, the user asks, “What helped my morning sugars?” Retrieval pulls dawn‑phenomenon facts from core plus episodes about a protein snack before bed and insulin tweak advice, producing a grounded, personal response.

### Why This Works

It combines precision where it matters—core changes via patches—with richness where it helps—episodes—and adaptation over time through schema evolution. The result is debuggable, auditable, and explainable, which is exactly what you want when a system starts remembering things about people.

### Appendices

#### Extended Schema Sketch (Selected)

This is a trimmed, illustrative slice of the extended schema we support. The point isn’t to memorize it; it’s to show where dynamic categories fit beside opinionated structure.

```ts
export interface HealthProfile {
  conditions: Array<{
    name: string;
    since?: string;
    status?: 'active' | 'managed' | 'resolved';
    notes?: string;
    confidence?: number;
  }>;
  medications?: Array<{
    name: string;
    dosage?: string;
    frequency?: string;
    purpose?: string;
    startDate?: string;
    endDate?: string;
  }>;
  allergies?: { food?: string[]; medication?: string[]; environmental?: string[] };
  sleepPatterns?: { duration?: string; quality?: string; challenges?: string[] };
  other?: Record<string, unknown>;
}

export interface DynamicCategory<T = unknown> {
  createdAt: string;
  description: string;
  confidence?: number;
  usageCount?: number;
  data: T;
}

export interface CoreMemory {
  healthProfile?: HealthProfile;
  dietaryProfile?: unknown;
  activityProfile?: unknown;
  dynamicCategories?: Record<string, DynamicCategory>;
  uncategorized?: Record<string, unknown>;
  _meta?: {
    lastUpdated?: string;
    version?: number;
    schemaEvolution?: Array<{
      timestamp: string;
      change: string;
      newCategory?: string;
      reason?: string;
    }>;
  };
}
```

#### Minimal API Shape

```http
POST /memory/{userId}/events
Body: MemoryEvent

GET  /memory/{userId}
→ materialized document + version

GET  /memory/{userId}/episodes?topics=...&paths=...&k=5
→ episodic snippets

POST /memory/{userId}/schema/promote
Body: { candidate: string, proposedName: string, rationale: string }
```

### Final Thought

Summaries are great for novels, not for identities. If your assistant is going to “remember,” it should remember truthfully, flexibly, and with receipts. A self‑evolving layered structured memory gives you that—precision without brittleness, context without chaos, and growth without forgetting.
