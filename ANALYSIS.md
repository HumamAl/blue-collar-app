# Analysis Brief — Blue Collar App
**Job Title:** Blue collar app
**Posted:** 55 minutes ago
**Analyst:** Job Analyst Agent
**Date:** 2026-02-27

---

## Structured Analysis Brief (JSON)

```json
{
  "domain": "marketplace",
  "clientName": null,
  "features": [
    "job request board — homeowners post jobs by trade category",
    "tradesperson directory — browse plumbers, electricians, movers with ratings",
    "booking and job status tracker — from request to completion",
    "earnings and payout dashboard — tradesperson revenue summary",
    "review and rating system — post-job feedback flow",
    "trade category management — filter by service type"
  ],
  "challenges": [
    {
      "title": "Two-sided matching: connecting the right tradesperson to each job request",
      "vizType": "flow-diagram",
      "outcome": "Could reduce average time-to-match from manual browsing to under 60 seconds with category + availability filtering"
    },
    {
      "title": "Trust and verification layer — buyers need confidence before booking a stranger",
      "vizType": "before-after",
      "outcome": "Could increase booking conversion by surfacing license status, review count, and completion rate on every tradesperson card"
    },
    {
      "title": "Job lifecycle management across two user types (homeowner and tradesperson)",
      "vizType": "flow-diagram",
      "outcome": "Could eliminate status confusion by showing a single shared job timeline visible to both parties in real time"
    }
  ],
  "portfolioProjects": [
    "Lynt Marketplace",
    "Rental PM Connect",
    "Tri-Gear Market",
    "Sienna Charles — Vendor Admin"
  ],
  "coverLetterHooks": [
    "TaskRabbit but focused on tradespeople",
    "plumbers, electricians, movers",
    "simple, clean app",
    "iOS + Android (full-stack mobile)"
  ],
  "screeningQuestion": null,
  "screeningAnswer": null,
  "aestheticProfile": {
    "aesthetic": "saas-modern",
    "mood": "approachable, trustworthy, consumer-friendly marketplace",
    "colorDirection": "amber at oklch(0.58 0.15 75) — warm and energetic, mid-range chroma for a consumer marketplace that feels welcoming not corporate",
    "densityPreference": "standard",
    "justification": "The client explicitly said 'simple, clean' — that is the clearest design signal in the post. This is a consumer-facing marketplace (homeowners and tradespeople are everyday people, not enterprise operators), which routes away from Corporate Enterprise entirely. The TaskRabbit comparison anchors the visual register: approachable, action-oriented, card-based, mobile-first. SaaS Modern captures all of this — rounded cards, subtle shadows, warm amber accent, clean whitespace. It reads as professional and polished to a non-technical consumer audience without feeling cold or bureaucratic. E-Commerce was considered but rejected because this is a services booking platform, not a product catalog — SaaS Modern better matches the two-sided service workflow."
  },
  "clientVocabulary": {
    "primaryEntities": ["job", "tradesperson", "homeowner", "booking", "trade"],
    "kpiLabels": ["Active Jobs", "Tradespeople Listed", "Bookings This Month", "Avg Rating", "Completion Rate"],
    "statusLabels": ["Open", "Matched", "In Progress", "Completed", "Cancelled", "Disputed"],
    "workflowVerbs": ["post", "browse", "book", "dispatch", "complete", "review"],
    "sidebarNavCandidates": ["Job Board", "Tradesperson Directory", "Bookings", "Earnings", "Reviews"],
    "industryTerms": ["trade category", "service area", "license verification", "job request", "quote", "completion rate"]
  },
  "designSignals": "The client's reference to TaskRabbit anchors the expected visual register: a clean, two-sided consumer marketplace with strong mobile presence. Everyday homeowners and blue-collar tradespeople are the users — they expect something that feels modern and trustworthy, not technical or dense. The word 'simple' is a direct design instruction. The visual bar is set by apps like TaskRabbit, Thumbtack, and Angi — card-based service listings, clear booking CTAs, rating badges prominent. Over-engineering the visual language (dark premium, data-dense) would feel mismatched; under-engineering it (corporate enterprise) would feel cold for a trust-dependent consumer transaction.",
  "accentColor": "amber",
  "signals": ["VAGUE_POST", "NEW_CLIENT"],
  "coverLetterVariant": "A",
  "domainResearcherFocus": "Focus on the home services / trades marketplace vocabulary: job types (water heater installation, outlet replacement, furniture assembly, full bathroom renovation), trade categories (plumbing, electrical, HVAC, general labor, moving), and service pricing ranges (small jobs $75–$250, large jobs $500–$3,000+). Entity names should be realistic tradespeople (e.g., 'Mike's Plumbing', 'Torres Electrical', 'Rivera Moving Co.') and homeowner first-name clients. Key metrics to keep authentic: completion rate (industry average ~85–92%), avg response time (under 2 hours is a selling point), avg job rating (4.3–4.8 stars realistic range), cancellation rate (5–12%). Edge cases to include in mock data: disputed jobs, unverified license status, tradespeople with zero reviews (new to platform), high-demand periods (summer for HVAC, winter for plumbing). Real apps in this space: TaskRabbit, Thumbtack, Angi, HomeAdvisor, Handy — all use card-based service listings, clear pricing estimates, and prominent review counts."
}
```

---

## Narrative Notes for Downstream Agents

### Domain Classification Rationale

This is a **marketplace** — specifically a two-sided home services / trades marketplace. The client drew the explicit comparison to TaskRabbit, which is the defining reference for this product category. "Blue collar" and the named trades (plumbers, electricians, movers) confirm it is a services marketplace, not a product marketplace. Domain hue: amber at hue 75 (the marketplace base hue in the design system).

### Aesthetic Selection Rationale

**SaaS Modern** was chosen over the alternatives for the following reasons:

- "Simple, clean" is a direct design instruction from the client. SaaS Modern delivers visual cleanliness via rounded cards, subtle shadows, and clean whitespace.
- The TaskRabbit comparator is built on a SaaS Modern visual language — card-based layouts, approachable typography, prominent booking CTAs.
- Both sides of the marketplace are everyday consumers (homeowners + tradespeople), not enterprise operators — this rules out Corporate Enterprise and Data-Dense.
- E-Commerce was considered but rejected because this is a services booking flow, not a product catalog. The primary interaction is "post a job / browse tradespeople / book", not "add to cart."
- Dark Premium was never in contention — the client wants something accessible and familiar, not a premium luxury aesthetic.

The amber accent (hue 75) is the standard marketplace color from the design system. It reads as warm, energetic, and action-oriented — appropriate for a consumer marketplace where users take action.

### Portfolio Project Selection Rationale

| Project | Why Selected |
|---|---|
| Lynt Marketplace (#15) | Direct domain match — marketplace architecture, vendor onboarding, listing management |
| Rental PM Connect (#14) | Two-sided matching platform — exact structural parallel (matching two parties, verification, reviews) |
| Tri-Gear Market (#24) | Niche marketplace with seller verification and listing management — shows marketplace pattern credibility |
| Sienna Charles — Vendor Admin (#8) | Vendor directory, category filters, booking management, spend tracking — most feature-overlapping project |

### Cover Letter Hook Analysis

The job post is brief (VAGUE_POST signal detected), so the strongest hooks are the specifics the client did volunteer:

1. **"TaskRabbit but focused on tradespeople"** — Use this exact framing. It tells the client you read the post and already know the product category.
2. **"plumbers, electricians, movers"** — Naming these specific trades in the demo UI (category filters, mock data) signals you built something for them, not a generic marketplace template.
3. **"simple, clean"** — Reference the design philosophy directly. Telling a client their stated preference is what the demo delivers is high-conversion.
4. **"iOS + Android"** — This is a React Native / mobile-first job. The demo is a web preview; acknowledge in the cover letter that the mobile architecture is the full build but the demo shows the core experience.

### Signal Analysis

| Signal | Value | Notes |
|---|---|---|
| VAGUE_POST | Soft negative | Short description (under 100 words, no feature list). However, the TaskRabbit comparator compensates — it's a well-understood product category. |
| NEW_CLIENT | Medium risk | No prior hire history shown. The demo becomes even more important as a trust signal — it materializes what they're imagining. |
| Budget | Not listed | Apply budget anchoring through demo quality. A polished working demo sets the expectation of a $2,000–$5,000 engagement. |

**Cover letter variant A** ("Built It Already") is correct for this job. The post is vague enough that a working demo is the most compelling differentiator — it shows the client what they couldn't articulate.

### Screening Questions

None detected in the job post. `screeningQuestion: null`.

### Dashboard Composition for the Demo

For a trades marketplace, the admin/operator dashboard should show:

- **KPI row** (5 cards): Active Jobs, Tradespeople Listed, Bookings This Month, Avg Platform Rating, Completion Rate
- **Job Board overview**: Recent job requests with trade category, homeowner name, status badge, and date posted — filterable by trade type and status
- **Bookings trend**: Area chart showing bookings over the last 30 days
- **Trade category breakdown**: Bar or pie chart showing volume by trade (plumbing, electrical, HVAC, general labor, moving)
- **Top Tradespeople** widget: Short leaderboard by jobs completed + avg rating

### Feature Pages (5 sidebar pages)

Using client vocabulary throughout:

1. **Job Board** — Active job requests, filter by trade + status, quick-action to view detail
2. **Tradesperson Directory** — Card grid of tradespeople with trade badge, rating, jobs completed, availability status
3. **Bookings** — Job lifecycle table (Open → Matched → In Progress → Completed), status timeline
4. **Earnings** — Revenue summary per tradesperson, payout history, period selector
5. **Reviews** — Post-job ratings and written reviews, filter by trade category and star rating

### Technical Challenges (for Tab 2)

1. **Two-sided matching flow** (vizType: flow-diagram) — Homeowner posts job → Platform matches available tradespeople by category + location → Tradesperson accepts/declines → Job begins. The visualization shows the full routing logic.
2. **Trust and verification layer** (vizType: before-after) — Before: generic listing with no verification. After: license badge, completion rate, response time, verified reviews — the signals that convert browsers to bookers.
3. **Job lifecycle state machine** (vizType: flow-diagram) — A job passes through 6+ states (Open, Matched, In Progress, Completed, Disputed, Cancelled) and must be visible consistently to both the homeowner and the tradesperson. The challenge is that both parties see different views of the same state.

### Domain Researcher Brief Summary

The Domain Researcher should focus on:
- Realistic trade category names and service types (not just "Plumbing" — go deeper: "Water Heater Installation", "Drain Cleaning", "Emergency Pipe Repair")
- Realistic tradesperson names and business names (regional flavor: "Torres Electrical", "Kowalski Plumbing", "Rivera Moving Co.")
- Authentic pricing ranges: small handyman jobs ($75–$200), HVAC service ($150–$400), moving services ($350–$1,200), full renovation scope ($1,500+)
- Platform metric benchmarks from Thumbtack/TaskRabbit space: avg platform take rate 10–20%, completion rate 85–92%, avg response time 45–120 minutes
- Edge cases for mock data: unlicensed tradesperson flagged by platform, disputed completion (job marked complete but homeowner disagrees), tradesperson with 0 jobs (new to platform), emergency job request at 11pm

---

## Output Files

This analysis produces the input brief for all downstream agents. Key decisions:

| Decision | Value | Used By |
|---|---|---|
| `domain` | `marketplace` | Layout Builder (color tokens), Data Architect (vocabulary) |
| `aesthetic` | `saas-modern` | Layout Builder (CSS tokens, --radius: 0.75rem, shadow-md cards) |
| `accentColor` | `amber` at `oklch(0.58 0.15 75)` | Layout Builder (--primary override) |
| `densityPreference` | `standard` | Layout Builder (--page-padding: 1.5rem, --card-padding: 1.5rem) |
| `primaryEntities` | job, tradesperson, homeowner, booking, trade | Data Architect + Feature Builder (all labels) |
| `sidebarNavCandidates` | Job Board, Tradesperson Directory, Bookings, Earnings, Reviews | Layout Builder (nav items) |
| `portfolioProjects` | Lynt Marketplace, Rental PM Connect, Tri-Gear Market, Sienna Charles | Proposal Builder (Tab 3) |
| `coverLetterVariant` | A | Cover Letter Writer |
| `screeningQuestion` | null | Cover Letter Writer (no screening answer needed) |
