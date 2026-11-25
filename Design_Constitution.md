# Design Constitution (Core)

> Read this before creating, redesigning, or modifying any UI: websites, web apps, dashboards, components.
> This file is universal. It contains no project-specific palette, font, copy, or layout. Those live in the project's `DESIGN_DIRECTION.md`.

**Premise:** AI makes generating UI cheap. What separates premium work is taste, constraint, and craft. The goal is the *discipline* of Apple, Linear, Stripe, and Vercel (consistency, restraint, precision), never their *look*. Every project gets its own identity.

Rules have IDs (e.g. `TY4`). When reviewing or reporting, cite the ID. **MUST** rules hold unless the user explicitly overrides them; if overridden, note the trade-off in one line.

---

## 0. Precedence and scope

1. The user's explicit instruction in this session.
2. The project's `DESIGN_DIRECTION.md`.
3. The existing codebase's design system and conventions.
4. This file's defaults.

If two rules here conflict, the one that protects the user (accessibility, readability, performance, honesty) wins.

## 1. Pick a tier (scale the process to the task)

| Tier | Task | Required process |
|---|---|---|
| **1. Tweak** | Spacing, a bug, one element, copy fix | Follow the existing system. Touch only what's asked. Run the mini checklist (§14). No redesign. |
| **2. Build** | New component, section, or page inside an existing system | Study the existing system, build with its tokens, all states, §13 gates. |
| **3. Direct** | New product, new page type, redesign, or no `DESIGN_DIRECTION.md` exists | Full workflow (§15): direction, tokens, build, refine, audit. |

When unsure, pick the lower tier and say so. Never redesign a whole app when one section needs work.

## 2. Operating rules for AI (honesty and process)

- **OP1: No fabrication. MUST.** Never invent metrics, user counts, testimonials, customer logos, press quotes, awards, credits, team members, or "screenshots" presented as real. Use supplied content. Otherwise use a visibly labeled placeholder (`PLACEHOLDER` in code and copy) and list it in the final report.
- **OP2: References come from the user.** For Tier 3, ask for 3–5 references (links or screenshots) and a line on why each works. If none are supplied, derive direction from the product itself and state that no references were used. Never claim to have studied a site you couldn't open.
- **OP3: Ask once, batched.** For Tier 3 with missing facts, ask up to five questions in one message: what the product is, who it's for, the one primary action, hard constraints (stack, brand, SEO), references. If the user is away, state assumptions at the top and proceed.
- **OP4: Preserve what works. MUST.** Keep functionality, routes/URLs, SEO (titles, meta, canonical, structured data, heading hierarchy), analytics, integrations, tests, and existing accessibility unless asked to change them.
- **OP5: Dependencies are a cost.** Add no new library (animation, 3D, UI kit) unless it delivers something CSS or the platform can't, within the performance budget. Justify in one line.
- **OP6: Evidence, not claims. MUST.** Don't say "responsive," "accessible," or "fast" unless you checked. State what you checked and how. If you couldn't run a check, write "not verified."
- **OP7: Content first.** Layout serves the real content. Don't cut or invent content to fit a layout. Never trade readability or findability for whitespace or effect.
- **OP8: Placeholders are marked, never disguised.** If a real asset (photo, logo, product shot) is unavailable, use a neutral, labeled stand-in or a typographic/data-driven alternative. Never fill the gap with generic stock imagery or decorative blobs.

## 3. Direction (derive it, don't default to it)

Applies to Tier 3, and any time `DESIGN_DIRECTION.md` is missing.

1. **Understand.** Write down: what the product is, who uses it, the one action that matters, what the user should feel, and the product's own *material* (sound, paper, money, code, learning, soil, whatever it's actually about).
2. **Three adjectives.** Concrete, and each must *exclude* something. "Modern, clean, premium" are banned: they exclude nothing.
3. **Avoid list.** What this product must never look or sound like.
4. **Three directions, not one.** Write three genuinely different directions (differing in surface, type character, layout logic, and signature element), one line each. **The first one that came to mind is probably the category default: reject it unless you can say why it's right for *this* product, not just this category.** Pick one and record why.
5. **One signature element,** tied to the product's medium: an interactive demo, a real data visualization, an authentic in-context product shot, or one distinctive motion. One, not five.
6. **Identity tests (all must pass):**
   - *Logo-off:* remove the logo. Could this belong to any random company? If yes, fail.
   - *Category-swap:* swap the copy for a different industry. If it still fits, fail.
   - *Squint:* blur your eyes. Is there one obvious focal point per viewport and a clear reading order? If not, fail.

**Derivation examples (illustrative, not prescriptive):**
- *Ambient audio app:* material = room tone, tape, texture. Adjectives: hushed, tactile, exact. Signature: playable channel with a real waveform.
- *Compliance/fintech tool:* material = ledgers, evidence. Adjectives: sober, exact, legible. Dense tables, no illustration. Signature: a reconciliation view that shows the work.
- *Developer tool:* material = text, terminals, diffs. Adjectives: fast, literal, quiet. Signature: real product UI and real code, with latency you can feel.
- *Kids' learning platform:* material = play, progress. Adjectives: warm, clear, encouraging. Large touch targets, real content, no childish clichés.

**Watchlist: "not banned, but needs written justification."** These are the new defaults of anti-AI design, so they can be as generic as the old ones: warm-paper-plus-serif-plus-grain; bento grids; dark mode with neon accents; gradient headline text; "Trusted by" logo rows; three animated stat counters; floating pill navs; mono micro-labels everywhere.

## 4. Design system (tokens before screens)

- **SY1: Define tokens first; use nothing else. MUST.** If none exist, create them in the codebase's idiom (CSS variables, Tailwind theme, theme file).
- **SY2: Required tokens:** color (canvas, surface, surface-raised, ink, ink-muted, hairline, accent, accent-ink, status colors), type scale, spacing, radius, border, elevation, motion (durations and easings), z-index, breakpoints.
- **SY3: Semantic names.** `surface-raised`, not `gray-100`. Components consume semantic tokens only.
- **SY4: Primitives before pages.** Build button, input, link, panel, tag, table row, nav, and dialog with all states before composing pages.
- **SY5: No stray values.** A one-off value needs a comment saying why. Used three times, it becomes a token.
- **SY6: Defaults when unspecified.**
  - Type scale: 12 / 14 / 16 / 20 / 28 / 40 / 64 (marketing display may go to 96+).
  - Spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
  - Radius: at most three values plus a pill. Elevation: at most three levels.

## 5. Typography

- **TY1:** Choose type for the brand's character, not by default. Inter or system UI as the display face needs a written reason.
- **TY2:** At most two families, plus an optional mono for data. At most four weights.
- **TY3: Scale contrast.** Marketing display size is at least 3× body. Apps can be tighter. Build hierarchy with size, weight, and space before color.
- **TY4: Tracking.** Display: -0.01em to -0.03em, never below -0.04em. Body: 0. Small caps and labels: slightly positive. **MUST:** after setting it, inspect rendered headlines and confirm word gaps are clearly visible.
- **TY5: Line height.** Display 1.0–1.15. Body 1.5–1.7. UI text 1.3–1.5.
- **TY6: Measure.** Prose 45–65ch (75ch hard cap). Use `text-wrap: balance` on headings and `pretty` on body.
- **TY7: Mono is for data only:** numbers, IDs, code, timestamps, file sizes, shortcuts. Never for decorative kickers, section labels, or tags.
- **TY8:** Tabular numerals in tables, prices, and timers. Real typographic characters (— “ ” ’ ×). No widows or orphans in headings.
- **TY9:** Minimum body size 16px on marketing and reading pages, 14px in dense apps, nothing below 12px.
- **TY10: Loading.** Self-host WOFF2, subset, `font-display: swap` with a metric-matched fallback to prevent layout shift.

## 6. Color and effects

- **CE1: Palette budget.** One neutral ramp, one accent with one job (action *or* live signal), status colors for status only. Every color must be a token.
- **CE2:** Accent covers no more than about 10% of any viewport.
- **CE3: Off by default:** purple or blue-to-pink gradients, glow, neon, glassmorphism, colored shadows, floating blobs and micro-spheres, random colored cards.
- **CE4:** A gradient is allowed only if it encodes something (data, material, time) and the direction file permits it.
- **CE5: Elevation.** At most three levels, neutral low-opacity shadows. Hairline borders do most of the separation.
- **CE6: Borders must be visible** on a typical laptop display and in a screenshot. Form-control boundaries need 3:1 contrast against their surroundings.
- **CE7: Status indicators are for real state.** Dots, pulses, and "live" badges appear only where something is actually live right now. Never decorative, never repeated for style.
- **CE8: Surface policy.** Light or dark is set by the direction file. Absent that, default to a calm light surface. Dark or inverted *bands* are allowed to add weight. A full dark theme ships only if the direction asks for it, with tokens tuned separately (not mechanically inverted) and contrast re-verified.

## 7. Layout and rhythm

- **LR1: Break the template rhythm.** No more than two consecutive sections may share the same skeleton (label, headline, subline, row of equal cards). Vary scale, alignment, column logic, density, and background.
- **LR2:** One clear focal point per viewport.
- **LR3:** Align to a grid. Consistent container widths. Fix 2px misalignments; people feel them without naming them.
- **LR4:** Equal-card grids only for truly parallel items, and at most one per page.
- **LR5:** Long marketing pages need at least one deliberate change of weight (a full-bleed band, an inverted section, an oversized moment), consistent with the direction.
- **LR6:** Pricing and comparisons are sized to content and aligned to the grid or centered. Never orphaned in one side of an empty row.
- **LR7: No repeated boilerplate.** Don't default to a centered hero, a version pill above the hero, `01 //` kickers, or corner pill tags. Use them only if the direction justifies them.

## 8. Assets and icons

- **AS1:** One icon set, one stroke weight, sizes 16 / 20 / 24. No emoji as UI. Icon-only controls have an accessible name.
- **AS2:** No grey skeleton bars or generic gradient thumbnails inside product mockups. Show real content in realistic context (actual OS chrome, actual data, real item names).
- **AS3:** One consistent treatment for photography or illustration (grade, grain, crop). No generic stock people. If real imagery isn't available, use typography, data, or product UI instead of filler.
- **AS4:** Imagery and gradients carry information or material. Decoration needs a reason.
- **AS5: Optimize:** AVIF/WebP, explicit width and height, lazy-load below the fold, SVG for vector, meaningful `alt` (or empty for decorative).
- **AS6:** A dot-plus-wordmark logo is a placeholder, not an identity. Flag it as such.

## 9. Motion and states

- **MO1: Durations.** UI feedback 120–200ms. Entrances and exits 200–320ms. Ambient or signature motion may breathe over 2–8s or longer.
- **MO2: Easing is tokenized.** Default `cubic-bezier(0.2, 0, 0, 1)`, exit `cubic-bezier(0.4, 0, 1, 1)`. No `linear` except progress and time-based motion.
- **MO3:** Animate `transform` and `opacity` only. No layout-thrashing animation.
- **MO4: MUST honor `prefers-reduced-motion`.** Replace motion with a crossfade or nothing. Don't just disable and leave it broken.
- **MO5:** No scroll-jacking. No first-paint animation that delays content.
- **MO6: Motion test.** With all animation off, the design must still look finished and professional.
- **MO7: One signature motion** at most, tied to the product's medium. Everything else is functional.
- **ST1: Interactive components** define: default, hover, focus-visible, active, disabled, loading, error, success.
- **ST2: Data views** define: loading (a skeleton that matches the real layout, spinners only for short unknown waits), empty (explain and offer the next action), error (what happened, what to do, retry), partial, and overflow (long strings, 0 / 1 / 1000 items), plus offline where relevant.
- **ST3:** Optimistic UI only for reversible actions, with rollback.

## 10. Copy

- **CP1:** Concrete nouns, real numbers, short sentences. Headings state a claim or fact (*"Free until you want the whole library."*, not *"Simple, calm pricing."*).
- **CP2: Banned phrases:** "unlock the power," "seamless," "revolutionize," "next level," "supercharge," "cutting-edge," "reimagine," "the future of," "AI-powered" as a headline, and anything that could be pasted onto a competitor's site unchanged.
- **CP3:** Buttons name the action ("Start 14-day trial", not "Submit"). Errors are human and actionable. Consistent case and tone across the product.
- **CP4:** Every number is real or marked placeholder (OP1).
- **CP5:** Name features by what they do, then *show* them (a real graph, a real screen). Naming alone is not demonstration.

## 11. Density by product type

- **DN1: Marketing and editorial:** spacious. Section padding 96–160px. Large type.
- **DN2: Apps, dashboards, data tools:** compact. 13–14px base, 32–40px rows, tabular numerals, persistent filters, keyboard shortcuts. Whitespace serves scanning, not decoration.
- **DN3: Docs and reading:** measure and navigation first.
- **DN4: Commerce:** product imagery, price clarity, low-friction checkout.

## 12. Responsive

- **RS1:** Verify at 375, 768, 1024, and 1440px. Content must reflow at 320px (400% zoom) with no horizontal scroll.
- **RS2: Compose, don't compress.** Reorder, change density, redesign navigation, and replace hover-only patterns for touch. Define how tables behave on small screens.
- **RS3:** Touch targets at least 44×44px with at least 8px between. Form inputs at least 16px font size (prevents iOS zoom). Respect safe-area insets.
- **RS4:** Use fluid type (`clamp()`) within the type scale. Test with long strings and real content.

## 13. Pass/fail gates (Tier 2 and 3)

All must pass, or be reported as failing:
- Contrast: body text 4.5:1, large text and UI boundaries and focus indicators 3:1.
- Every interactive element is keyboard reachable with a visible focus indicator. Logical tab order.
- Semantic HTML: one `h1`, ordered headings, landmarks, labeled controls.
- No horizontal scroll at 375px. Content reflows at 320px.
- Touch targets at least 44px.
- Core Web Vitals on a mid-tier mobile profile: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. Default initial JS budget ≤ 170KB compressed for marketing pages (justify any exception).
- Lighthouse performance ≥ 90 and accessibility ≥ 95 as a sanity check, not as proof.
- `prefers-reduced-motion` honored. Page finished with motion off.
- All states from ST1 and ST2 exist for every component and view shipped.
- No violations of OP1 (fabrication) and no unmarked placeholders.

## 14. Mini checklist (Tier 1)

Uses existing tokens. No new one-off values. Alignment and spacing match neighbors. States still work. Contrast and focus unchanged or better. No side effects on routes, SEO, or behavior.

## 15. Workflow (Tier 3; subsets for Tier 2)

1. **Understand.** Inspect the project and existing implementation. Page purpose, users, primary action, constraints.
2. **Evaluate (redesigns).** List weaknesses with rule IDs: generic patterns, typography, spacing, color, hierarchy, alignment, unnecessary elements.
3. **Define.** Run §3. Write or update `DESIGN_DIRECTION.md`: tokens, type, color, signature element, avoid list.
4. **Build incrementally.** Primitives, then one section or page at a time, with real content. Preserve functionality. Minimal dependencies.
5. **Refine.** Review each section against the tokens. Fix rhythm, alignment, and spacing. Add states. Strip anything without a reason.
6. **Audit.** Run §13 and the identity tests. Capture screenshots at the four widths. Fix and re-run.

A design is not finished because it renders.

## 16. Final report format (keep it short)

1. **Direction:** the chosen direction and why (Tier 3 only), plus assumptions made.
2. **Changed:** what changed and what was deliberately left alone.
3. **Placeholders:** every placeholder or unverified claim (OP1, OP8).
4. **Verification:** each check with how it was done and the result; anything "not verified."
5. **Open issues:** known failures cited by rule ID, and the single most valuable next step.

---

**Final rule:** Never confuse complexity with quality, animation with premium, gradients with creativity, or component count with good UX. Every decision needs a reason. Same discipline as the best products, a different identity for every project.