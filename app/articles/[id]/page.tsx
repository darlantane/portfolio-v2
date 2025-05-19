import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ArticleContent from "@/components/article-content";
import data from "@/data/data.json";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { articles } = data;
  const { id } = await params;
  const article = articles.find((article) => article.id.toString() === id);

  if (!article) {
    return {
      title: "Article Not Found | Darlan Tane",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | Darlan Tane`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articles } = data;
  const { id } = await params;
  const article = articles.find((article) => article.id.toString() === id);

  if (!article) {
    notFound();
  }

  // Get related articles (excluding current article)
  const relatedArticles = articles.filter((a) =>
    article.relatedArticleIds.includes(a.id)
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/articles"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>

          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg?height=400&width=800"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                <span>{article.readingTime} read</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {article.gitHubLink && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="tech-button"
                >
                  <a
                    href={article.gitHubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">View on GitHub</span>
                  </a>
                </Button>
              )}
              {/* <Button variant="outline" size="icon" className="tech-button">
                <Share2 className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          <div className="text-sm text-muted-foreground mb-8">
            By <span className="text-foreground">{article.author}</span>
          </div>

          <ArticleContent mdLink={article.mdLink} />

          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="tech-card overflow-hidden"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={
                          relatedArticle.image ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 hover:text-primary transition-colors">
                        <Link href={`/articles/${relatedArticle.id}`}>
                          {relatedArticle.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {relatedArticle.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="tech-button w-full"
                      >
                        <Link href={`/articles/${relatedArticle.id}`}>
                          Read Article
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
