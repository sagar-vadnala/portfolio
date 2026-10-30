import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/ui/TechIcon";

export type SkillGroupData = { category: string; items: string[] };

export function Skills({ index, groups }: { index?: string; groups: SkillGroupData[] }) {
  if (groups.length === 0) return null;

  return (
    <section id="skills" className="container-page py-16 sm:py-24 scroll-mt-4">
      <SectionHeading
        index={index}
        eyebrow="Stack"
        title="Tools I reach for"
        description="The stack behind the work above — strongest in TypeScript, React/Next.js, and Flutter."
      />

      <div className="border-t border-border">
        {groups.map((group) => (
          <div
            key={group.category}
            className="grid gap-4 border-b border-border py-6 md:grid-cols-[13rem_1fr] md:gap-10"
          >
            <h3 className="pt-1.5 font-mono text-xs font-normal uppercase tracking-[0.16em] text-muted">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-elevated/60 px-3 py-1.5 text-sm text-foreground/85 transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  <TechIcon name={item} className="size-4 shrink-0 text-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
