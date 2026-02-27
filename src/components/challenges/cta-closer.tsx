"use client";

import Link from "next/link";

export function CtaCloser() {
  return (
    <section
      className="aesthetic-card p-6"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--primary) 5%, var(--card)), var(--card))",
        borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: copy */}
        <div>
          <h3 className="text-base font-semibold mb-1">
            Ready to discuss the approach?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            These aren&apos;t hypotheticals — they&apos;re the exact problems I&apos;d
            tackle in week one. Happy to walk through any of them on a call.
          </p>
        </div>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            See my proposal →
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--primary) 12%, transparent), color-mix(in oklch, var(--primary) 6%, transparent))",
              border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
