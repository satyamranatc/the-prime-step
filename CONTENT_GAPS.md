# CONTENT_GAPS.md — The Prime Step

> Tracks every unverified claim (`[VERIFY]`) and missing real asset (`PLACEHOLDER`) per `Design_Constitution.md` (`OP1`, `OP8`) and `DESIGN_DIRECTION.md` (§5).
> Nothing unverified is published on the homepage. Supply real values below to enable optional proof sections.

---

## 1. Facts to Verify (`[VERIFY]`)

| Item | Current Value in Repo | Action Needed from Institute |
|---|---|---|
| Google review count | `4.9★` / `1,000+ Google reviews` (Google knowledge panel showed `1,081` reviews on Nov 2026; legacy site cited `2,390+`) | Confirm exact combined multi-branch Google review count and date. |
| Free 2-day demo class | Copy mentions "Book a free demo class" / "2-day free demo" | Confirm whether demo classes are 1-day or 2-day and free across all 3 branches. |
| Vijay Nagar unit numbers | Shagun Tower, units `123, 210 & 303` | Confirm all three unit numbers are currently active. |
| Founding year | `2019` | Confirm official year of establishment. |
| Google Tag Manager / Search Console | `DESIGN_DIRECTION.md` §7 mentions `GTM-N2JPKJR5` and `GTM-TK8HGZB` | Confirm whether both GTM containers should be added to `layout.tsx` and supply the GSC verification meta content if needed. |

## 2. Optional Real Content Needed (Hidden Until Supplied)

These data arrays live in `src/lib/homepage.ts` and stay cleanly hidden on the homepage until real entries are added:

1. **Real Placement Table (`PLACEMENT_RECORDS`)**: Verified student placements — *First name / initials, Course completed, Role, Company, Year* (with student permission).
2. **Hiring Partners (`HIRING_PARTNERS`)**: Verified company names/SVG logos where alumni have been placed.
3. **Student Testimonials (`TESTIMONIALS`)**: Genuine student reviews copied from Google Reviews or written feedback with permission.
4. **Instructor Portraits & Bios**: Real photos and teaching experience of core faculty for an editorial Instructors band.
5. **Fee Ranges / Batch Start Dates**: Optional fee/EMI table per track if the institute wants transparent starting fees on the homepage.
6. **Verified Students Trained Count**: Exact verified number (legacy copy had `5,000+` and `8,500+` in different places — omitted from homepage until one verified figure is confirmed).
