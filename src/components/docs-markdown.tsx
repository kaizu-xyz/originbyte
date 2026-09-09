import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import rust from "highlight.js/lib/languages/rust";
import csharp from "highlight.js/lib/languages/csharp";
import type { LanguageFn } from "highlight.js";
import { Link } from "@tanstack/react-router";

const MOVE_KEYWORDS = [
  "fun",
  "entry",
  "module",
  "public",
  "has",
  "phantom",
  "native",
  "friend",
  "spec",
  "address",
  "vector",
  "key",
  "store",
  "use",
];

const moveLang: LanguageFn = (hljs) => {
  const lang = rust(hljs);
  lang.name = "Move";
  lang.aliases = ["move"];
  const keywords = lang.keywords;
  if (keywords && typeof keywords === "object" && !Array.isArray(keywords) && "keyword" in keywords) {
    const current = keywords.keyword;
    const list = Array.isArray(current) ? current : String(current).split(" ");
    keywords.keyword = [...new Set([...list, ...MOVE_KEYWORDS])];
  }
  return lang;
};

export function DocsMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="docs-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypeHighlight,
            {
              languages: { ...common, move: moveLang, csharp },
            },
          ],
        ]}
        components={{
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;
            if (href === "/docs") {
              return (
                <Link to="/docs" className="text-primary hover:underline">
                  {children}
                </Link>
              );
            }
            if (href.startsWith("/docs/")) {
              const splat = href.slice("/docs/".length);
              return (
                <Link
                  to="/docs/$"
                  params={{ _splat: splat }}
                  className="text-primary hover:underline"
                >
                  {children}
                </Link>
              );
            }
            const external = href.startsWith("http");
            return (
              <a
                href={href}
                className="text-primary hover:underline"
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) =>
            src ? (
              <img
                src={src}
                alt={alt ?? ""}
                className="my-4 w-full max-w-2xl rounded-lg border border-border bg-card"
              />
            ) : null,
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
