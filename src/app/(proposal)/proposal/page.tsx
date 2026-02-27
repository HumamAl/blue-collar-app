// Tab 3: Work With Me — Sales page for TradeLink trades marketplace proposal.
// Aesthetic: saas-modern — light background, gradient hero, subtle card shadows, rounded corners.
// Section order: Hero → Proof of Work → How I Work → Skills → CTA

import { ExternalLink, TrendingUp, CheckCircle2 } from "lucide-react";
import { profile, portfolioProjects, heroStats } from "@/data/proposal";

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-14">

      {/* ────────────────────────────────────────────────────────────────────────
          Section 1: Hero (Project Brief — gradient editorial, SaaS Modern)
          Light background with primary/accent gradient sweep. Large typography.
          "Built this demo for your project" badge is mandatory.
          ──────────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-xl border border-border/40 px-8 py-12 md:px-12 md:py-16"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--primary) 7%, var(--background)), var(--background) 50%, color-mix(in oklch, var(--accent) 6%, var(--background)))",
        }}
      >
        {/* Subtle decorative blur — does not interfere with text */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)",
          }}
        />

        {/* Effort badge — mandatory in all aesthetics */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 mb-6">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="font-mono text-xs text-primary/80">
            Built this demo for your project
          </span>
        </div>

        {/* Role prefix */}
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
          Full-Stack Developer · Marketplace Specialist
        </p>

        {/* Name — weight contrast */}
        <h1 className="text-5xl md:text-6xl tracking-tight leading-none mb-4">
          <span className="font-light text-foreground/70">Hi, I&apos;m</span>{" "}
          <span className="font-black text-foreground">{profile.name}</span>
        </h1>

        {/* Tailored value prop */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          {profile.tagline}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 pt-4 border-t border-border/40">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          Section 2: Proof of Work — 4 portfolio projects
          2-column card grid on md+. Each card: outcome badge + tech + relevance.
          ExternalLink icon only present when liveUrl is set.
          ──────────────────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Proof of Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Relevant Projects
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Four marketplace and two-sided platform projects — directly adjacent
            to what you&apos;re building.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="aesthetic-card p-5 space-y-3"
            >
              {/* Project header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug">
                  {project.title}
                </h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    style={{ transitionDuration: "var(--dur-fast)" }}
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome badge — always present */}
              {project.outcome && (
                <div className="flex items-start gap-2 text-sm">
                  <TrendingUp
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--success)" }}>
                    {project.outcome}
                  </span>
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Relevance note — explains the specific connection to this job */}
              {project.relevance && (
                <p className="text-xs text-primary/70 italic leading-relaxed">
                  {project.relevance}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          Section 3: How I Work — 4 steps
          Steps customized for marketplace + mobile job type:
          Map the Marketplace → Build the Core → Launch & Measure → Scale
          2-column card grid, monospace step labels, timeline estimates.
          ──────────────────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.approach.map((step, index) => {
            const stepNum = String(index + 1).padStart(2, "0");
            const timelines = [
              "Days 1–2",
              "Weeks 1–4",
              "Week 5–6",
              "Ongoing",
            ];
            return (
              <div key={step.title} className="aesthetic-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    Step {stepNum}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {timelines[index]}
                  </span>
                </div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          Section 4: Skills Grid
          Filtered to THIS job's relevant tech only.
          SaaS Modern: rounded pill tags, grouped by category.
          ──────────────────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            What I Build With
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {profile.skillCategories.map((category) => (
            <div key={category.name} className="aesthetic-card p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md border border-border/60 text-sm font-mono text-foreground/80 bg-muted/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          Section 5: CTA — dark panel close
          Mandatory elements: pulsing availability dot (var(--success)),
          "Reply on Upwork to start" as text (not a dead link),
          back-link to demo, signed "— Humam".
          ──────────────────────────────────────────────────────────────────── */}
      <section
        className="relative rounded-xl overflow-hidden text-center"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 243))" }}
      >
        {/* Subtle top highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, oklch(0.48 0.19 243 / 0.10), transparent 60%)",
          }}
        />

        <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 space-y-5">

          {/* Pulsing availability indicator — mandatory */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: "var(--success)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{
                color: "color-mix(in oklch, var(--success) 80%, white)",
              }}
            >
              Currently available for new projects
            </span>
          </div>

          {/* Tailored headline — specific to this job */}
          <h2 className="text-2xl font-bold text-white leading-tight">
            Ready to turn your trades marketplace idea into a working app.
          </h2>

          {/* Body — references the Tab 1 demo specifically */}
          <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
            The demo in Tab 1 shows the pro verification, job matching, and
            booking flow already built out. The real product starts from there
            — not from a blank screen.
          </p>

          {/* What working together looks like */}
          <div className="flex flex-col items-center gap-2 pt-2">
            {[
              "Full-stack Next.js + React Native from one developer",
              "Stripe Connect for pro payouts built in from day one",
              "Weekly working builds — no dark periods",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: "var(--success)" }}
                />
                <span className="text-sm text-white/70">{point}</span>
              </div>
            ))}
          </div>

          {/* Primary action — text, not a dead-end button */}
          <p className="text-lg font-semibold text-white pt-3">
            Reply on Upwork to start
          </p>

          {/* Binary CTA copy */}
          <p className="text-sm text-white/60">
            10-minute call or I can send a 2-slide plan — your pick.
            <br />
            I can also record a quick Loom walkthrough if that&apos;s easier.
          </p>

          {/* Back-link to demo */}
          <div className="pt-2">
            <a
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/70 transition-colors"
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              ← Back to the demo
            </a>
          </div>

          {/* Signature */}
          <div className="border-t border-white/10 pt-5 mt-5">
            <p className="text-sm text-white/40">— Humam</p>
          </div>
        </div>
      </section>

    </div>
  );
}
