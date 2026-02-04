Good security is mostly disciplined pruning.

I don’t mean “lock everything down and call it a day.” I mean: stop giving the system extra ways to be used wrong at 2am.

Every additional parameter is a new branch where something can break, be misused, or be attacked. The fastest way to improve safety is to shrink the surface area—especially the number of knobs someone can tweak at runtime.

If you like the math framing: let \( P \) be the count of user-facing parameters and \( V \) the number of valid states per parameter. The configuration space is \( V^P \). Even with small \( V \), growing \( P \) explodes the number of states you must test, document, monitor, and defend.

In practice it’s simpler: more knobs → more “creative” configurations → more incidents.

In healthcare systems this gets expensive fast, because “a little weird” isn’t just annoying—it can change what happens to a patient.

Here’s what tends to happen when options multiply:

- Individually safe flags combine into unsafe states.
- Environments drift apart until debugging becomes guesswork.
- Innocent‑looking switches bypass rate limits, guardrails, or auditing.
- Ops load rises because the system now depends on tribal knowledge of nine different toggles.

None of this is theoretical. It’s what “flexibility” looks like after a few quarters.

The move I like is capability over configuration: offer a safe verb instead of a toolbox of tunables.

For example, give people a `mode` like `deterministic` or `creative` instead of raw `temperature`, `top_p`, and `top_k`. Most callers don’t want to be prompt engineers; they want an outcome. Make them express intent, then make the system pick safe parameters.

Some practical guardrails that actually help:

- Reveal options progressively, with boring defaults.
- Put advanced switches behind an explicit “advanced mode” with warnings and audits.
- Constrain values with enums/ranges/schemas so invalid states are unrepresentable.
- Default to safety: least‑privilege roles, input allowlists, output filters.
- Make operations idempotent so retries don’t amplify risk.
- Treat high‑risk changes like one‑way doors: require review, or add a time delay.

Bad surface (lots of tunables encourage fragile behavior):

```ts
invokeLLM({
  prompt, temperature, top_p, top_k, presence_penalty, frequency_penalty,
  max_tokens, stop, system, tools, toolChoice
});
```

Safer surface (capability + policy, not raw knobs):

```ts
invokeStructuredTask({
  prompt,
  mode: "deterministic",          // or "creative"
  policy: "clinical_note_summarize", // enforces schema + allowlists
  maxOutput: "short",              // bounded outputs
});
```

Under the hood you still tune parameters—but privately, in code, with tests and audits. Users choose intent; the system chooses safe parameters.

In healthcare, schema‑first workflows pay off:

- Parse inputs into typed objects and reject free text for critical paths.
- Allowlist tools so each step has only what it needs (no raw web or shell access by default).
- Keep outputs bounded (summaries, codes, structured fields) rather than free‑form paragraphs for decision‑making steps.
- Add human‑in‑the‑loop checkpoints when uncertainty rises or actions carry high impact.
- Log everything as structured events: inputs, outputs, decisions, and overrides.

Flexibility and safety can coexist, but not if you ship a cockpit to everyone.

Ship a small, safe default surface that covers most cases. For the rest, offer an explicit advanced interface behind feature gates and audit trails. When someone overrides the defaults, capture a brief reason and have those overrides expire automatically.

Before adding another parameter, I like asking a few annoying questions:

- Does it expand capability or merely shape output?
- Could a discrete mode replace a continuous slider?
- What happens at the extremes, and are those outcomes bounded?
- Can types and schemas make invalid states impossible to represent?
- If nobody reads the docs (they won’t), is the default still safe?

Security, reliability, and velocity are all functions of simplicity. Reducing parameters reduces blast radius, shortens incident timelines, and makes outcomes more predictable—especially in clinical contexts.

Start by removing one knob. If nobody misses it, remove another.


