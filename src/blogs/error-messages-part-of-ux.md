
Errors are not edge cases; they are a primary user flow. Every system fails sometimes. The question is whether your product uses those moments to teach, recover, and build trust—or to confuse and block.

Design for clarity first so the user immediately understands what happened and what to do next. Make every error actionable with a recommended step, and explain conditions without implying blame. Keep the language calm and reassuring—panic helps no one—and apply the same tone, structure, and placement everywhere so users don’t have to relearn the rules. Finally, make sure what the user sees maps cleanly to structured logs so support can follow the trail.

A solid error has a concise, human title, a short line of context about what the user was doing, and—when it’s stable enough to be useful—a plain‑language cause. It also proposes the next step explicitly, states whether the message should disappear on its own or remain visible, and includes a small reference code the user can share with support.

```txt
[Title] We couldn’t save your note
[Context] Connection dropped while syncing.
[Action] Retry
[Support] Reference: SYNC-7M2K
```

For transient network issues, say “Can’t connect. Check your internet and try again.” For validation problems, be specific and helpful, as in “Email must be a valid address (e.g. name@domain.com).” When rate limits kick in, set expectations: “You’ve reached today’s limit. Try again in 24 hours.” For permissions, point to the fix: “You don’t have access to this. Ask an admin to grant ‘Billing Viewer’.” And for true unknowns, stay calm and honest: “Something went wrong. We’re investigating. Try again in a moment.”

Tone guidelines: short, neutral, and empathetic. Avoid jargon like "500" or "null pointer" unless the audience is explicitly technical.

Use inline messages for field‑level validation where fast feedback matters. Rely on toasts for transient, non‑blocking problems that already have safe fallbacks. Reserve modals for destructive or high‑impact moments that require acknowledgment. When the main content can’t render, switch the entire page state and offer a retry along with basic diagnostics.

Make recovery the default. Provide a one‑click action like Retry, Restore Draft, or Reconnect. Where it’s safe, auto‑retry with backoff and only surface the error if retries fail. Preserve user input—drafts, queued work, idempotency keys—so attempts are safe to repeat. When it fits the product, offer offline‑first fallbacks that sync later.

```ts
// Domain-specific, typed errors
export type AppError =
  | { kind: "network"; ref: string }
  | { kind: "validation"; field: string; rule: string; ref: string }
  | { kind: "permission"; role: string; ref: string }
  | { kind: "rate_limit"; resetAt: Date; ref: string }
  | { kind: "unknown"; ref: string };

export function renderError(e: AppError) {
  switch (e.kind) {
    case "network":
      return {
        title: "Can’t connect",
        body: "Check your internet and try again.",
        action: { label: "Retry" },
      };
    case "validation":
      return {
        title: `Fix “${e.field}”`,
        body: humanizeRule(e.rule),
        inline: true,
      };
    case "permission":
      return {
        title: "Access required",
        body: `Ask an admin to grant ${e.role}.`,
      };
    case "rate_limit":
      return {
        title: "Too many requests",
        body: `Try again after ${e.resetAt.toLocaleTimeString()}.`,
      };
    default:
      return { title: "Something went wrong", body: "Please try again." };
  }
}
```

Every user‑facing error should carry a short reference ID. Log the event with context, the user (or anonymous) identifier, and correlation IDs so incidents are traceable. Link the UI reference directly to a searchable support log, and measure retries, dismissals, and time‑to‑recovery as real UX metrics.

Before shipping, read the message through the user’s mental model. Confirm there’s a single clear next action. Verify that input survives failure and that unknowns are phrased calmly—ideally with an automatic retry behind the scenes. And make sure support can pull the incident in under thirty seconds using the reference code.

Error messages are product moments. Done well, they convert failure into confidence by helping users recover quickly and teaching them what to expect next.
