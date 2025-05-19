import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Github } from "lucide-react"
import data from "@/data/data.json"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Articles | Darlan Tane",
  description: "Blog articles by Darlan Tane, Data Analyst",
}

export default function ArticlesPage() {
  const { articles } = data

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 tech-heading">
            <span className="text-primary">#</span> Blog
          </h1>
          <div className="w-20 h-1 bg-primary mb-8"></div>

          <p className="text-muted-foreground mb-12 max-w-3xl">
            Explore my thoughts, insights, and tutorials on data analysis, visualization, and more. These articles
            reflect my experiences and learnings in the field of data science.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="tech-card overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image || "/placeholder.svg?height=200&width=400"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
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
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/articles/${article.id}`}>{article.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground">
                    By <span className="text-foreground">{article.author}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="default" className="tech-button">
                    <Link href={`/articles/${article.id}`}>Read Article</Link>
                  </Button>
                  {article.gitHubLink && (
                    <Button asChild variant="outline" size="icon" className="tech-button">
                      <a
                        href={article.gitHubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

