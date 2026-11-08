<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Serve landing videos from `public/media` (same origin, range requests): H.264 Main 3.1, 30 fps, 1 keyframe/s (scrub clips every 6 frames), maxrate ~1.1 Mbps, faststart, no audio, with a `.webp` poster. Keep each clip under ~1.5 MB.
- All page videos go through `src/lib/videoCoordinator.ts` (preload one screen ahead, play only the most visible within the device budget, respect manual pause). Pause Three.js loops off-screen.
- Keep landing copy in `src/data/content.ts` and diagnosis rules in a pure tested module so business changes stay independent of rendering.
- Lazy-load browser-only Three.js scenes after intersection; retain CSS and poster fallbacks to preserve SSR and reduced-motion accessibility.
- Reuse the WhatsApp tracking helper for all contact messages so persona and quiz submissions preserve attribution.
