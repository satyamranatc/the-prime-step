# DESIGN_DIRECTION.md: The Prime Step IT Training & Placement Institute (Indore)

> Project direction. Overrides defaults in `DESIGN_CONSTITUTION.md` (precedence level 2).
> **Status: DRAFT v1.** Items tagged **[VERIFY]** came from the live site and must be confirmed by the institute before publishing. Items tagged **[PROVISIONAL]** are my proposal and should be checked against the real logo and photos.
> Facts below were read from theprimestep.com on 2026-11-22.

---

## 1. Product

- **What it is:** An IT training and placement institute in Indore. Classroom courses in programming (C/C++, Java, Python, SQL), full-stack (MERN, MEAN, PHP, Java full-stack), mobile (Android, Flutter), data and AI (data science, analytics, machine learning, AI, Power BI), business tools (MS Office, Advanced Excel, Tally + GST), graphic design, digital marketing, spoken English and personal development. Also placement assistance, corporate training, and software/web/mobile services.
- **Who it's for:**
  1. School-leavers and college students (about 16–24) picking a career course, **often with a parent who decides and pays.**
  2. Graduates and job-seekers (about 21–30) who want a job.
  3. Working professionals upskilling (Excel, Tally, Power BI, AI).
  4. Businesses (corporate training, web/app services).
- **Primary action:** Book a demo class or counselling call (**[VERIFY]** whether the demo is free). **Secondary:** tap-to-call, WhatsApp, visit a branch.
- **Product type:** marketing plus content (courses, blog) plus lead capture. Density follows constitution DN1 for marketing pages, DN3 for the blog, and structured, scannable layouts for course detail.
- **The product's material:** the syllabus, the batch, the project, the interview.
- **Audience reality:** mobile-first, mid-range Android, 4G. Parents and students both read the page and want different proof.

## 2. Identity

- **Three adjectives:**
  1. **Exact:** excludes vague hype. Every course shows its real syllabus, duration, projects, and tools.
  2. **Grounded:** excludes stock-photo cheer and neon "hacker" gloss. Real branches, real instructors, real student work.
  3. **Encouraging:** excludes cold or elitist. Many learners are first-timers, and the tone should say a beginner belongs here.
- **Feels like:** a well-run workshop with a clear plan: you always know what you'll learn this week and what it leads to.
- **Avoid list:**
  - Dark neon "coder" aesthetic (the current site's theme colour is near-black).
  - Cartoon mascots, 3D blob illustrations, gradient hero backgrounds.
  - Clouds of tech logos on the homepage (the current icon grid).
  - Stock photos of smiling students at laptops.
  - Keyword-stuffed visible copy ("Best computer class in Vijay Nagar Indore" repeated). Local keywords belong in metadata, URLs, and natural headings.
  - Fake urgency (countdowns, "only 3 seats").
  - Any placement guarantee or percentage the institute can't prove.
- **Directions considered:**
  - **A: Dark developer terminal.** Mono type, neon accents. *Category default for coding institutes, so rejected.* Also conflicts with parents as an audience.
  - **B: Friendly ed-tech.** Rounded illustrations, bright gradients, mascot. *Second category default, so rejected.* Reads childish to graduates and professionals.
  - **C: "The Syllabus."** Light, ruled, typographic layout that treats the course syllabus as the interface: real week-by-week curricula, spec-sheet tables, outcomes. Credible to parents, concrete for students, hard to fake.
- **Chosen: C.** The institute's real advantage is that the learning is structured and the outcomes are specific, and a syllabus-led design makes that visible instead of claiming it.
- **Signature element (exactly one): the Curriculum Map.** An interactive, week-by-week syllabus per course (modules, tools, a project at each stage, assessment), plus a compact "Find your path" selector on the homepage that recommends a course sequence by goal. It is built from real data, never invented.

## 3. Tokens [PROVISIONAL]

*Sample the real logo first. If the logo's colours clash with this palette, adopt the logo's hue as the accent and re-check contrast. Record the change in §8.*

**Color**

| Token | Value | Use |
|---|---|---|
| canvas | `#F6F7F9` | page background |
| surface | `#FFFFFF` | panels, cards |
| surface-raised | `#FFFFFF` + elevation-2 | menus, dialogs |
| ink | `#0B1220` | primary text; inverted bands use this as background |
| ink-muted | `#4A5568` | secondary text (about 7:1 on canvas) |
| hairline | `#D8DCE3` | borders, table rules |
| accent | `#147A77` | **one job: the primary action** (sampled from official Prime Step logo; white text on it is 5.2:1; hover `#0F5250` is 8.9:1) |
| accent-ink | `#FFFFFF` | text on accent |
| success / warning / danger | `#15803D` / `#B45309` / `#B91C1C` | status only |

- **Surface policy:** light by default, with **one inverted band** (ink background) for the placement section to add weight. No full dark theme.
- **Gradients:** none.

**Typography** *(test both pairings in rendered headlines; swap if word gaps or numerals look off)*
- Display and text: **Schibsted Grotesk**, 600/700 for display, 400/500 for text.
- Code only: **JetBrains Mono** (syllabus code snippets). Use tabular numerals in sans for durations, batch timings, and fees, not mono.
- Devanagari fallback in the stack (**Noto Sans Devanagari**) so Hindi pages can be added later without redesign.
- Scale: 14 / 16 / 20 / 28 / 40 / 64 / 88 (display uses `clamp()`). Body is 16px on mobile and 18px from 1024px.
- Display tracking -0.02em; line-height 1.05 for display, 1.6 for body; prose measure 60ch.

**Spacing, radius, elevation, borders**
- Base unit 8px. Section padding 96–144px desktop, 64–80px mobile.
- Radii: 4 / 8 / 16 + pill (pill only for the status tag and the primary button).
- Elevation: level 0 (hairline only), level 1 (cards on hover), level 2 (menus and dialogs). Neutral, low-opacity.
- Border: 1px hairline.

**Motion**
- UI feedback 150ms; entrances 240ms; easing per constitution MO2.
- Signature motion: the Curriculum Map's week rail progresses as the user moves through modules. It is functional, not decorative.
- Reduced motion: no movement, instant state changes.

## 4. Layout plan (each section has its own structure, per LR1)

1. **Header:** wordmark, nav (Courses, Placement, Branches, Success stories, Blog), accent button "Book a demo class", visible phone number on mobile (tap-to-call) and a WhatsApp link.
2. **Hero:** left-aligned, asymmetric. Large type and a short line, with the **"Find your path"** selector on the right instead of a fake device mockup. No pill above the headline.
3. **Proof strip:** a single hairline-ruled row of real facts (founded year, number of branches, Google rating with source and date). Only verified items.
4. **Curriculum Map (signature):** full-width, tabbed by track, with the week rail on the left and module detail on the right.
5. **A week at The Prime Step:** a horizontal timeline of how a batch runs (class, lab, project review, doubt session). Real schedule only.
6. **Placement (inverted ink band):** a table of real placements (company, role, year, with student consent), plus the placement process in steps.
7. **Instructors:** real faces, real experience, large portraits in an editorial grid that breaks the card pattern.
8. **Branches:** three branches in a stacked list with address, hours, phone, and a click-to-load map. Not a row of equal cards.
9. **Fees and FAQ:** a clear table plus an accordion, from the existing "Pricing & FAQ" page.
10. **Closing CTA:** one short counselling form (name, phone, course, branch) on the canvas, with all states designed.
11. **Footer:** consistent name, address and phone; course and branch links; social links; privacy and terms.

## 5. Content and voice

- **Voice in three words:** plain, specific, reassuring.
- **Current copy to retire:** "Your Gateway to Success," "turn your aspirations into reality," "Unlock Your Potential," "Premier training and unwavering support." These fail CP2.
- **Candidate hero lines (owner approves; each claim must be true):**
  - "Learn the skill. Build the project. Sit the interview."
  - Subline: "Classroom IT training in Indore, from Excel and Python to full-stack and data analytics, with project work and placement support."
  - Alternates: "Courses with a syllabus you can read before you pay." / "A clear plan from first class to first interview."
- **CTA labels:** "Book a demo class," "See the syllabus," "Call 94796 11441."
- **Real content available on the live site:** course and branch page text, blog posts, social links, contact details, the "Pricing & FAQ", "Instructors", and "Student Success Stories" pages (the agent must read them; their content was not fully captured here).
- **Facts from the live site:**
  - Phone 94796 11441, email TheprimestepEdu@gmail.com.
  - Vijay Nagar branch: Shagun Tower, above Apna Sweets, Vijay Nagar Square, Indore, MP 452010. The footer lists units 123 (1st floor), 210, and 303. **[VERIFY]** which are correct.
  - Other branches: Annapurna and Bhawarkua (pages exist).
  - Founded 2019 per the institute's own blog post. **[VERIFY]**
  - Social: Facebook `theprimestep`, Instagram `theprimestep`, LinkedIn company page `the-prime-step`.
- **Claims that must be verified or removed (OP1):**
  - "4.9 / 2394 Google reviews"
  - "Trusted by thousand of students"
  - "Hundreds of alumni at top companies"
  - "Most trusted" and "best" superlatives
  - Opening hours "24/7"
  - Any batch-size claim
- **Placeholders in use:** tracked in `CONTENT_GAPS.md` (the agent creates and maintains it). Nothing marked PLACEHOLDER ships to production.

## 6. Assets

- **Icons:** Lucide, 1.5px stroke, sizes 16/20/24.
- **Imagery:** real photographs of the branches, classrooms, instructors, and student projects. Until a shoot happens, use typography, real syllabus data, and screenshots of real student projects, with no stock photography. Recommended: a half-day photo shoot across the three branches.
- **Tool logos:** small, monochrome, and only on course pages as a "tools covered" line. Never as a homepage cloud.
- **Logo:** the live site has several logo files (`new-logo-prime-21`, `Logo_Tps`, `logo-1`). **[VERIFY]** which is current and obtain a vector (SVG). Flag the wordmark as a placeholder if no vector exists.
- **References:** *(owner supplies 3–5 sites they admire, with a line on why each works. Until then, direction is derived from the product, per OP2.)*

## 7. Constraints

- **Stack:** Next.js. The agent must inspect the repo first (router type, version, styling approach, content source) and follow its conventions.
- **Live-site note:** theprimestep.com currently runs on **WordPress with Elementor**. **[VERIFY]** whether the Next.js repo is a rebuild of it, a headless front end to it, or something else, and where the content will come from.
- **Must preserve:**
  - Every existing URL that has content, including the many `/best-...-in-indore` and `/courses/...` slugs. Implement 301 redirects for anything merged or removed.
  - Page titles, meta descriptions, canonicals, heading hierarchy, and structured data where present.
  - Google Tag Manager containers `GTM-N2JPKJR5` and `GTM-TK8HGZB` **[VERIFY both are intended]** and the Google Search Console verification meta tag, so verification doesn't lapse.
  - Social links and contact details.
- **Performance budget (mid-range Android, 4G):** LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms, initial JS ≤ 150KB compressed on the homepage.
- **Dependencies:** no animation or 3D libraries. CSS and small, purpose-built components only.
- **Browsers and devices:** evergreen browsers, Chrome and Samsung Internet on Android, Safari on iOS. Test at 360 and 375px as well as the constitution's widths.

## 8. Decision log

| Date | Decision | Reason |
|---|---|---|
| 2026-11-22 | Chose direction C, "The Syllabus"; rejected the dark-terminal and friendly-ed-tech defaults | Fits the audience (parents and students), the product's real strength (structured learning), and avoids both category clichés |
| 2026-11-22 | Adopted official logo Teal (`#147A77` / `#0F5250`) as the sole accent on `#F6F7F9` canvas and `#0B1220` ink | Per §3, sampled the real Prime Step logo SVG (`#1E9C99`). Calibrated to `#147A77` for WCAG AA (5.2:1 with white) while eliminating clashes with the logo |
| 2026-11-22 | Kept the satin-anodized 3D "P" monument in the desktop hero on a clean flat surface; removed WebGL clouds, typing animation, custom cursor, and scroll-jacking | User preference to retain the signature 3D "P" craft without competing effects or scroll friction; lazy-loaded on desktop after idle with a static poster on mobile to protect LCP |
| 2026-11-22 | Used the 3 verified campus/lab photos (`public/brand/tps-*.jpg`) in a single editorial showcase; no stock photography | Real institute classrooms exist in repo; instructor portraits and placed-student photos are tracked in `CONTENT_GAPS.md` until supplied |

## 9. Problems found on the live site (fix; do not migrate)

1. **Injected spam.** The homepage content contains a long list of off-topic outbound links (gambling, adult, and other unrelated commercial sites), and blog posts show "previous/next post" links to unrelated spam pages. This is a strong sign the WordPress site has been compromised. **Do not import any of it.** Sanitize every content import, strip links to domains that aren't the institute's or an approved list, and tell the owner to clean the WordPress install (core and plugin reinstall, credential rotation, user audit) and check Google Search Console for security issues or manual actions, because this harms rankings and trust.
2. **Lorem ipsum** on the homepage ("Comprehensive Courses") and in at least one blog post, and a default placeholder image set as that post's social image.
3. **Mismatched copy:** on the homepage "Why Choose" block, several descriptions sit under the wrong headings (for example the placement heading carries an infrastructure blurb).
4. **Inconsistent business facts:** three different Vijay Nagar unit numbers; "24/7" hours; footer copyright 2023.
5. **Messy information architecture:** several pages named Home; several Contact pages; `test` and `sample-page`; duplicate Python, AI, and Data Science pages; three different course-index URLs.
6. **Unverified claims** (see §5).
7. **Generic copy** that fails CP2 on the homepage and the "most trusted" blog post.