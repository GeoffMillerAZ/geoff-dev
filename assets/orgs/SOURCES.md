# Organisation logos — provenance, licence, and the calls that were made

Every file in this directory is here because someone can point at where it came
from. A logo on a résumé is a factual claim about an employer; a re-drawn or
outdated mark is a credibility problem, so the sourcing rule is narrow:

1. the organisation's own brand / press / media kit, else
2. Wikimedia Commons **with an explicit licence on the file page**, else
3. the organisation's own live site serving its own asset.

Never a logo aggregator, never an image search, never a lookalike drawn by hand.
**"None found" is a correct answer** — the site falls back to a typeset monogram
(`OrgMark`), which is honest and needs no licence.

**Retrieved:** 2026-08-07 (all files, unless a row says otherwise).

**These assets are site-only.** Nothing here is referenced by `resume-core/`, the
machine résumé renderers, or the ATS PDF — those build from CUE and never read
`spa/`. Keep it that way: an ATS parses text, and an image in a PDF is at best
dead weight and at worst a parse failure.

**Every SVG was sanitised on install** — `<script>`, `<foreignObject>`, `on*`
handlers, `@import`, external `href`/`url()` refs stripped, then re-scanned to
prove the output is clean. These files are served from geoffmiller.cloud, so a
third-party SVG is executable content until proven otherwise. The sanitiser is
`sanitize-svg.py`, in this directory — run it on anything added later:

    python3 spa/assets/orgs/sanitize-svg.py DOWNLOADED.svg spa/assets/orgs/NAME.svg

It exits non-zero rather than write a file it could not prove clean. It is a
maintenance script, not part of any build: nothing imports it, no task calls it.
As of retrieval every source file was already clean, so nothing had to be
removed from any file here — the pass still ran on all thirteen. (Thirteen is
the SVG count; the five PNGs cannot carry script and are not sanitiser input.
This directory holds 18 files in total.)

---

## What is here

`on` = which background the artwork is legible against. This was **measured**, not
assumed: every file was rendered on `#ffffff` and on `#12101a` in a real browser
and looked at. Two assets failed that check and are not shipped (see *Rejected*).

| Org | File | Kind | on | Source |
|---|---|---|---|---|
| PayPal | `paypal-wordmark.svg` | wordmark | light | [paypalobjects.com/marketing/web/logos/paypal-wordmark-color_new.svg](https://www.paypalobjects.com/marketing/web/logos/paypal-wordmark-color_new.svg) |
| PayPal | `paypal-wordmark-reverse.svg` | mono | dark | [.../paypal-wordmark-monotone_new.svg](https://www.paypalobjects.com/marketing/web/logos/paypal-wordmark-monotone_new.svg) |
| PayPal | `paypal-icon.svg` | icon | any | [.../paypal-mark-color_new.svg](https://www.paypalobjects.com/marketing/web/logos/paypal-mark-color_new.svg) |
| First Citizens Bank | `first-citizens-bank-wordmark.png` | wordmark | light | [firstcitizens.com/.../fcb-logo-horiz-web-2020@2x.png](https://www.firstcitizens.com/content/dam/firstcitizens/images/logos/fcb-logo-horiz-web-2020@2x.png) |
| First Citizens Bank | `first-citizens-bank-icon.png` | icon | any | [firstcitizens.com/.../fcb-logomark-40x40@2x.png](https://www.firstcitizens.com/content/dam/firstcitizens/images/logos/fcb-logomark-40x40@2x.png) |
| Silicon Valley Bank | `silicon-valley-bank-wordmark.svg` | wordmark | light | [Commons: Silicon Valley Bank logo, 2022.svg](https://commons.wikimedia.org/wiki/File:Silicon_Valley_Bank_logo,_2022.svg) |
| REPAY | `repay-wordmark.png` | wordmark | light | [repay.com/wp-content/uploads/2022/11/REP-0004_Logo_CMYK_hz-813w.png](https://repay.com/wp-content/uploads/2022/11/REP-0004_Logo_CMYK_hz-813w.png) |
| Early Warning Services | `early-warning-services-wordmark-reverse.svg` | wordmark | dark | [earlywarning.com/themes/custom/ews/logo.svg](https://www.earlywarning.com/themes/custom/ews/logo.svg) |
| Bank of America | `bank-of-america-wordmark.svg` | wordmark | light | [bac-assets.com/.../logo-flagscape-CSXdf6fc172.svg](https://www1.bac-assets.com/homepage/spa-assets/images/assets-images-site-login-common-logo-flagscape-CSXdf6fc172.svg) |
| Bank of America | `bank-of-america-icon.png` | icon | any | [bankofamerica.com/.../colored_flagscape-v2.png](https://www.bankofamerica.com/content/images/ContextualSiteGraphics/Logos/en_US/logos/colored_flagscape-v2.png) |
| Northern Illinois University | `northern-illinois-university-wordmark.png` | wordmark | light | [niu.edu/.../niu-logo-root.png](https://www.niu.edu/masterto/themes/theme_4_0/common/images/niu-logo-root.png) |
| Northern Illinois University | `northern-illinois-university-wordmark-reverse.svg` | mono | dark | [niu.edu/.../niu-reverse-logo.svg](https://www.niu.edu/masterto/themes/Theme_4_0/common/images/niu-reverse-logo.svg) |
| Universal Technical Institute | `universal-technical-institute-wordmark.svg` | wordmark | light | [res.cloudinary.com/utidinary/.../UTI-Logo-Full-Color-White_1.svg](https://res.cloudinary.com/utidinary/image/upload/v1738322396/UTI-Logo-Full-Color-White_1.svg) |
| Geek Squad | `geek-squad-wordmark.svg` | wordmark | any | [Commons: Geek Squad logo (new).svg](https://commons.wikimedia.org/wiki/File:Geek_Squad_logo_(new).svg) |
| Anthropic | `anthropic-wordmark.svg` | wordmark | light | [anthropic.com/press-kit](https://anthropic.com/press-kit) — *Anthropic logo - Slate.svg* |
| Anthropic | `anthropic-wordmark-reverse.svg` | mono | dark | press kit — *Anthropic logo - Ivory.svg* |
| Anthropic | `anthropic-icon.svg` | icon | light | press kit — *Anthropic symbol - Slate.svg* |
| Anthropic | `anthropic-icon-reverse.svg` | icon | dark | press kit — *Anthropic symbol - Ivory.svg* |

Source detail, per organisation, below.

---

## Sources in full

### PayPal — official CDN (source class 3)
Three SVGs served by `paypalobjects.com`, PayPal's own asset CDN, referenced
from `https://www.paypal.com/us/home`. No licence is granted with them; the
marks are trademarks of PayPal Holdings, Inc. PayPal's logo/trademark policy
governs *marketing and co-branding* use — placing a partner's PayPal logo on
your product. Naming a former employer on a personal résumé is nominative use
and is not co-branding. Restriction that bites: **do not recolour, redraw, or
place the mark so it reads as a PayPal endorsement of Geoff or of this site.**

### First Citizens Bank — official site assets (source class 3)
Horizontal lockup and 40×40 logomark from `firstcitizens.com`'s own DAM. PNG
only — no public SVG is served by the site and FCB publishes no open brand kit.
Trademark of First-Citizens Bank & Trust Company.

### Silicon Valley Bank — Wikimedia Commons (source class 2)
`File:Silicon Valley Bank logo, 2022.svg`. Licence on the file page:
**public domain** (below the US threshold of originality — text and simple
geometry). Commons additionally flags it `Restrictions: trademarked`, which is
the ordinary trademark caveat, not a copyright limit.

**The judgement call — a retired brand.** SVB failed in March 2023 and the
brand now exists only as a First Citizens division. Two questions were asked
and both come out fine:

- *Is it honest to show it?* Yes. SVB is a genuine employer of Geoff's and the
  résumé says so in text already. The logo adds no claim the text does not make.
- *Whose mark is it now?* First Citizens acquired it. That changes the owner,
  not the accuracy — and it removes the "defunct company, unknowable rights"
  worry entirely, because the owner is a company Geoff also worked for.

**Which era.** Shipped: the April 2022 mark, the last one SVB used as an
independent bank. Geoff's tenure spans the previous (2018) mark as well; if the
earlier one is preferred, `File:Silicon Valley Bank logo (2018).svg` on Commons
is the same licence and a one-line swap. Deliberately **not** used: the
post-acquisition "Silicon Valley Bank, a division of First Citizens Bank"
lockup, which describes an org chart Geoff did not work under at SVB.

### REPAY — official site asset (source class 3)
`REP-0004_Logo_CMYK_hz-813w.png` from `repay.com`'s own media library, the file
the live homepage uses. It is the full lockup including the "Realtime Electronic
Payments" tagline. PNG only; no SVG is served and no public brand kit exists.
Trademark of Repay Holdings Corporation.

**Re-checked 2026-08-12 for a tagline-free variant. There isn't one.** The
tagline makes this 8:1, wide enough that it dominates any row it sits in, so it
was worth looking again: `repay.com` serves **exactly one** logo file sitewide —
this one — and `/newsroom/` and `/media-kit/` both 404. The only other REPAY-
owned mark on the site is `cropped-A-icon-*.png`, the green "A" from inside the
wordmark, which is a WordPress-generated site-icon crop with a baked-in off-white
field and no alpha. Declined: it is a bare glyph nobody reads as REPAY, and it
carries its own background so it would be a chip by another name. The lockup with
its tagline **is** REPAY's logo, and cropping the tagline off is the re-crop this
file's rules forbid. Callers who need it small should cap its width and accept a
quiet block — see `OrgLogo`'s `maxWidth`.

### Early Warning Services — official site asset (source class 3)
`logo.svg` from the EWS Drupal theme. Only the **reversed (white)** artwork is
served — `logo-dark`, `logo-color` and `logo-blue` were probed and 404. So this
mark is legible on dark surfaces only; on a light surface the component either
puts it on a dark chip or falls back to the monogram. Trademark of Early
Warning Services, LLC. (Note: EWS operates Zelle; the Zelle mark is a separate
trademark and is **not** used here — Geoff's employer was EWS.)

### Bank of America — official site assets (source class 3)
Positive Flagscape + wordmark lockup as SVG from `bac-assets.com` (BoA's own
asset host), plus the standalone Flagscape as PNG from `bankofamerica.com`.
Trademark of Bank of America Corporation.

### Northern Illinois University — official site assets (source class 3)
Positive lockup (PNG) and reversed lockup (SVG) from `niu.edu`'s own theme.

**Restriction that bites.** NIU's communication standards state that university
marks may not be altered, manipulated, merged with another logo, or placed
directly against another logo, that the brandmark must not be used alone without
prior approval, and that external use of NIU name/branding is expected to be
cleared with University Marketing (`marketing@niu.edu`). Consequences for this
site: **use the full lockup, never the shield alone; never restyle it; never
lock it up with Geoff's own mark.** Whether a personal résumé listing an alma
mater needs written clearance is a judgement — this is textbook nominative use
and is not being cleared proactively, but the contact address is recorded here
so it is a one-email fix if NIU ever objects.
Guidelines: <https://www.niu.edu/communication-standards/visual/university-logo/usage.shtml>

### Universal Technical Institute — official site asset (source class 3)
Served from UTI's own Cloudinary account (`res.cloudinary.com/utidinary/…`) and
referenced by `uti.edu`. **The file name lies**: it is called
`UTI-Logo-Full-Color-White_1.svg` but the wordmark artwork is dark navy
(`#111928`), i.e. the *positive* lockup for light backgrounds — confirmed by
rendering it, not by reading its name. It is stored here as
`universal-technical-institute-wordmark.svg` and marked `on: light`.
Trademark of Universal Technical Institute, Inc.

### Geek Squad — Wikimedia Commons (source class 2)
`File:Geek Squad logo (new).svg`, licence on the file page: **public domain**
(below the threshold of originality), `Restrictions: trademarked`. Trademark of
Best Buy. Geek Squad publishes no downloadable brand kit and `geeksquad.com`
now redirects into `bestbuy.com` without serving a standalone logo asset.

**Era call.** Geoff worked there 2001–2006; the shipped mark is the current
(c. 2017) badge, matching how LinkedIn and every other career surface shows a
present-day employer mark. Commons also has `File:Geek Squad logo (old).svg` if
period accuracy is preferred — same licence, one-line swap. The badge carries
its own light keyline, so it reads on both light and dark surfaces (`on: any`),
though the black field does soften against a very dark background.

### Anthropic — official press kit (source class 1)
`https://anthropic.com/press-kit` 307-redirects to
`https://www-cdn.anthropic.com/ae59ca4ca194dac9c9dc3bc78c5829468cb0e8af.zip`
(the CDN filename is a content hash and will change; always start from
`/press-kit`). Four files taken: *Anthropic logo* and *Anthropic symbol*, each in
Slate and Ivory. The Claude / Claude Code / Claude Spark marks in the same kit
are **not** taken — they name products, not the issuer of Geoff's certification.
The kit ships no written terms file; these are trademarks of Anthropic PBC,
published for press use.

**The display question — flag for Geoff.** The only place Anthropic appears in
`spa/data.js` is a certification: *Claude Certified Architect — Foundations*,
`year: "In Progress"`. An issuer's logo next to a credential reads, to most
people, as *the issuer conferred this*. It has not been conferred yet.

- Recommended: **do not render the Anthropic mark next to the in-progress
  certification.** Keep it text-only with the "In Progress" state visible until
  the certification is awarded, then place the logo.
- The asset is shipped anyway so that the day it is earned, placing it is a
  one-line change rather than another sourcing exercise.
- The manifest entry carries `caution` for exactly this reason — a component
  can surface it, and Geoff can see it without reading this file.

---

## Deliberately not shipped

### Amazon Web Services — omitted on AWS's own rule (reversible)
**No asset shipped.** AWS's Trademark Guidelines
(<https://aws.amazon.com/trademark-guidelines/>) permit third-party referential
use in **plain text only, with no logos**, and state that any use of the AWS
Marks outside the granted licences "requires Licensor's prior written
permission." Geoff is not an AWS partner and holds no such permission.

Context makes it worse rather than better: the only AWS appearance in the data
is `"org": "Amazon Web Services (partner)"` on a **recommendation** written by
an AWS technical account manager. Putting the AWS logo on a testimonial is the
closest thing to implying AWS endorsement that this site could do.

If Geoff disagrees, the sourcing is already done and it is a two-minute change:
[Commons: Amazon Web Services 2025.svg](https://commons.wikimedia.org/wiki/File:Amazon_Web_Services_2025.svg)
— public domain on the file page, `Restrictions: trademarked`. Download,
sanitise, drop in as `aws-wordmark.svg` (`on: light`), add the manifest entry.
The monogram covers it until then.

### State of Arizona, Dept. of Administration — statute, not trademark
**No asset shipped.** ADOA's identity is built on the **Great Seal of the State
of Arizona**, and seals are governed by statute, not by trademark practice:

> **A.R.S. § 41-130.** A person may use, display or otherwise employ any
> facsimile, copy, likeness, imitation or other resemblance of the great seal of
> this state only after obtaining the approval of the secretary of state. […]
> Any person who knowingly violates this section is guilty of a class 3
> misdemeanor.

<https://law.justia.com/codes/arizona/2022/title-41/section-41-130/>

That is a criminal provision with a permission gate, and no fair-use or
nominative-use doctrine reads it away — trademark reasoning does not transfer to
a state seal. The statute's commercial-advertising sentence is a *separate,
absolute* bar; the general use-with-approval rule applies regardless of purpose.

**Call: use the monogram, and say so.** The résumé states the employment in
text, which is what actually matters. If Geoff wants the seal, the fix is an
application to the Arizona Secretary of State for a certificate of approval —
not a download.

### ThinkVine — none found
`thinkvine.com` does not resolve (no A record). No brand kit, no live site, no
Wikimedia Commons file. ThinkVine was acquired and the brand retired. **No
substitute was used** — not the acquirer's logo, not a redrawn mark. Monogram.

### OWNZONES Media Network — none found
`ownzones.com` does not resolve. `ownzones.net` resolves but serves a domain
parking lander, not the company. No Commons file. Monogram.

### J-Curve Technologies — none found
`jcurvetech.com` resolves but returns a WordPress error page (HTTP 500) with no
content and no assets; `jcurvetechnologies.com` does not resolve. No Commons
file. Whether the current domain holder is even the same entity is unknowable,
which is itself a reason not to take an asset from it. Monogram.

---

## Rejected assets (checked, then thrown away)

- **`assets-images-global-logos-interstitial_flagscape_bank-CSXc6912ae.svg`**
  (Bank of America, reversed) — served with `viewBox="-5 372 600 50"`, a window
  onto a sprite sheet. Rendered standalone it is a solid red bar, not a logo.
  Cropping or re-viewBoxing it would be *altering the mark*, so it was dropped:
  Bank of America has no reversed asset here, only the positive lockup and the
  Flagscape icon. Caught by rendering it, which is why rendering is the check.
- **`ews_dark.svg` / `logo-color.svg` / `logo-blue.svg`** (Early Warning) —
  guessed paths; all 404. Never existed.

---

## Rules for adding to this directory later

1. Source class 1 → 2 → 3, and nothing else. If none of the three has it, the
   answer is "none found" and the monogram does the job.
2. Record the URL, the retrieval date, the licence, and any restriction that
   actually changes what may be done. "All rights reserved" on its own is not a
   restriction that bites; "the brandmark may not appear alone" is.
3. Sanitise every SVG before it lands, then re-scan the output.
4. **Render it on `#ffffff` and on `#12101a` and look at it** before writing an
   `on` value. Both mistakes fixed in this batch — one broken mark, one file
   whose own name had the wrong colour — were invisible until rendered.
5. Add the manifest entry in `spa/data.js` only for variants that exist on disk.
   The manifest is a promise about the filesystem; a stale entry is a broken
   image where a monogram would have been fine.
