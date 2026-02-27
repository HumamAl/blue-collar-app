// No "use client" — pure JSX, no hooks.

interface ExecutiveSummaryProps {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export function ExecutiveSummary({
  commonApproach,
  differentApproach,
  accentWord,
}: ExecutiveSummaryProps) {
  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl p-6 md:p-8"
      style={{
        background: "oklch(0.10 0.025 243)",
        backgroundImage:
          "radial-gradient(ellipse at 25% 50%, oklch(0.48 0.19 243 / 0.12), transparent 65%)",
      }}
    >
      {/* Common wrong approach */}
      <p className="text-sm md:text-base leading-relaxed text-white/50">
        {commonApproach}
      </p>

      <hr className="my-4 border-white/10" />

      {/* The different approach */}
      <p className="text-base md:text-lg leading-relaxed font-medium text-white/90">
        {renderDifferentApproach()}
      </p>

      {/* Back link */}
      <p className="text-xs text-white/35 mt-4">
        {"← "}
        <a
          href="/"
          className="hover:text-white/60 transition-colors duration-150 underline underline-offset-2"
        >
          Back to the live demo
        </a>
      </p>
    </div>
  );
}
