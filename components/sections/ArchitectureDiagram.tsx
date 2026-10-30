import { ArchitectureStage } from "@/content/types";

export function ArchitectureDiagram({ stages }: { stages: ArchitectureStage[] }) {
  return (
    <ol>
      {stages.map((stage, i) => (
        <li key={stage.title} className="relative grid grid-cols-[2.25rem_1fr] gap-x-3 pb-5 last:pb-0">
          {i < stages.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[1.06rem] top-9 bottom-0 border-l border-dashed border-border-strong"
            />
          )}
          <span
            aria-hidden
            className="flex size-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-[11px] font-semibold text-accent"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-1.5">
            <p className="text-sm font-semibold text-foreground">{stage.title.replace(/^\d+\.\s*/, "")}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{stage.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
