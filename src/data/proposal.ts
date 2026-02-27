import type { Profile, PortfolioProject } from "@/lib/types";

// ─── Profile ─────────────────────────────────────────────────────────────────
// All content sourced from references/developer-profile.md.
// Social proof stats are exact — not inflated.
// Step titles adapted to marketplace/mobile job type (not generic Understand/Build/Ship/Iterate).

export const profile: Profile = {
  name: "Humam",

  // One tailored sentence — leads with what the client wants built.
  // Framed from their perspective, references the Tab 1 demo.
  tagline:
    "I build two-sided marketplace platforms that connect homeowners to verified tradespeople — and I've already built one for your review in Tab 1.",

  bio: "Full-stack developer with marketplace architecture experience across multiple two-sided platforms. I've shipped vendor directories, matching workflows, review systems, and booking management — the same building blocks your trades platform needs.",

  // Steps adapted for a marketplace / mobile job type:
  // Map the Marketplace → Build the Core Experience → Launch & Measure → Scale the Platform
  approach: [
    {
      title: "Map the Marketplace Flow",
      description:
        "Start by mapping both sides of the market — what a homeowner does when they post a job, what a tradesperson does when they claim it. Define the matching logic, quote flow, and booking lifecycle before writing a line of code. Asking the right question first avoids rebuilding later.",
    },
    {
      title: "Build the Core Experience",
      description:
        "React Native for cross-platform iOS + Android. Real-time job status updates, push notifications, and booking lifecycle management. Clean TypeScript throughout — nothing you'd need to apologize for handing to a next developer.",
    },
    {
      title: "Launch and Measure",
      description:
        "Beta on TestFlight and Google Play internal track first. Instrument time-to-match, booking completion rate, and quote acceptance — the three metrics that tell you if the marketplace is actually working. Short feedback cycles, not two-week waits.",
    },
    {
      title: "Scale the Platform",
      description:
        "Stripe Connect for pro payouts and platform fees. Background check and license verification integrations. Geographic expansion tooling so you can open new cities without rebuilding the pro onboarding flow.",
    },
  ],

  // Filtered to skills relevant to THIS job — not a full dump.
  skillCategories: [
    {
      name: "Mobile",
      skills: ["React Native", "Expo", "iOS", "Android", "Push Notifications"],
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Backend & APIs",
      skills: [
        "Node.js",
        "PostgreSQL",
        "Redis",
        "REST APIs",
        "Stripe Connect",
      ],
    },
    {
      name: "Platform",
      skills: [
        "Real-time Updates",
        "Background Checks API",
        "Geolocation",
        "Matching Algorithms",
      ],
    },
  ],
};

// ─── Portfolio Projects ───────────────────────────────────────────────────────
// All 4 projects from developer-profile.md — exact descriptions, exact outcomes.
// URLs only where liveUrl exists in developer-profile.md.
// Relevance field explains the specific connection to this marketplace job.

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "lynt-marketplace",
    title: "Lynt Marketplace",
    description:
      "Digital marketplace platform with product listings, vendor management, and transaction tracking.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    outcome:
      "Full marketplace architecture — vendor onboarding, listing management, and transaction tracking ready for production",
    relevance:
      "Directly relevant: same two-sided marketplace architecture your trades platform needs — vendor (pro) onboarding, listing (job) management, and transaction flow.",
    liveUrl: "https://lynt-marketplace.vercel.app",
  },
  {
    id: "rental-pm-connect",
    title: "Rental PM Connect",
    description:
      "SaaS platform connecting rental property owners with vetted property management companies, with matching algorithms and review systems.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    outcome:
      "Two-sided matching platform with vetting workflows, review tracking, and separate owner/PM dashboards",
    relevance:
      "Core pattern matches: professional vetting, two-sided dashboards (homeowner vs. pro), and review system are all direct parallels to TradeLink's feature set.",
    liveUrl: "https://rental-pm-connect.vercel.app",
  },
  {
    id: "sienna-vendor-admin",
    title: "Sienna Charles — Vendor Admin",
    description:
      "Luxury vendor management platform with vendor directory, map-based discovery, AI-powered search, and booking management with spend analytics.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
    outcome:
      "Vendor discovery and booking platform with map view, category filters, and spend tracking per booking",
    relevance:
      "Map-based pro discovery, category filtering by trade type, and booking management are exactly the admin-side features a trades marketplace operator needs to monitor.",
    liveUrl: "https://sienna-vendor-admin.vercel.app",
  },
  {
    id: "tri-gear-market",
    title: "Tri-Gear Market",
    description:
      "Verified triathlon equipment marketplace with gear listings, seller verification, and category browsing.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    outcome:
      "Niche marketplace with seller verification, gear categorization, and listing management",
    relevance:
      "Seller (pro) verification workflows are a direct parallel to trade license and background check verification on a blue-collar marketplace.",
    liveUrl: "https://tri-gear-market.vercel.app",
  },
];

// ─── Hero Stats ───────────────────────────────────────────────────────────────
// Exact numbers from developer-profile.md — never inflated.
export const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "< 48hr", label: "Demo Turnaround" },
  { value: "15+", label: "Industries Served" },
];
