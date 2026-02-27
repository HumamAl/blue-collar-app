export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most marketplace apps bolt a search bar on top of a directory and call it matching — leaving homeowners to scroll through dozens of pro profiles and figure out availability themselves. Trust is handled with a simple star rating copied from Yelp, and job status is a single status badge neither party trusts.",
  differentApproach:
    "I build the matching engine, trust layer, and job lifecycle as first-class systems — so every booking starts with the right pro, every homeowner feels safe opening their door, and both sides always know exactly where the job stands.",
  accentWord: "matching engine, trust layer, and job lifecycle",
};

export const challenges: Challenge[] = [
  {
    id: "matching-flow",
    title: "Two-Sided Matching: Getting the Right Pro to the Right Job",
    description:
      "A homeowner posting a plumbing emergency in Austin shouldn't see electricians in Dallas. The platform has to resolve trade category, service radius, real-time availability, and response-time history — all before surfacing a single pro. Most apps skip this and show everyone, creating noise that drives homeowners away.",
    outcome:
      "Could reduce average time-to-match from manual browsing (typically 12-18 minutes) to under 60 seconds by resolving category, radius, and availability filters server-side before the list ever renders.",
  },
  {
    id: "trust-layer",
    title: "Trust & Verification: What a Pro's Card Has to Show",
    description:
      "Homeowners are letting a stranger into their home. A name, a photo, and 4.3 stars from 7 reviews isn't enough. The gap between an unverified pro listing and a fully surfaced trust profile — license status, background check badge, completion rate, verified review count, and avg response time — is the difference between a bounce and a booking.",
    outcome:
      "Could increase booking conversion by surfacing license status, Checkr background check badge, review count, and completion rate on every pro card — industry data suggests verified profiles convert 2-3x better than unverified ones.",
  },
  {
    id: "job-lifecycle",
    title: "Job Lifecycle State Machine: Both Parties Always Know Where Things Stand",
    description:
      "A job passes through at least 6 states: Requested → Quoted → Confirmed → In Progress → Completed, with branches for Cancelled, Disputed, and No-Show. Both the homeowner and the pro need to see the same truth at every step. Most apps show a single status badge — which means one call to customer support for every question that could have been answered by the UI.",
    outcome:
      "Could eliminate the most common homeowner support tickets ('Where is my pro?' and 'Did they get my message?') by surfacing a shared, real-time job timeline visible to both parties — reducing estimated support volume by 40-60% for status-related inquiries.",
  },
];
