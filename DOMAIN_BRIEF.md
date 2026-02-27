# Domain Knowledge Brief — Trades / Home Services Marketplace (On-Demand, Mobile-First)

## Sub-Domain Classification

On-demand trades and home services marketplace — mobile-first platform connecting homeowners with vetted independent tradespeople (plumbers, electricians, HVAC techs, movers, handymen, carpenters, landscapers, painters, cleaners, roofers). Comparable to TaskRabbit / Thumbtack / Angi in model, but positioned as a blue-collar-first app focused on hourly and flat-rate jobs in the $75–$2,000 range. Operator (admin) view: a platform dashboard for monitoring live bookings, managing pro profiles, handling disputes, and tracking marketplace health KPIs.

---

## Job Analyst Vocabulary — Confirmed and Extended

No Job Analyst brief was provided. The following is built from scratch based on the domain research.

### Confirmed Primary Entity Names

These are the exact terms that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- **Primary record type**: "Job" (not "order", not "task" in a B2B admin context — "task" is TaskRabbit-specific consumer language; "job" is the universal trades term across Thumbtack, Angi, Housecall Pro, Jobber, ServiceTitan)
- **Service provider role**: "Pro" (used by Thumbtack and nearly every platform — short for "professional"; never "vendor", "contractor" in UI labels, "worker")
- **Customer role**: "Homeowner" or "Customer" (Angi says "homeowner", TaskRabbit says "client", Thumbtack says "customer" — for a trades-focused app, "homeowner" is the most resonant)
- **Service request before booking**: "Request" (homeowner submits a service request)
- **Quote/estimate from pro**: "Quote" (universal — all platforms use this; "estimate" is a secondary synonym in the field)
- **Confirmed booking**: "Booking" (the confirmed, paid, scheduled engagement)
- **Work authorization/payment**: "Invoice" (after job completion)
- **Trade category**: "Service Category" or just "Category"
- **Pro credentials**: "License", "Insurance", "Background Check"
- **Rating record**: "Review" (not "feedback", not "rating" — pros and customers both leave "reviews")
- **Geographic territory**: "Service Area" (pro sets their service area by ZIP codes or radius)
- **Schedule slot**: "Availability" (pro sets availability windows)
- **Marketplace fee**: "Platform Fee" or "Service Fee" (taken from pro payout or added to customer total)

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Active Pros | Verified, active pros who accepted at least 1 job in last 30 days | Count |
| Jobs Completed | Total completed bookings in selected period | Count |
| Avg. Job Value | Average revenue per completed booking | $ |
| Gross Marketplace Volume (GMV) | Total dollar value of all bookings (before fees) | $ |
| Platform Revenue | Platform fees collected (% of GMV) | $ |
| Avg. Response Time | Median time from job request submission to first pro response | minutes / hours |
| Quote Acceptance Rate | % of quotes sent by pros that result in a confirmed booking | % |
| Job Completion Rate | % of confirmed bookings that are marked completed (not cancelled/disputed) | % |
| Avg. Pro Rating | Mean star rating across all completed reviews | e.g., 4.7 / 5.0 |
| Customer Satisfaction (CSAT) | % of customers who rated the job 4 or 5 stars | % |
| Repeat Booking Rate | % of customers who booked again within 90 days | % |
| Pro Utilization Rate | % of available pro hours that are booked | % |
| Time-to-Book | Median time from request creation to booking confirmation | hours |
| Dispute Rate | % of completed jobs that resulted in a dispute or refund request | % |
| New Pro Signups | New pro registrations in period (pending + approved) | Count |
| Cancellation Rate | % of confirmed bookings cancelled before job start | % |

### Status Label Vocabulary

**Job/Booking lifecycle statuses:**
- Active states: "Requested", "Quoted", "Awaiting Confirmation", "Confirmed", "En Route", "In Progress"
- Completion states: "Completed", "Invoiced", "Paid Out"
- Problem states: "Disputed", "Cancelled", "No-Show", "On Hold"
- Admin states: "Flagged", "Under Review"

**Pro profile statuses:**
- "Active" (verified, taking bookings)
- "Pending Verification" (background check / license check in progress)
- "Suspended" (temporarily removed from marketplace)
- "Deactivated" (permanently removed)
- "Background Check Failed"
- "License Expired"

**Job request urgency tags:**
- "Standard" (24–72 hour window)
- "Same-Day" (within 4–8 hours)
- "Emergency" (within 1–2 hours, after-hours premium applies)

### Workflow and Action Vocabulary

**Primary actions (admin):**
- "Approve Pro" — verify a pro and activate their profile
- "Suspend Pro" — temporarily remove a pro from marketplace
- "Assign Job" — manually match a job request to a specific pro
- "Resolve Dispute" — close a disputed booking with an outcome
- "Issue Refund" — process a customer refund
- "Flag Account" — mark a pro or customer account for review

**Primary actions (pro, in mobile app):**
- "Send Quote" — submit an estimate for a job request
- "Accept Booking" — confirm a scheduled job
- "Decline Job" — pass on a job request
- "Check In" — mark job as started / arrived on site
- "Complete Job" — mark work done, trigger invoice
- "Request Reschedule" — ask customer to change time

**Primary actions (homeowner, in mobile app):**
- "Post a Job" — submit a new service request
- "Get Quotes" — browse pro responses to their request
- "Book a Pro" — confirm a specific pro's quote
- "Leave a Review" — submit post-job rating and review

**Secondary actions:**
- "Verify License" — check pro's trade license against state database
- "Run Background Check" — trigger Checkr or similar verification
- "Boost Listing" — pro pays to be featured in category search
- "Escalate Dispute" — elevate a dispute to senior support

### Sidebar Navigation Candidates

For the admin/operator dashboard view:

1. **Overview** (platform health at a glance — GMV, active jobs, disputes)
2. **Jobs** (all booking records — filterable by status, category, date)
3. **Pros** (pro profiles, verification status, ratings, earnings)
4. **Homeowners** (customer accounts, booking history, dispute flags)
5. **Disputes** (active and resolved disputes with outcome tracking)
6. **Payouts** (pro earnings, pending payouts, platform fee collection)
7. **Categories** (service category management, pricing guidance)
8. **Reviews** (review moderation, flagged reviews, rating trends)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

The trades / home services marketplace sits between two visual traditions: the **consumer-grade mobile app** (clean, card-based, approachable) and the **operations dashboard** (status-dense, action-oriented). The client is building a mobile app, but the demo we're building is an operator/admin dashboard. This means the visual register tilts toward ops-clarity with consumer warmth — not the clinical density of logistics TMS software, and not the airy spaciousness of a wellness app.

The key visual signals practitioners in this space have internalized come from tools like Housecall Pro, Jobber, and the Angi/Thumbtack pro portals: a clean white or light gray surface, a dominant action-blue or orange-amber accent, status badges with clear color coding (green = completed, amber = in progress, red = dispute/problem), and a card-based layout for job queues that mimics how dispatchers think about their day. These apps are used on iPads and desktops in trucks, offices, and kitchens — so readability at arm's length is a real design requirement.

Trustworthiness is the dominant emotional register for this domain. Homeowners are letting strangers into their homes, so every platform in this space over-indexes on trust signals: verified badges, star ratings prominently displayed, license and insurance indicators, profile photos of pros with their first name. The admin dashboard mirrors this ethos — it is fundamentally a trust management system. Visual choices that feel safe, professional, and reliable are correct. Experimental or playful aesthetics would feel wrong to a domain expert.

Color conventions: blue (trust, professionalism, reliability) is the dominant primary across nearly every platform in this space — TaskRabbit uses a deep royal blue, Thumbtack uses a vibrant blue-teal, Angi uses a red-orange but their pro portal leans blue-gray, Housecall Pro uses a blue-accent on white. A secondary warm accent — orange, amber, or coral — is common for CTAs and "take action now" states, and it maps naturally to the trades color associations (tool orange, safety vest orange, hard hat yellow). This blue-primary + orange/amber-CTA combination is the most domain-appropriate color pairing in this space.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Housecall Pro** — The dominant field service management app for small-to-mid trades businesses. Clean white interface, blue primary (#1B4F9C range), card-based job pipeline view organized by status column, drag-and-drop scheduling calendar with tech-colored rows. Dense but not overwhelming. If the admin dashboard demo looks like "a well-built Housecall Pro for a marketplace," domain experts will immediately recognize it as sophisticated.

2. **Jobber** — The other dominant FSM platform, used heavily by electricians, plumbers, and landscapers. Similar blue-dominant aesthetic, very clean typography, strong use of status badges (color-coded pill badges are a Jobber signature), a "Work Requests" inbox that shows queued jobs. Practitioners consider Jobber the "cleaner, friendlier" alternative to ServiceTitan. Their dashboard features a revenue trend chart, upcoming jobs widget, and outstanding invoice summary — all appropriate reference patterns.

3. **Thumbtack for Pros (mobile app)** — The pro-facing portal for the marketplace. Jobs come in as "opportunities" with the homeowner's request details, budget range, and location. Pros see a feed of opportunities to quote. Clean list-based layout with category icons, rating display prominent, earnings summary at top. The pro dashboard in Thumbtack shows leads received, quotes sent, jobs booked, and earnings — a direct reference for what a pro's performance view should look like.

### Aesthetic Validation

- **Job Analyst chose**: Not specified (this is Phase 2 standalone research)
- **Domain recommendation**: **SaaS Modern** with a lean toward **Corporate Enterprise** density. The SaaS Modern aesthetic (0.75rem radius, clean card-based layout, shadow-md) matches the design language of Housecall Pro and Jobber well — it is professional but not clinically stiff. The domain's trust-orientation means it should not be too casual (Warm Organic would feel wrong) or too dark (Dark Premium would undermine the open, transparent marketplace feeling). If a secondary influence is needed, slight Corporate Enterprise density on the data tables is appropriate.
- **Color recommendation**: Blue primary in the range of oklch(0.45 0.18 240) to oklch(0.52 0.20 245) — a confident, trustworthy mid-blue. Secondary/CTA accent in amber-orange range: oklch(0.72 0.18 50) to oklch(0.76 0.19 55). This blue + amber pairing is the dominant convention across every major platform in this space.
- **One density adjustment**: Standard density is correct. Compact would feel too cramped for a mobile-first client who values approachability; spacious would waste screen space on the job queue view that needs to show multiple records simultaneously.

### Density and Layout Expectations

This domain sits at **standard density** — not a power-user terminal, but not a marketing site. Job tables should show 10–15 rows without scrolling on a typical desktop. KPI cards at the top are a strong convention (every FSM tool opens with a summary row). The primary visualization pattern is a **job queue / pipeline** — jobs organized by status stage. Secondary pattern is a **list-based table** with status badges. Chart usage: area or bar chart for job volume / revenue trends, simple stat cards for current-period numbers.

Layout is predominantly **list-heavy** for the Jobs and Pros views (tables with inline actions) and **card-heavy** for the Overview/Dashboard view (KPI cards + mini-charts + recent activity feed). The distinction matters: a "jobs view" that only shows cards would feel wrong to someone who has used Jobber or Housecall Pro.

---

## Entity Names (10+ realistic names)

### Companies / Organizations

These are the marketplace platform name and example pro business names:

- Tradelink (the platform itself — or FixIt, ProMatch, BlueCollar Connect, WorkHand)
- Apex Plumbing & Drain LLC
- Brightside Electrical Services
- Summit HVAC & Refrigeration
- EasyMove Relocation Co.
- GreenEdge Landscaping
- ProFinish Painting
- AllHands Handyman Services
- Ridgeline Roofing & Gutters
- ClearView Cleaning Solutions
- Heritage Carpentry & Trim
- FastFix Home Repair

### People Names (role-appropriate)

Trades workforce is predominantly male but increasingly diverse; customer base skews homeowner demographic 30–60 years old.

**Pros (Tradespeople):**
- Marcus Webb (Electrician, Master License)
- Danny Kowalski (Plumber, Licensed & Insured)
- Carlos Reyes (HVAC Technician)
- Troy Breckenridge (Handyman)
- Alejandro Fuentes (Landscaper)
- Kevin O'Brien (Painter)
- DeShawn Harris (Mover / Labor)
- Raj Patel (General Contractor)
- Tommy Nguyen (Carpenter)
- Steve Okafor (Roofer)

**Homeowners (Customers):**
- Sarah Lindstrom (Austin, TX)
- Michael Park (Denver, CO)
- Jennifer Castillo (Phoenix, AZ)
- Dave and Rachel Moreau (Nashville, TN)
- Amanda Torres (Chicago, IL)
- Greg Hoffman (Charlotte, NC)

### Products / Services / Job Types

These are the service categories that appear in dropdowns, filters, and job records:

- Plumbing — Drain Cleaning
- Plumbing — Leak Repair
- Plumbing — Water Heater Installation
- Electrical — Panel Upgrade
- Electrical — Outlet / Switch Repair
- Electrical — Ceiling Fan Installation
- HVAC — AC Tune-Up
- HVAC — Furnace Repair
- HVAC — Duct Cleaning
- Moving — Local Residential Move
- Moving — Packing Services
- Painting — Interior Room Painting
- Painting — Exterior House Painting
- Landscaping — Lawn Mowing & Edging
- Landscaping — Tree Trimming
- Handyman — Furniture Assembly
- Handyman — Drywall Repair
- Cleaning — Deep House Clean
- Cleaning — Move-Out Clean
- Roofing — Roof Inspection
- Roofing — Shingle Repair
- Carpentry — Deck Repair
- Carpentry — Cabinet Installation

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Handyman hourly rate | $55/hr | $75/hr | $125/hr | Specialty skills (electrical, plumbing-adjacent) at high end. Source: Angi, HomeGuide 2025 |
| Plumbing job total | $150 | $320 | $1,200+ | Drain clean ~$150–$300; water heater install $800–$1,500. Source: HomeAdvisor 2025 |
| Electrical job total | $180 | $390 | $1,800+ | Single outlet repair ~$180; panel upgrade $1,500–$4,000. Source: HomeAdvisor 2025 |
| HVAC service call | $75 | $150 | $300 | Diagnostic fee $90–$125; full repair $400–$2,000. Source: HouseCallPro, Angi 2025 |
| Local moving job total | $880 | $1,705 | $3,200+ | 2-mover, 4-hour local move. Source: Angi, Thumbtack 2025 |
| Painting — interior room | $300 | $750 | $2,500 | Single bedroom ~$300–$500; whole interior $2,000–$5,000 |
| Landscaping — lawn service | $45 | $85 | $175 | Single mowing visit; larger lots at high end |
| Cleaning — deep clean | $150 | $280 | $500 | 2,000 sq ft home; move-out cleans at high end |
| Roofing repair | $350 | $900 | $3,500 | Minor shingle patch to full section repair |
| Platform service fee (%) | 5% | 15% | 25% | TaskRabbit charges 15% from Tasker; Thumbtack charges per-lead; Angi subscription-based |
| Pro response time (request to first quote) | 12 min | 2.4 hrs | 24+ hrs | Emergency requests drive fast response; off-peak requests can take hours |
| Job completion rate | 78% | 88% | 95% | Platforms with strong pro vetting see 90%+ |
| Avg. pro star rating (published profiles) | 3.8 | 4.6 | 5.0 | Published reviews on Thumbtack average 4.5–4.8; 5-star reviews number in millions |
| Dispute rate | 1.2% | 3.5% | 8% | Emergency/same-day jobs have higher dispute rates |
| Cancellation rate | 5% | 12% | 22% | Higher for same-day bookings; weather-related spikes |
| Active pros on platform (small-mid marketplace) | 200 | 850 | 5,000 | For demo data, ~150–400 makes sense |
| Jobs completed per month (small-mid marketplace) | 400 | 1,800 | 8,000 | |
| Repeat booking rate (90 days) | 18% | 32% | 48% | Cleaning and lawn care have highest repeat rates |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Pro | Short for "professional" — the service provider on the marketplace | Universal. Every major platform (Thumbtack, Angi Pros, Jobber) uses "Pro" not "contractor" or "vendor" in UI |
| Tasker | TaskRabbit-specific term for their service providers | Use only if explicitly building a TaskRabbit clone; otherwise use "Pro" |
| Lead | A job request that a pro can respond to with a quote | Thumbtack's model is lead-based (pros pay per lead); used internally in sales/marketing analytics |
| Quote | A price estimate submitted by a pro in response to a job request | Appears before booking is confirmed |
| Booking | A confirmed, scheduled job — customer accepted a pro's quote | The central transactional record |
| Service Area | Geographic zone where a pro accepts jobs (defined by ZIP code list or radius miles) | Appears in pro profile settings and search/matching logic |
| Instant Book | Booking a pro without waiting for a quote — pro has set flat-rate pricing and open availability | TaskRabbit's primary model; Thumbtack offers it as an option |
| Same-Day Job | A service request with a window of less than 8 hours to start | Triggers premium pricing; lower acceptance rate from pros |
| Emergency Job | A service request requiring response within 1–2 hours, often after hours | 1.5x–3x standard pricing; plumbing and HVAC primary categories |
| Background Check | Third-party criminal/identity verification run on pros before activation | Typically through Checkr; a trust signal displayed on pro profile with a badge |
| License Verification | Confirmation that a pro holds a valid state trade license | Electricians, plumbers, HVAC techs, roofers all require state licensing |
| Bonded | Pro carries a surety bond protecting customer from property damage or non-completion | Displayed as a trust badge on pro profile; required for higher-value jobs |
| Service Fee | Platform's take-rate collected from each transaction | Also called "Platform Fee" or "Commission" |
| Payout | The amount disbursed to a pro after a job is marked complete | Net of platform fee; disbursed via direct deposit or instant pay |
| Dispute | A formal complaint from customer or pro about a job outcome | Triggers admin review; can result in refund, partial refund, or no action |
| No-Show | Pro or customer fails to appear at the scheduled job time | Common edge case; triggers automatic cancellation fee logic |
| Hold Time | Time between job request and first pro contact | Tracked as a platform health metric; long hold times indicate supply gaps |
| Category | The trade type for a job (Plumbing, Electrical, Moving, etc.) | Used in search, matching, and analytics filters |
| Flat-Rate Pricing | Pro charges a fixed price for a specific defined service | vs. Hourly pricing; more common for well-defined tasks (furniture assembly, lawn mowing) |
| Surge Pricing | Dynamic price increase during high-demand periods | Common during storms, holidays, summer AC season |

---

## Common Workflows

### Workflow 1: Homeowner Books a Pro (Standard Flow)

1. Homeowner opens app, selects a service category (e.g., "Plumbing — Drain Cleaning")
2. Homeowner answers intake questions (type of drain, severity, home type, preferred date/time)
3. System shows available pros in the homeowner's service area with profiles, ratings, and starting rates
4. Homeowner submits a job request (either to a specific pro or broadcast to multiple pros)
5. Matching pros receive a push notification with job details
6. Pros respond with a quote (price, estimated duration, available time slots)
7. Homeowner reviews quotes, reads pro reviews, selects a pro
8. Homeowner confirms booking — payment method authorized but not charged yet
9. Day of job: pro receives route and job details, checks in on arrival (GPS-confirmed)
10. Pro completes work, marks job "Complete" in app
11. Invoice generated; customer's payment method charged
12. Pro receives payout (next business day or instant pay for a fee)
13. Both parties receive review prompts — 48-hour window to submit

### Workflow 2: Admin Resolves a Dispute

1. Customer submits a dispute via app — selects reason (poor workmanship, overcharge, no-show, property damage)
2. Dispute enters admin queue with status "Under Review"
3. Admin reviews: job details, timeline, invoice amount, photos (customer can upload)
4. Admin contacts pro for response — pro has 48 hours to respond
5. Admin evaluates evidence and selects outcome: Full Refund / Partial Refund / No Refund / Warning Issued
6. If refund: customer's payment method credited within 3–5 business days
7. If pattern of disputes: pro account flagged, review scheduled, possible suspension
8. Dispute closed with resolution note logged to both accounts

### Workflow 3: Pro Onboarding and Verification

1. Pro downloads app, creates account — enters trade category, years of experience, service area
2. Pro uploads trade license (photo + license number + state)
3. Pro authorizes background check — system triggers Checkr verification (10–17 business days)
4. Pro sets hourly rate or flat-rate pricing for service categories
5. Pro uploads profile photo and writes bio
6. Admin reviews application — verifies license against state database, reviews background check result
7. Admin approves or rejects — approved pro's profile goes live in search results
8. Pro receives first "Job Opportunities" notification feed

---

## Common Edge Cases

1. **Pro no-show** — Pro accepted a booking, marked "En Route," but never arrived. Customer contacts support 60+ minutes after scheduled start time. System should show "Late" flag on job record, triggering a admin alert. Outcome: customer receives priority rebooking or refund.

2. **Emergency after-hours job** — Homeowner submits a burst pipe request at 11 PM. System applies 2x emergency pricing. Only 1–2 pros in the area have emergency availability set to "on." Response time SLA is 30 minutes for emergency tier.

3. **Disputed workmanship** — Pro completed the job, marked it done, customer paid — but 3 days later, customer files dispute claiming the repair was inadequate. Job is past the standard 24-hour dispute window. Admin must evaluate whether to honor late dispute.

4. **License expired** — A pro with 47 completed jobs (4.8 rating) has a trade license that expired 30 days ago. System automated license expiry check flagged their profile. Pro's listing auto-suppressed; pro receives renewal reminder with a 14-day cure period.

5. **Surge demand event** — Major winter storm hits. HVAC and Plumbing requests spike 3x normal volume. Available pro count drops because pros are fully booked. System logs a "Supply Gap" alert for the admin dashboard. Some requests have hold times exceeding 6 hours.

6. **Review manipulation** — Admin flags a new pro with 12 reviews, all 5-star, all submitted within 48 hours of profile activation. Pattern matches fake review behavior. Pro account flagged for manual review.

7. **Partial job / scope creep dispute** — Pro quotes $280 for a drain clean; during job, discovers additional issue and tells customer it will be $650. Customer says they weren't told up front, disputes the extra charge. This is a "mid-job scope change" dispute — common in plumbing and electrical.

8. **Pro with multiple categories** — A handyman applies to be listed in 8 different categories. Platform policy may limit uncertified pros to categories that don't require trade licensing. Admin must review each category request individually.

---

## What Would Impress a Domain Expert

1. **"Background Check Badge" and "License Verified" trust signals on pro cards** — Every major platform (Thumbtack, Angi, TaskRabbit) shows these prominently. Any demo that includes these badges on pro profile cards will read as platform-native, not generic.

2. **Emergency pricing multiplier on after-hours jobs** — Insiders know that HVAC and plumbing after-hours calls run 1.5x–3x standard. Showing an "Emergency Rate" field on a job record ($420 vs. $140 standard) and surfacing this in the KPI data signals real domain knowledge.

3. **Payout timing nuance** — Pros don't get paid the same day. Standard payout is next business day; "Instant Pay" costs a fee (typically 1–2%). Including a "Payout Status" column in the pro dashboard with values like "Processing", "Scheduled — Feb 28", "Instant Pay Requested" would impress anyone who has actually managed a marketplace.

4. **Seasonal demand visibility** — HVAC is heavily seasonal (AC repair in June–August, furnace repair in October–December). A chart that shows job volume by category per month — with HVAC spiking summer and winter, and Moving spiking May–August — demonstrates operational understanding that most generic demos skip entirely.

5. **"Service Area" as a geographic concept, not just a field** — Real platforms manage supply/demand at the ZIP code level. A pro sets their service area as "within 15 miles of 78701." Admin dashboards show "Supply Gap" alerts when a service category has no available pros in a ZIP cluster. Including a service area column in the pros table (e.g., "Austin Metro — 15mi radius") or a "supply coverage" concept in the KPIs would be noticed immediately by anyone who has built or worked in a marketplace.

---

## Common Systems and Tools Used

1. **Housecall Pro** — FSM (field service management) platform used by solo and small-team trades businesses for scheduling, dispatching, invoicing. The closest reference for what a trades pro's day-to-day management looks like.
2. **Jobber** — Main competitor to Housecall Pro. Heavy adoption among plumbers, electricians, landscapers. Known for clean mobile app and Stripe-powered payments.
3. **ServiceTitan** — Enterprise FSM platform for larger HVAC, plumbing, electrical companies. More complex, less mobile-friendly, but the benchmark for operational dashboards in larger shops.
4. **Thumbtack** — Marketplace competitor. Pros pay per lead. "Thumbtack for Pros" app is the reference for how marketplace-side pro management is visualized.
5. **TaskRabbit** — The most-recognized consumer brand for on-demand task booking. Model is "Taskers" set hourly rates; customers book instantly. Good reference for consumer-facing booking flow.
6. **Angi (formerly Angi + HomeAdvisor)** — Largest US home services marketplace by volume. Subscription + lead model for pros. Angi Leads and Angi Ads are separate pro products.
7. **Checkr** — Background check provider used by most US gig platforms including Uber, TaskRabbit, Thumbtack. The "Checkr Verified" badge is recognized by domain insiders.
8. **Stripe Connect** — The dominant payment infrastructure for marketplace payouts in this space. Pros get a Stripe-connected account; platform handles split payments and fee collection.
9. **Twilio** — SMS notification provider for job alerts, booking confirmations, and pro arrival notifications. Every marketplace sends SMS — it's table stakes.
10. **Google Maps / Places API** — Used for service area management, pro routing, and address autocomplete on job requests. All platforms in this space are heavily map-dependent.

---

## Geographic / Cultural Considerations

This is a US-focused marketplace. Key regional considerations:

- **Licensing requirements vary by state** — Electricians require a license in all 50 states, but requirements differ significantly. Plumbing licenses are similarly state-specific. HVAC certification (EPA 608) is federal. Demo should show state-level license numbers (e.g., "TX Electrical License #E14392").
- **Regional pricing variation** — Hourly rates in NYC, San Francisco, and Los Angeles run 20–40% above national average. Demo data should reflect some geographic variance if location data is shown.
- **Seasonal demand is geographically driven** — HVAC demand is most volatile in Sun Belt states (TX, AZ, FL) for summer AC, and in Midwest/Northeast for winter heating. Lawn care is perennial in FL and TX, highly seasonal in northern states.
- **Imperial units** — Miles (not km) for service radius, sq ft for home size in job descriptions.
- **Time zones** — Job scheduling should respect local time. A "same-day" job request submitted in Phoenix at 5 PM is still within business hours; same request in Boston at 5 PM is borderline after-hours.

---

## Data Architect Notes

- **Primary entities**: Pro (service provider), Homeowner (customer), Job (booking), JobRequest (pre-booking), Quote (pro response to request), Review (post-job), Dispute, ProCategory (junction table for pro's service offerings)
- **ID formats**: `PRO-1042`, `JOB-8821`, `REQ-4419`, `QTE-3307`, `REV-9104`, `DSP-0082`
- **Revenue per job should range $85–$1,850** with realistic distribution — 60% of jobs in $85–$350 range (handyman, cleaning, basic plumbing/electrical), 25% in $350–$800 range (HVAC repair, moving), 15% in $800–$1,850 range (major repairs, appliance install, moving)
- **Pro ratings**: Do NOT use round numbers or uniform 5.0 ratings. Realistic distribution: ~15% of pros at 4.9–5.0, ~50% at 4.5–4.8, ~25% at 4.0–4.4, ~10% below 4.0. A marketplace with no sub-4.0 pros looks fake.
- **Status distribution for jobs dataset** (20 records): 8 "Completed", 4 "In Progress", 2 "Confirmed", 2 "Requested", 1 "Disputed", 1 "Cancelled", 1 "No-Show", 1 "Quoted"
- **Status distribution for pros dataset** (20 records): 13 "Active", 3 "Pending Verification", 2 "Suspended", 1 "Background Check Failed", 1 "License Expired"
- **Edge cases to include**: 1 pro with "License Expired" status and a warning note; 1 job with "Disputed" status showing dispute reason and admin resolution pending; 1 emergency same-day job with 2x rate applied; 1 no-show job; at least 2 after-hours bookings with emergency rate multiplier
- **Date patterns**: Jobs span last 60 days. Chart data: 6 months of monthly job volume, showing summer HVAC spike and May–August moving peak
- **Seasonal chart data**: See chart data section below

### Recommended Chart Data Pattern — Jobs by Category (Monthly)

```ts
// Jan through Jun (for a marketplace in the southern US / Sun Belt)
[
  { month: "Sep", jobs: 312, revenue: 87_420 },
  { month: "Oct", jobs: 287, revenue: 79_830 },  // HVAC drops off
  { month: "Nov", jobs: 241, revenue: 68_140 },   // moving drops off, holiday slowdown
  { month: "Dec", jobs: 198, revenue: 54_790 },   // lowest — holiday month
  { month: "Jan", jobs: 267, revenue: 73_210 },   // furnace repairs, New Year home projects
  { month: "Feb", jobs: 304, revenue: 82_640 },   // recovery
]

// Category breakdown (for a stacked bar or grouped bar chart):
// HVAC: peaks Jun–Sep (AC) and Nov–Jan (heat), flat otherwise
// Moving: peaks May–Aug, very low Dec–Feb
// Plumbing: relatively stable year-round, slight winter spike (frozen pipes)
// Landscaping: peaks Apr–Oct, near-zero Nov–Feb (northern markets) or year-round (Sun Belt)
// Cleaning: stable year-round with slight peak in spring (spring cleaning) and Nov (holiday prep)
// Electrical: most stable category, least seasonal
```

---

## Layout Builder Notes

- **Recommended density**: Standard (--content-padding: 1.5rem, --card-padding: 1.5rem). Not compact — this is a marketplace ops dashboard, not a trading terminal. Not spacious — we need to show job queues with enough rows to feel operational.
- **Sidebar width**: Standard 16rem. Nav labels are short enough (Jobs, Pros, Disputes, Payouts) that narrow sidebar works fine.
- **Color direction**: Blue primary (trust, professionalism) + amber/orange accent (action, urgency). oklch values: primary around oklch(0.48 0.19 243), accent around oklch(0.74 0.18 52).
- **Status badge convention**: This industry uses color-coded pill badges on every table. Green for "Completed"/"Active", amber for "In Progress"/"Pending Verification", red for "Disputed"/"Suspended"/"No-Show", blue for "Confirmed"/"Quoted", gray for "Cancelled". This is not optional — practitioners will notice if status is shown as plain text without color coding.
- **Trust signal treatment**: Pro profile cards should prominently show: star rating (large, colored), number of completed jobs, and "Verified" / "Background Check Passed" badges. These are the visual vocabulary of marketplace trust.
- **Radius**: Medium (0.5rem–0.75rem) — consistent with Housecall Pro and Jobber's clean card style. Sharp (0rem) would feel too corporate; Rounded (1rem+) would feel too casual for a trades ops tool.
- **Do NOT use Dark aesthetic** — every major platform in this space (Thumbtack, Angi, Housecall Pro, Jobber) is light-mode by default. A dark-mode trades marketplace dashboard would be visually unfamiliar to anyone in the space.

---

## Dashboard Builder Notes

- **Single most important metric (largest stat card)**: Jobs Completed (current month) — this is the north star number for a marketplace operator. Second is GMV (gross marketplace volume).
- **KPI card row** (5 cards recommended): Jobs Completed / GMV / Active Pros / Avg. Rating / Dispute Rate
- **Primary chart**: Area chart — Jobs Volume by Month (6 months). Area (not line) because the total volume fills the chart and gives a sense of marketplace activity density.
- **Secondary chart**: Stacked bar chart — Jobs by Category per Month. This shows seasonal patterns across trade categories, which is a strong domain signal.
- **Domain-specific panel that would impress a practitioner**: A "Live Job Feed" or "Recent Activity" panel showing the last 8–10 jobs with their current status, pro name, category, and amount — updating in real-time feel. This mimics the "dispatch board" view that every FSM tool features prominently. Practitioners immediately recognize this pattern.
- **Dispute alert widget**: A compact card showing "Open Disputes: [n]" with a "Review" link is expected. Any marketplace operator checks this first thing — seeing it in the dashboard composition signals operational sophistication.
- **Use SaaS Modern aesthetic composition**: The Housecall Pro-style layout — KPI cards at top, main chart + secondary panel in a 2-column middle section, full-width table or activity feed at bottom — is the right pattern for this domain.
