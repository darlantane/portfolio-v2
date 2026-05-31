"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

export default function CodeBlock({ children, className, inline }: any) {
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");

  if (inline) {
    return <code className={className}>{children}</code>;
  }

  
  const match = /language-(\w+)/.exec(className || '');
  let language = match ? match[1] : 'text';
  language = language.toLowerCase();
  
  const code = String(children).replace(/\n$/, '');

  useEffect(() => {
    async function highlight() {
      if (!code) return;
      
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'nord',
        });
        setHighlightedHtml(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
      }
    }
    
    highlight();
  }, [code, language]);

  if (!highlightedHtml) {
    return <pre><code className={className}>{code}</code></pre>;
  }

  return <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}