# spa/assets/motion — distribution artifacts, not site figures

These four files are **hosted bytes with stable URLs**. Nothing in the SPA
references them, and nothing may.

| file | what it is |
|---|---|
| `provenance.mp4` | 1080×1080, 30fps, 39.06s, H.264 High, one silent AAC track |
| `poster.png` | frame 660 — see the poster rule below |
| `contact-sheet.png` | every card in the film as one still image: the film's reduced-motion path |
| `provenance.transcript.txt` | the complete text of the film, in order, with timings |

## Adding a `<video>` to the SPA is a rejected design

Ruled in `docs/plans/viz-kit.md` §8. Three reasons, in increasing order of force:

1. **It would be one mechanism drawn twice.** The site already makes the
   provenance argument statically, on five specialization pages, in the source
   line under every figure. A video of it is the failure
   `spa/components/SPECIALIZATIONS-CONTRACT.md` §7.3 exists to prevent.
2. **It cannot satisfy the site's motion doctrine, structurally.** Both endpoints
   in the DOM at all times, the removed thing ghosts rather than vanishing, every
   transition carries a `prefers-reduced-motion` cancel, both states legible
   without motion — that is not a style, it is the conclusion that *motion is
   never the carrier of an argument on this site*. A video has no DOM, no media
   query, no cancel, and exactly one baked palette out of six. There is no
   complying version.
3. **The film fails the motion-honesty test on its own evidence.** The measured
   finding from building it: *the strike is the only motion in the film that
   earns anything, and what it earns is emphasis, not comprehension — a static
   strike reads identically.*

What the film bought is **reach, not comprehension**: an SVG on a specialization
page cannot be seen without a click-through into a SPA, and a 39-second square
video plays in-feed without one. That is a distribution argument, judged by
distribution criteria, and it is why the files stay.

`spa/tools/site motion` check **M-g** fails the build if any `.jsx` grows a
`<video>` element or a reference to `assets/motion/`. The rule is enforced by a
gate, not by this paragraph.

## The poster rule

The poster is **frame 660, not frame 150**, because a poster is seen without the
film playing and frame 150 ("Cut cloud spend 70%.") reads as Geoff asserting it
rather than as the claim the next frame strikes through. Generalised: **a poster
frame must never be a frame in which a struck claim is unstruck.**

## Distribution rule

Wherever the film is posted, the post body carries the transcript. The contact
sheet is the film's reduced-motion path, and a reduced-motion path nobody can
reach is not a path. Platform autoplay (LinkedIn) is an unfixable regression on
a surface that is not ours; it is stated as one rather than apologised for.

## Where it is authored

`/Volumes/m2ext/code/geoffmilleraz/motion-lab` — a sibling repo with its own
`package.json` and `node_modules`. **`geoffmiller-cloud` has no npm artifact
anywhere and never will** (`CLAUDE.md` rule 1). Consuming a Node-built artifact
is allowed; authoring inside this repo is not. `motion-lab/deliver.sh` asserts
that `package.json`, `package-lock.json` and `node_modules` do not exist here and
fails loudly if they do — the boundary is enforced by a guard, not a comment.

**Licence:** Remotion is source-available and free for an individual, commercial
use included. Reversal trigger: Geoff incorporates and passes 3 employees, at
which point it is $25/seat/mo.
