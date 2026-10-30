export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  /** Two-digit section number, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl mb-12">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {index && <span className="text-accent">{index}</span>}
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-[2.6rem] sm:leading-[1.1] font-semibold tracking-[-0.02em] text-balance">
        {title}
      </h2>
      {description && <p className="mt-4 text-muted leading-relaxed text-pretty">{description}</p>}
    </div>
  );
}
