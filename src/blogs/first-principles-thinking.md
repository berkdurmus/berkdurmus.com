First principles thinking is the habit of dissolving a problem into the smallest statements you’re willing to defend with evidence, then rebuilding from those primitives instead of from precedent.

It usually feels slower at the start because you’re refusing to borrow certainty. You don’t get to say “that’s just how we do it” and move on. (I still catch myself reaching for that line when I’m tired or trying to look decisive.) The point isn’t to be original; it’s to be honest about what you *know* versus what you’ve inherited.

A practical exercise: write two lists.

The first is everything believed about the problem—constraints, user behavior, technical realities, business pressures. The second is a ruthless audit: for each belief, what’s the evidence, how recent is it, and what would falsify it? If a belief can’t be defended, it isn’t a constraint. It’s an assumption wearing a name tag.

This matters because teams quietly treat “we tried that before,” “legal won’t allow it,” or “our users don’t do X” as physics. Sometimes it *is* physics. Often it’s just old trauma.

Consider a concrete case. A clinic struggles to process prescription refill requests within 48 hours. Requests arrive through a messy mix: patient portal messages, pharmacy faxes, phone calls, voicemails that someone transcribes, and the occasional walk‑in “I’m out today.” The story becomes: “we need more staff.”

Using first principles, we avoid solutions for a moment and ask: what’s the invariant we actually care about? It’s not “tickets closed.” It’s time from patient request to *safe* fulfillment, under policy, with clear communication. What are the irreducibles?

- A request has to be captured somewhere reliable.
- Safety checks have to happen.
- A clinician has to authorize when policy says so.
- The patient has to be told what’s happening.
- The EHR stays the source of truth.

Everything else is negotiable.

Now test the popular beliefs with measurement instead of vibes.

“Not enough staff.” How many requests arrive per hour by daypart? What portion are routine chronic meds with stable labs? How long do the top three steps actually take (timed, not guessed)? “The EHR is slow.” Slow where—waiting on information, clicking through five screens, or the policy that says you can’t refill without a recent visit? “Patients call because they can’t use the app.” Which screens do they fail on—and what are they trying to do when they give up?

When you do that audit, you often find two boring truths. First, a majority of requests follow a repeatable pattern: medication on file, no new contraindications, refill window is valid, and required labs/vitals are in range. Second, the real bottleneck isn’t touch time. It’s waiting. Requests sit in a pile until someone has “a block of time,” then get processed in a batch. Lead time balloons because the queue does.

Now rebuild from the primitives.

If the safety checks are protocolized, turn them into something explicit: a small checklist/ruleset that reads EHR facts and yields one of three outcomes—approve, deny with a reason, or escalate. If authorization is sometimes required, ask for it *in parallel* with gathering missing facts, not after. And if the queue is the enemy, stop feeding it: evaluate each request as it arrives so routine cases move immediately and ambiguous cases get surfaced early.

Communication is part of the system, not a courtesy. A timestamped status (“received,” “needs one thing,” “sent to pharmacy”) often reduces repeat calls because it removes uncertainty. People don’t call because they love phone trees; they call because silence is scary.

The resulting system is intentionally unglamorous: a thin workflow that ingests a request, pulls only the minimum EHR fields needed for the protocol, runs deterministic checks, and records a decision. Escalations land in a focused inbox that highlights the *one missing fact* (e.g., “last A1C is over a year old”) with a one‑tap action. Logs are facts, not essays: which rule version ran, what inputs it saw, what it output, and who overrode it.

Outside healthcare, the same move works almost everywhere. When a team says a feature “will take weeks,” first principles asks a different set of questions:

- What must be true for one real user to complete one real happy path?
- What can be stubbed without lying?
- Where can the system decide deterministically so humans only review ambiguity?
- Are we waiting on work, or waiting on *information*?

First principles doesn’t mean reinventing wheels. It means refusing to carry assumptions you can’t justify.

A good litmus test: can you explain the solution as simple if‑this‑then‑that statements grounded in the world, not your tooling?

“If the medication is chronic, labs are within range, and there are no new contraindications, then approve and notify; otherwise escalate with the missing fact.” A clinician can read that. An auditor can read that. An engineer can build that. If your explanation depends on “that’s how we’ve always done it” or “the system won’t let us,” you’re living downstream of assumptions you haven’t examined yet.

Practically, the habit is simple: write the primitives, delete the ones you can’t defend, measure where reality disagrees with your story, then rebuild the shortest chain of cause and effect that achieves the invariant you care about.

Only then choose tools. Otherwise you’re just adding polish to a superstition.
