import Link from "next/link";
import data from "@/data/data.json";

export default function ArticlesPreview() {
  const { articles } = data;

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="max-w-4xl mx-auto pb-32">
      <div className="space-y-4">
        {sortedArticles.map((article) => (
          <div
            key={article.id}
            className="flex items-center gap-6 text-sm"
          >
            {/* Date */}
            <span className="w-32 text-muted-foreground shrink-0">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>

            {/* Title */}
            <Link
              href={`/articles/${article.id}`}
              className="text-primary hover:underline"
            >
              {article.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}