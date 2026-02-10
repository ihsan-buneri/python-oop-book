import Link from "next/link"
import { docsContent, extractHeadings, type DocContent } from "@/lib/docs"
import { OnThisPageDropdown, OnThisPageSidebar } from "./on-this-page"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <pre className="bg-muted rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono">
      <code>{code}</code>
    </pre>
  )
}

function renderInlineText(text: string) {
  const result: React.ReactNode[] = []
  let remaining = text
  let key = 0
  const regex = /(`[^`]+`)|(\[([^\]]+)\]\(([^)]+)\))/g
  let match
  let lastIndex = 0
  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      result.push(remaining.slice(lastIndex, match.index))
    }
    if (match[1]) {
      result.push(
        <code
          key={key++}
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {match[1].slice(1, -1)}
        </code>
      )
    } else if (match[3] && match[4]) {
      result.push(
        <Link key={key++} href={match[4]} className="text-primary hover:underline">
          {match[3]}
        </Link>
      )
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < remaining.length) {
    result.push(remaining.slice(lastIndex))
  }
  return result.length > 0 ? result : text
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let inCodeBlock = false
  let codeBlockContent = ""
  let codeBlockLang = ""

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ")
      elements.push(
        <p key={elements.length} className="mb-4 leading-7">
          {renderInlineText(text)}
        </p>
      )
      currentParagraph = []
    }
  }

  const flushCodeBlock = () => {
    if (codeBlockContent) {
      elements.push(
        <CodeBlock
          key={elements.length}
          language={codeBlockLang || "text"}
          code={codeBlockContent.trim()}
        />
      )
      codeBlockContent = ""
      codeBlockLang = ""
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock()
        inCodeBlock = false
      } else {
        flushParagraph()
        codeBlockLang = line.slice(3).trim() || "text"
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent += line + "\n"
      continue
    }

    if (line.startsWith("## ")) {
      flushParagraph()
      const title = line.slice(3).trim()
      const id = slugify(title)
      elements.push(
        <h2
          key={elements.length}
          id={id}
          className="scroll-m-20 border-b pb-2 mt-10 mb-4 text-2xl font-semibold tracking-tight first:mt-0"
        >
          {title}
        </h2>
      )
      continue
    }

    if (line.startsWith("### ")) {
      flushParagraph()
      const title = line.slice(4).trim()
      const id = slugify(title)
      elements.push(
        <h3
          key={elements.length}
          id={id}
          className="scroll-m-20 mt-8 mb-4 text-xl font-semibold tracking-tight"
        >
          {title}
        </h3>
      )
      continue
    }

    if (line.startsWith("- ")) {
      flushParagraph()
      const listItems: string[] = [line.slice(2)]
      while (i + 1 < lines.length && lines[i + 1].startsWith("- ")) {
        i++
        listItems.push(lines[i].slice(2))
      }
      elements.push(
        <ul key={elements.length} className="my-4 ml-6 list-disc [&>li]:mt-2">
          {listItems.map((item, j) => (
            <li key={j}>{renderInlineText(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    if (line.trim() === "") {
      flushParagraph()
      continue
    }

    currentParagraph.push(line)
  }

  flushParagraph()
  flushCodeBlock()

  return <div className="doc-content">{elements}</div>
}

export function DocContent({ doc }: { doc: DocContent }) {
  const headings = extractHeadings(doc.content)

  return (
    <div className="w-full max-w-7xl">
      <OnThisPageDropdown headings={headings} />
      <div className="flex gap-8">
        <article className="prose prose-neutral dark:prose-invert max-w-none flex-1 min-w-0">
          <header className="mb-8">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              {doc.title}
            </h1>
            {doc.lastUpdated && (
              <p className="mt-2 text-sm text-muted-foreground">
                Last updated {doc.lastUpdated}
              </p>
            )}
            {doc.description && (
              <p className="mt-2 text-lg text-muted-foreground">{doc.description}</p>
            )}
          </header>
          <MarkdownContent content={doc.content} />
          {(doc.prevLink || doc.nextLink) && (
            <nav className="flex justify-between mt-12 pt-8 border-t gap-4">
              <div className="flex-1">
                {doc.prevLink && (
                  <Link
                    href={doc.prevLink.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← {doc.prevLink.title}
                  </Link>
                )}
              </div>
              <div className="flex-1 text-right">
                {doc.nextLink && (
                  <Link
                    href={doc.nextLink.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {doc.nextLink.title} →
                  </Link>
                )}
              </div>
            </nav>
          )}
        </article>
        <OnThisPageSidebar headings={headings} />
      </div>
    </div>
  )
}

export function getDocByPath(path: string): DocContent | null {
  const normalizedPath =
    path === "" ? "/docs" : path.startsWith("/") ? path : `/${path}`
  return docsContent[normalizedPath] ?? null
}
