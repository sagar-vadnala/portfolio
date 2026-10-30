import { SectionHeading } from "@/components/ui/SectionHeading";

export type ArticleItemData = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

export function ArticlesSection({ index, items }: { index?: string; items: ArticleItemData[] }) {
  if (items.length === 0) return null;

  return (
    <section id="articles" className="container-page py-16 sm:py-24 scroll-mt-4">
      <SectionHeading index={index} eyebrow="Writing" title="Engineering notes" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((article) => (
          <article key={article.slug} className="rounded-2xl card-surface p-6">
            <p className="mb-2 font-mono text-xs text-muted-soft">{article.publishedAt}</p>
            <h3 className="text-base font-semibold leading-snug">{article.title}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
