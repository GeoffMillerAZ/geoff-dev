# Specializations — page-builder contract

You are building **one** of five capability pages. This document is the whole
interface between your file and the shared scaffolding. If something you need is
not in here, ask before inventing it — parallel authors inventing the same thing
several ways is the failure mode this file exists to prevent.

| Page | Your file | Your global | Signature global | Its record |
|---|---|---|---|---|
| FinOps | `spa/components/SpecFinOps.jsx` | `window.SpecFinOps` | `FinOpsSignature` | `specializations[0]`, `id: "finops"` |
| DevX | `spa/components/SpecDevX.jsx` | `window.SpecDevX` | `DevXSignature` | `specializations[1]`, `id: "devx"` |
| Agentic Engineering | `spa/components/SpecAgentic.jsx` | `window.SpecAgentic` | `AgenticSignature` | `specializations[2]`, `id: "agentic"` |
| CI/CD | `spa/components/SpecCICD.jsx` | `window.SpecCICD` | `CICDSignature` | `specializations[3]`, `id: "cicd"` |
| Compliance & Governance | `spa/components/SpecGovernance.jsx` | `window.SpecGovernance` | `GovernanceSignature` | `specializations[4]`, `id: "governance"` |

**If you are building CI/CD or Compliance & Governance, read section 7 as well.**
Everything settled in the data for those two — and it is a lot, because both are
gated by `docs/specializations-claim-verdicts.md` — is listed there. Section 7 is
not advisory; it is the part of the contract your record already commits you to.

Already done for you, do **not** touch:

- `spa/data.js` — the `specializations` collection, the `specializations`
  feature flag (default **off**), and the local/URL flag-override shim.
- `spa/components/Specializations.jsx` — index page, `SpecPageShell`,
  `ProofRail`, `SpecMetric`, `PlaceholderBadge`, `SpecSection`, `SpecSignature`.
- `spa/components.css` — every `.spec-*` rule, including the `--spec-tone-*`
  aliases and their light-theme overrides.
- `spa/index.html` — the `<script>` tags for **all six** component files are
  already registered, including yours. Do not add one. `SpecCICD.js` and
  `SpecGovernance.js` are registered ahead of their authors, so until those land
  the browser logs a 404 for each and the route renders `SpecPagePending` — that
  is the designed degradation, not a bug you introduced.
- `spa/components/Shell.jsx`, `Boot.jsx`, `CommandPalette.jsx` — nav row, route,
  deep links, palette entries. **Nothing there is per-page.** Specializations is
  one route with a `?spec=<id>` child, the palette derives one entry per record
  from `SITE_DATA.specializations`, and the nav has a single entry. A new page
  needs no routing work at all; it needed a record and a script tag, and both
  exist.

You own exactly two things: **your `.jsx` file** and, if you need a hand-authored
signature visual, **the component it names** (put it in your own file too).

---

## 0. The three rules that will break the site if you get them wrong

**1. Wrap your whole file in an IIFE.** All component files are classic scripts
sharing one global lexical scope. `Shell.jsx` already has a top-level
`const { useState, … } = React`, so a second one anywhere is a redeclaration
`SyntaxError` that blanks the entire site — and if two of you declared
`const SpecPageShell` at top level you would collide with each other. Scope your
file, alias inside it, publish through `window`. `Boot.jsx` and
`Specializations.jsx` both do this; copy either.

**2. End with `window.SpecFinOps = SpecFinOps;`** (your name), *inside* the IIFE.
esbuild targets ES2017, so `const` stays `const` and creates no window property.
Forget this line and your page silently renders the "still being built" scaffold
with no error anywhere.

**3. Never write `const X = window.X;` at top level.** Inside your IIFE it is
fine and is the intended pattern. Outside it, it is the collision in rule 1.

Two smaller ones:

- **`VizFrame` is not on `window`.** It is a top-level `const` in `Viz.js`.
  Reach it by **bare identifier** — `<VizFrame …>`. A guard written as
  `const V = window.VizFrame` is always `undefined` and silently disables your
  chart. (`Icon`, `DiagramExplorer`, `DgxBox`, `VizChart` *are* on window, but
  are also reachable bare; either works.)
- **Build with `task spa:build` from the repo root.** No Node, ever. Commit both
  your `.jsx` and the generated `.js`, plus `index.html`/`404.html` if the build
  restamps them.

---

## 1. The specialization record you receive

Your component is called as `<YourPage spec={spec} />`. `spec` is one element of
`window.SITE_DATA.specializations`. Read it; never mutate it.

```js
{
  id:            "finops",              // kebab, stable, used in the URL (?spec=finops)
  name:          "FinOps",              // the <h1>
  eyebrow:       "Specialization 01",   // the mono kicker above the <h1>
  kicker:        "Cost as a platform property",   // one line under the <h1>
  tone:          "cyan",                // cyan|purple|pink|blue|red|accent — see §3
  icon:          "zap",                 // an Icon.jsx name (index card only)
  pageComponent: "SpecFinOps",          // the global the router looks up — YOURS
  tagline:       "…",                   // one sentence, the page-sub
  standfirst:    "…",                   // the lede paragraph, rendered by the shell

  signature: {                          // your one signature visual, named
    component: "FinOpsSignature",       // a global you define
    title:     "…",
    note:      "…",
    source:    "PLACEHOLDER DIAGRAM — …",   // REQUIRED or it will not render
  },

  placeholder:     true,                // drives the page-level draft banner
  placeholderLede: "…",                 // OPTIONAL. the banner's first line
  placeholderNote: "…",                 // the banner's second line

  proof: {
    rails: ["metrics", "roles", "testimony", "projects", "articles"],  // and/or "live"

    metrics: [ { id, value, unit?, label, sub?, source, placeholder } ],
    roles:   [ { roleId, bulletTag, match, why } ],
    testimony: { available: true,  themes: [...], claimIds: [...], minQuotes: 3, note: "…" }
            // or { available: false, why: "…", adjacentThemes: [...] },
    projects: [ { id, why } ],
    articles: [ { id, why } ],
    live:     { title, body, cta: { label, route, deeplink? }, source, placeholder },
  },
}
```

### What the fields mean, and why they are shaped like this

**`proof.rails` is the declared proof mix.** `ProofRail` renders these rails, in
this order, and nothing else. It is declared per page rather than derived because
these five capabilities have the *least* third-party corroboration in the corpus.
Counted as **recommendations** rather than as tags, across all 19: finops 4,
ai 1, and there is no `devex`, `cicd`, `governance` or `compliance` theme in the
vocabulary at all. A shell that rendered a testimony rail unconditionally would
render an almost-empty one on four pages out of five. Watch the units in your own
prose: 8, 2 and 11 are *tag* counts for finops, ai and platform, and a tag count
wearing a recommendation label is the exact species of inflation these pages
exist to refuse.

**`proof.metrics[]` — most of these are placeholders, and some are not.**
`value`, `label` and `source` are all mandatory: `SpecMetric` has no code path
that emits a number without a provenance line under it. `placeholder: true` adds
the amber `Draft` badge and the dashed treatment; `placeholder: false` means the
figure is a count over something that exists and the `source` line says what was
counted and what validated it. Do not flip either flag on your page. Which of
your numbers are drafts is a verdict, not a styling choice.

**`placeholderLede` overrides the banner's first line, and it exists because
that line is a factual claim.** The shell's default is *"Every figure on this
page is placeholder content."* — true on three pages, false on `governance`
(whose four counts are real) and false on `cicd` (which has no figures at all).
A banner that disclaims a real number is exactly as dishonest as a number with
no source. If your record sets it, the banner already says the right thing;
you do not need to compensate for it in your prose.

**`proof.roles[]` cites a specific résumé bullet.** Role bullets carry no ids
anywhere in `data.js` — every one is `{ tag, depth?, text }` — so a pointer is
`roleId` + `bulletTag` + `match`, where `match` is a distinctive substring. The
rail finds the bullet and renders the **real text from `SITE_DATA.roles`**. The
specialization record never holds its own copy of the sentence, so it cannot
drift from the résumé and cannot invent one. A pointer that matches nothing is
dropped silently — that is deliberate.

**`proof.testimony` is matched by theme and claim id, never by recommendation
id.** Those ids are person slugs; coupling a capability page to a named
individual breaks when that entry is removed. A quote renders only if it is an
exact substring of the stored verbatim `text`, the same gate the chat uses. One
quote per person, so one verbose recommender cannot fill a rail.

**Testimony degrades in one direction only.** `available: false`, or fewer than
`minQuotes` resolved quotes, both render the *stated absence* — a dashed, muted
`.spec-gap` panel carrying `why` — instead of a thin list. A two-quote rail looks
like corroboration and is not any.

**`proof.live`** exists for the Agentic page: a claim whose best evidence is the
running artifact the reader is already standing inside, not a number.

---

## 2. Component API

Everything below is on `window`. Alias inside your IIFE.

### `SpecPageShell({ spec, children, onBack, rails, banner })`

The chrome every page wears. Renders, in order: back button → breadcrumb →
eyebrow / `<h1>` / kicker / tagline → draft banner → standfirst → **your
children** → the proof rails → footer with back + links to the other four.

| prop | type | default | notes |
|---|---|---|---|
| `spec` | object | — | **required.** Renders `null` without it. |
| `children` | node | — | your page's own sections. Go between the head and the rails. |
| `onBack` | fn | history-aware | default prefers `history.back()`, falls back to the index. Do not override without a reason. |
| `rails` | bool | `true` | `false` suppresses `ProofRail` — only if you render it yourself, elsewhere. |
| `banner` | bool | `true` | `false` suppresses the draft banner. **Do not pass `false`.** |

It also sets `--spec-tone` on the page root from `spec.tone`, so everything
inside inherits the right accent, and it opens the shared section-numbering
context — which is why your sections must use `SpecSection`.

### `SpecSection({ title, hint, children, id, unnumbered })`

The numbered section head. `title` is the `<h2>`; `hint` is the small
right-aligned mono note; `unnumbered` omits the number.

Numbering is **shared between your content and the shell's rails** — write three
sections and the first rail is `04`. A page that declares fewer rails simply has
fewer numbered sections; CI/CD has no `metrics` rail, so its rails start one
number earlier than the others. Each section captures its number once, on
first render, so a child re-rendering on its own state never renumbers itself.
Do not hand-write `<section className="role-detail-section">` yourself or you
will fall out of the sequence.

### `ProofRail({ spec, proof, only, exclude })`

Rendered by the shell; you normally never call it. `only` / `exclude` are arrays
of rail names, for the case where you want (say) the `live` rail up top and the
rest at the bottom:

```jsx
<SpecPageShell spec={spec} rails={false}>
  <ProofRail spec={spec} only={["live"]} />
  …your sections…
  <ProofRail spec={spec} exclude={["live"]} />
</SpecPageShell>
```

Rail names: `metrics`, `roles`, `testimony`, `projects`, `articles`, `live`.
An unknown name renders nothing rather than throwing.

### `SpecMetric({ metric })`

One prop, one object. Renders `null` — and logs a console warning — unless the
metric has a `value`, a `label` **and** a non-empty `source`. That is the point
of the component: there is no way to put a number on these pages without the
line that says where it came from.

`SpecMetricGrid({ metrics })` renders an array of them in the standard grid and
returns `null` if none survive.

### `PlaceholderBadge({ label, title })`

The amber dashed `Draft` pill. `label` defaults to `"Draft"`, `title` to a
tooltip explaining the mark. `SpecMetric` applies it automatically to anything
carrying `placeholder: true` — use it directly only for a draft value you are
rendering yourself (a number inside your signature visual, a figure in prose).

`SpecPlaceholderBanner({ spec, note, lede })` is the page-level banner; the
shell renders it for you from `spec.placeholder` and `spec.placeholderNote`.

### `SpecSignature({ spec, component, title, note, source })`

Binds your hand-authored visual by name, late, and wraps it in `VizFrame` —
exactly what `NamedDiagram` does for chart specs. Defaults every prop from
`spec.signature`. Renders `null` if the global is missing **or if there is no
source line**.

```jsx
<SpecSection title="The mechanism" hint="one visual, and it is the argument">
  <SpecSignature spec={spec} />
</SpecSection>
```

Your visual is called as `<YourSignature spec={spec} />`. Define it in your own
file and assign it to `window` under the exact name in `spec.signature.component`
(`FinOpsSignature` / `DevXSignature` / `AgenticSignature`).

Do **not** wrap it in `.diagram` — that class carries its own panel and border
and `VizFrame` already supplies both.

### Also available

`specTone(spec)` → the CSS colour string for a tone. `SPEC_TONES` → the map.
`specById(id)` → a record.

---

## 3. CSS

### Reuse these — they are already written

| class | what it is |
|---|---|
| `.spec-metrics` / `.spec-metric` … | the metric grid and tile (via `SpecMetricGrid`) |
| `.spec-ph`, `.spec-ph-dot` | the draft pill (via `PlaceholderBadge`) |
| `.spec-banner*` | the page-level draft banner |
| `.spec-ev-list`, `.spec-ev*` | résumé-bullet evidence rows |
| `.spec-quotes`, `.spec-quote*` | testimony cards |
| `.spec-gap*` | the stated-absence panel |
| `.spec-live*` | the live-artifact panel |
| `.spec-refs`, `.spec-ref*` | project / article reference cards — **reuse these for any card list you need** |
| `.spec-standfirst` | the accent-railed lede paragraph |
| `.spec-rail-note` | a small muted note under a section head |
| `.spec-chip` + `.is-strong` / `.is-draft` / `.is-none` / `.is-live` | the evidence chips |
| `.spec-pending*` | scaffolding notice |

And from the rest of the site: `.role-detail-section`, `.role-detail-section-head`
(`.num`, `.hint`), `.role-card-open`, `.eyebrow`, `.tag`, `.btn`/`.btn-primary`/
`.btn-sm`/`.btn-ghost`, `.vizchart*` (free with `VizFrame`), `.cmdk-empty` for an
empty state, `.prose-more` for a disclosure in single-column prose.

### Your own classes

Prefix by page, no exceptions:

- FinOps → `.specfin-*`
- DevX → `.specdx-*`
- Agentic → `.specag-*`
- **CI/CD → `.speccc-*`**
- **Compliance & Governance → `.specgv-*`**

Put them **at the end of your own section of `components.css`** only if you have
been assigned that file; otherwise inline the style object on the element.
Several agents appending to `components.css` at once will conflict — coordinate
before you write there.

### Tokens

`--spec-tone` is set for you on the page root; read it as
`var(--spec-tone, var(--accent))` so a subtree rendered outside a page still
works. Real tokens: `--bg`, `--bg-1`, `--bg-2`, `--bg-3`, `--line`, `--line-soft`,
`--text`, `--text-dim`, `--text-mute`, `--text-faint`, `--neon-pink`,
`--neon-cyan`, `--neon-amber`, `--neon-purple`, `--neon-blue`, `--accent`,
`--accent-soft`, `--accent-glow`, `--rad-sm|--rad|--rad-lg|--rad-xl`,
`--font-sans|--font-mono|--font-serif`, `--grad-sun`, `--grad-horizon`.

`--line-strong`, `--rad-md`, `--rad-full` and `--text-src` are also real, as of
2026-08-07. The first three had been referenced 35 times and declared nowhere,
which does not fall back to anything — it makes the declaration invalid at
computed-value time and drops it, so borders vanished and pills rendered square.
`task spa:tokens` now fails on any `var(--x)` that nothing declares. If you want
a token that may legitimately be absent, give the reference a fallback:
`var(--x, <default>)` is always allowed and is how you say "optional" out loud.

**`--text-src` is the provenance line, and it is not interchangeable with
`--text-mute` or `--text-faint`.** Every published figure carries a source line;
that line used to paint `--text-faint` and measured 1.92–2.67:1. It is gated at
≥ 4.5:1 on `--bg`, `--bg-1` and `--bg-2` in all four palettes by
`task spa:contrast`. Use it for source attribution and nothing else.

**Tones resolve through `--spec-tone-<name>`, not through the neon token.**
`--spec-tone` is still what you read. The six tones are defined in
`components.css` as `--spec-tone-cyan|purple|pink|blue|red|accent` and are now
pure pass-throughs: the light-theme fix for purple (`#8a5aa5`), blue (`#0e7490`)
and red (`#c62839`) moved up to `styles.css` on 2026-08-07, because the raw
tokens failed everywhere — 2.59:1, 1.31:1 and 3.41:1 on a white panel — and
scoping the fix to these five pages left EntityCards, Recommendations, `deep.css`
and the site-wide `[data-accent="purple"]` switch broken. Keep reading the
aliases anyway: the indirection is what lets a tone that fails in some future
theme be corrected in one place.

That shared override is gated
`:root[data-theme="light"]:not([data-aesthetic="terminal"]):not([data-aesthetic="outrun"])`
— those two aesthetics remap to dark palettes and are selectable underneath
`data-theme="light"`, so an ungated light rule inverts figure and ground there.
**Any light-theme rule you write must carry the same gate**, and any colour you
choose must be measured, not judged by eye. There is already one shipped bug in
this file from a rule that was read rather than measured.

**Amber is reserved.** On these pages `--neon-amber` + dashed means *draft, not
verified* — nothing else. Do not use it as decoration.

**Every glow needs a light-mode escape.** Any `text-shadow` you write must be
paired with `[data-theme="light"] … { text-shadow: none; color: … }`, or the
light theme renders invisible text. There are a dozen precedents in
`components.css`; there is also one bug where somebody forgot.

---

## 4. Signature-visual notes

One visual per page, and it must *be* the argument — if removing it would not
weaken the claim, it does not belong.

Build on `Viz.jsx` rather than inventing a parallel primitive:

- `DiagramExplorer` + `DgxBox` — a clickable node graph with a detail card.
  `viewBox="0 0 760 H"`, `notes = { [id]: { title, body, detail? } }`, children
  is a **render prop** returning a single node. See `Charts.jsx:438` for the
  smallest real example.
- `GateFlow` — stages with checks on the borders between them. N stages need
  **N−1** gates; they interleave positionally.
- `CardGrid`, `BenchmarkChart`, `ShareBars`, `AreaChart` — data-driven, all
  wrapped in `VizFrame`.

SVG idiom, non-negotiable if you want it to look like the rest of the site:
`fontFamily="JetBrains Mono"` as a literal attribute; every colour a
`var(--token)` in a presentation attribute; hand-computed text baselines
(`y + h/2 + 4` single line, `y + 22` / `y + 38` two-line); connectors as
`<path fill="none">`; `strokeDasharray="4 4"` for "not shipped / direction".

Three traps:

- Anything decorative inside a `DiagramExplorer` needs `pointerEvents="none"` or
  it silently steals the click target from the box underneath.
- `AreaChart` gradient ids are **not namespaced** (`g0`, `g1`, …). Two area
  charts on one page will steal each other's fills.
- `GateFlow` calls `useState` after an early return. Give every `VizChart` a
  stable `key` and never mutate a gateflow spec from empty to populated.

---

## 5. Worked example — a complete minimal page

This compiles, renders, and is the shape yours should have. Everything specific
to your page goes between `<SpecPageShell>` and `</SpecPageShell>`.

```jsx
/* FinOps — the capability page. Wraps its content in the shared shell from
   Specializations.jsx; the evidence rails below it are rendered from
   spec.proof and are not this file's concern. */
(function () {
  // Aliased INSIDE the IIFE. At top level these would collide with the sibling
  // pages, which alias exactly the same names.
  const SpecPageShell  = window.SpecPageShell;
  const SpecSection    = window.SpecSection;
  const SpecSignature  = window.SpecSignature;
  const PlaceholderBadge = window.PlaceholderBadge;

  /* The signature visual. Named by spec.signature.component in data.js and
     bound late by SpecSignature, which wraps it in VizFrame — so the title,
     the standfirst and the source line all come from the record, and this
     component draws nothing but the picture. */
  const FinOpsSignature = () => (
    <DiagramExplorer
      viewBox="0 0 760 200"
      notes={{
        bill: { title: "The bill", body: "The only document that never flatters the design." },
        loop: { title: "The loop", body: "Detection, policy, and a change that merges itself." },
      }}
      ariaLabel="The invoice feeds a control loop that removes waste without a human in the path. Every box opens a detail card."
    >
      {({ open, setOpen }) => (
        <React.Fragment>
          <DgxBox id="bill" x={16} y={60} w={180} h={66} color="var(--neon-cyan)"
                  title="THE BILL" sub="line items, weekly" open={open} setOpen={setOpen} />
          <DgxBox id="loop" x={280} y={60} w={180} h={66} color="var(--neon-pink)"
                  title="CONTROL LOOP" sub="detect · policy · merge" open={open} setOpen={setOpen} />
          <path d="M196 93 L280 93" fill="none" stroke="var(--bg-3)" strokeWidth="1" />
        </React.Fragment>
      )}
    </DiagramExplorer>
  );

  const SpecFinOps = ({ spec }) => (
    <SpecPageShell spec={spec}>

      {/* 01 — the argument, made once, as a picture. */}
      <SpecSection title="The mechanism" hint="one visual, and it is the argument">
        <SpecSignature spec={spec} />
      </SpecSection>

      {/* 02 — the prose the picture cannot carry. */}
      <SpecSection title="Why it holds" hint="PLACEHOLDER copy">
        <p className="spec-standfirst">
          PLACEHOLDER. Two or three paragraphs at most. The reader has already
          seen the mechanism; this is what the picture could not say.
        </p>
        <p style={{ maxWidth: "72ch", lineHeight: 1.7, color: "var(--text-dim)" }}>
          A draft figure written into prose still wears the mark:{" "}
          <strong>$500K/yr</strong> <PlaceholderBadge />.
        </p>
      </SpecSection>

      {/* Sections 03+ are the proof rails, rendered by the shell from
          spec.proof.rails. Numbering continues automatically. */}
    </SpecPageShell>
  );

  window.FinOpsSignature = FinOpsSignature;
  window.SpecFinOps      = SpecFinOps;   // the name data.js's pageComponent expects
})();
```

---

## 6. Checklist before you say you are done

- [ ] Whole file wrapped in an IIFE; no top-level `const` anywhere in it.
- [ ] Ends with `window.<YourName> = <YourName>;` matching `spec.pageComponent`.
- [ ] Signature visual assigned to `window` under `spec.signature.component`.
- [ ] Every section uses `SpecSection`, so numbering runs into the rails.
- [ ] Every number you wrote — in prose, in a chart, in an SVG label — carries a
      source line or a `PlaceholderBadge`, and preferably both.
- [ ] Any `text-shadow` you added has a `[data-theme="light"]` override.
- [ ] Your own classes are prefixed `.specfin-` / `.specdx-` / `.specag-` /
      `.speccc-` / `.specgv-`.
- [ ] Any light-theme rule you added carries the
      `:not([data-aesthetic="terminal"]):not([data-aesthetic="outrun"])` gate,
      and you **measured** its contrast rather than reading it.
- [ ] `task spa:build` is clean, and you committed the generated `.js`.
- [ ] Previewed at `http://localhost:3000/specializations?spec=<your id>`
      (`task spa:serve`; the flag is on automatically on localhost — see the
      override shim at the bottom of `spa/data.js`). On any other host use
      `?ff=specializations`.
- [ ] You did **not** edit `data.js`, `components.css`, `index.html`,
      `Shell.jsx`, `Boot.jsx`, `CommandPalette.jsx` or `Specializations.jsx`.
- [ ] Nothing you wrote re-argues a mechanism another page owns (§7.3), and
      nothing you wrote contradicts `docs/specializations-claim-verdicts.md`.

---

## 7. CI/CD and Compliance & Governance — what the records already commit you to

Both pages are gated by `docs/specializations-claim-verdicts.md`. **Read it in
full before you write a sentence.** Its opening section is the important part:
absence of a local artifact is *not* absence of the experience, capabilities are
publishable in the first person, and the gate is on **figures and on cited
artifacts** — never on capabilities. Only two kinds of claim are forbidden:
externally false, and self-inconsistent or miscited.

Everything below is already decided in `data.js`. It is not open.

### 7.1 CI/CD — `window.SpecCICD`, `window.CICDSignature`, `.speccc-*`

- **`proof.rails` does not include `metrics`, and you may not add one.** Every CI
  figure worth having — reuse rate, cache-hit rate, wall-clock reduction,
  cold-start time — would be invented, and four placeholder tiles is a weaker
  opening than none. Do not put a number in prose either. The `saved 12m03s` in
  the design docs is a mock inside a mock; never quote it.
- **The signature must be figure-free, and its `source` already says so.** This
  follows the `DevXSignature` precedent: where the visual is a mechanism diagram
  with no figure in it, the source line states that in words instead of carrying
  a placeholder disclaimer about figures that are not there. A disclaimer implies
  a number is coming later. This one is not. Do not override `title`, `note` or
  `source` locally — if the component ends up drawing something the record does
  not describe, fix the record's description, do not paper over it in the page
  (that exact drift is what the DevX record's comment was written about).
- **What this page owns** (argue it here, in full, and nowhere else): Karpenter
  consolidation and bin packing · headroom and `CapacityBuffer`, whose SLO is
  first-job schedule latency · thin-client CI · execution classes ·
  tests-in-pods · BuildKit · hermetic proofs · pre-scaling · spot's
  **operational** consequence.
- **Things that are true and citable, stated as designed or as built:**
  the CUE-governed pipeline generator is **built and verifiable** — a
  non-compliant pipeline *fails to compile*, and the pack ships its own negative
  test. Runners on the cluster are **built**. BuildKit, tests-in-pods and the six
  `#ExecClass` values are **designed** — say designed. Thin-client CI / Foundry
  is publishable **as his practice, in the first person**; do not say "Foundry
  runs" and do not point at `cmd/ci`, which does not exist.
- **Hermetic proof splits and you must not blur it:** built *coarsely*
  (path-filtered child pipelines, content-addressed skip), designed to
  implementation depth (the full derivation). Two different words.
- **Pause pods are historical.** "Held headroom with pause pods before
  `CapacityBuffer` existed" is true and good. Presenting them as current practice
  contradicts his own ADR, which retired them. The supersession is the better
  story anyway.
- **Spot:** the rate argument belongs to FinOps. What is yours is that **41% of
  us-east-1 Linux pools show >20% monthly interruption** — pool-specific risk is
  why diversification is the answer and why a one-off EC2 cannot do this. If you
  quote the 63% median, quote it as FinOps's figure and link, do not re-derive.
- The testimony `why` is written and is deliberately unlike the other three: it
  is about **position** — the recommenders stood next to the outcome, not next to
  the machinery. Do not restate the site-wide policy on your page; the index
  states it once, above the cards, for all five.

### 7.2 Compliance & Governance — `window.SpecGovernance`, `window.GovernanceSignature`, `.specgv-*`

- **Your four metric tiles are `placeholder: false` and their sources name the
  tool run behind each count.** Do not add a Draft badge to them and do not add a
  fifth tile. In particular: **no audit-reduction figure exists on this page and
  none may be added** — no findings prevented, no controls inherited, no ATO
  duration, no audit hours saved. The audit cross-section is a **scope identity,
  not a measurement**, and the signature must be figure-free for that reason. Its
  `source` line already says so.
- **The 67-manual tile is the argument, not a caveat.** The pack's own "Not
  covered (say this out loud)" section is the emotional centre of this page:
  8 enforced + 22 detected = 30 cloud-automated, 13 partial, **67 manual**.
  **Quote that section; do not summarise it.** A compliance deliverable that
  publishes its own gaps is the most persuasive artifact available here.
- **What this page owns:** policy-as-code enforcement · supply chain and
  admission · the audit cross-section · override-as-code. DevX also cites the
  `override-as-code` bullet with a different consequence; that is permitted, and
  the full argument is yours.
- **Do not redraw the `gateflow` chart.** Its gate `g3` **is** the governance
  gate and it is already drawn, in position, on the Agentic Coding Harness
  project record — which the projects rail already links. Two drawings of one
  mechanism is how two pages start disagreeing.
- **Draw the line about credentials yourself; the page is stronger for it.** No
  CISA, CISSP, CRISC or GRC language about him, and no assessor or auditor
  framing. He **enforced gates**; he is not an auditor. The one recommender who
  calls his platform "compliant" — Atif Siddiqui — is himself the CISSP.
- **Never "chaired / led / owned" the AI governance board.** Both bullets say
  **"sat on"**, and PayPal is **"member of"** the AI Super Users group.
- **Forbidden outright:** "5,374 controls" (an Audit Manager library export he
  did not author; Audit Manager is in maintenance mode and closed to new
  customers as of Apr 2026) · `cmd/policygen`, which does not exist · Testament /
  the Witness as a capability. The doctrine line — *"A tool that 'passes audits'
  by generating plausible prose is fraud"* — is quotable; the capability is not.
- "Passed PCI with zero criticals" is on the résumé rail with its own
  qualification in the `why`. Do not restate it in prose as though it were an
  assessment.
- Safe to cite **as designed**: ADR-0015 (one control, N generated forms, with
  the machine-checked invariant *"never pave without also guarding"*) · ADR-0016
  supply chain · ADR-0027 GovCloud as a dated feature-availability table ·
  ADR-0053 (agent principals with two refusals hard-coded in Go and unreachable
  from config) · ADR-0063 (*"'TODO' is not a member of the enum"*) · the
  safe-reduction triad.

### 7.3 The collisions to watch, named in advance

An argument appears in full on **exactly one page**. Everyone else gets at most
one sentence plus a link, and that sentence states **the linking page's own
consequence** — it never re-argues the mechanism.

| Owner | Owns, in full |
|---|---|
| FinOps | breakeven `u* = 1 − d` · the shut-it-off thesis · claim/lease as the utilization term · spot **rate** · VPA right-sizing (one line) · exactly **one** paragraph of Kubernetes: the two actuators |
| DevX | the mock plane · delete-the-environment |
| Agentic | the repeatability gradient and the three worked examples on it · deterministic onboarding / adoption harnesses · composed skill sets and the plan/verify grammar · structured outputs and source-linked provenance · the running artifact, and the `live` rail that points at it |
| CI/CD | see 7.1 |
| Governance | see 7.2 |

Known live risks, already mitigated in the data and yours to keep mitigated in
the prose:

- **CI/CD vs DevX** both cite the CODEOWNERS bullet. DevX's consequence is that
  ownership moved; CI/CD's is gate mechanics. Keep them apart.
- **CI/CD vs Governance** on signing and admission gates. Admission is
  Governance's. CI/CD's interest is where the check runs and what it costs to
  run it there.
- **Governance vs Agentic** on the AI governance board bullet — Agentic already
  cites it. Governance's record deliberately does not.
- **Agentic vs DevX** on paved roads. Agentic owns *how a paved road is written
  down and installed in a repository by a deterministic harness*; DevX owns
  **what a road is for and what it costs a team not to have one**, plus the mock
  plane and delete-the-environment. Agentic gets one sentence and a link.
- **Agentic vs Governance** on agent principals. Governance owns the principals,
  the refusals unreachable from configuration, and ADR-0053. Agentic decides only
  *how much there is left to govern*, which is the gradient's own consequence.
- **Agentic vs CI/CD** on the gate at the end of a skills run. CI/CD owns the
  pipeline. Agentic's interest is one clause: a gate is what turns a checked box
  from a note into a claim.
- **The gate diagram is drawn exactly once**, on the `agentic-harness` **project
  record** (`data.js` ≈1589–1760). Not on Agentic, not on Governance. Governance's
  rendered sentence used to say it was on the Agentic page; that was wrong and was
  corrected when the Agentic restructure landed.

### 7.4 What the index already does for you

> **KNOWN STALE, 2026-08-08.** The `TestimonyDisclosure` component and the
> `.spec-gap` panel described in 7.4 and at :162-165 were deleted; testimony is
> now selected editorially via `testimony.picks` and a rail that resolves nothing
> renders nothing. A builder following the paragraphs below will write against a
> removed API. Flagged, not fixed here.

- **The no-testimony pattern is stated once, on the index**, above the cards, by
  `TestimonyDisclosure` — with every count computed from the same resolvers your
  rails use. Your page's `testimony.why` is your page's *own reason*, and the
  four are deliberately unalike. **Do not write a paragraph explaining the site's
  policy on corroboration.** It has been explained. Yours reads as an instance of
  a disclosed pattern only if it does not re-litigate the pattern.
- **The index bands the cards by the kind of evidence behind them**, computed:
  a page leads if its testimony rail resolves at or above its floor, or if it has
  a `live` rail. Both of your pages land in *"Argued from the mechanism"*, and
  that is a statement about corroboration rather than a ranking of the work — the
  band copy says so. Nothing you write in your file changes it, and nothing
  should try to.
- **The evidence chips on your card are computed from your record**, so a chip
  can never promise a rail your page will not render — and a rail you do not
  declare simply draws no chip. CI/CD has no `Metrics` chip for that reason, and
  the legend explains what an absent chip means.
