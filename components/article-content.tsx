"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./codeblock";

interface ArticleContentProps {
  mdLink: string;
}

export default function ArticleContent({ mdLink }: ArticleContentProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        setIsLoading(true);
        const response = await fetch(`/${mdLink}`);

        if (!response.ok) {
          throw new Error(`Failed to load article: ${response.status}`);
        }

        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("Failed to load article content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarkdown();
  }, [mdLink]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        code: CodeBlock 
      }}
        >
        {content}
      </ReactMarkdown>
    </div>
  );
}