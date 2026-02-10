import { DocContent, getDocByPath } from "@/components/doc-content"
import { notFound } from "next/navigation"

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const path = slug && slug.length > 0 ? `/docs/${slug.join("/")}` : "/docs"
  const doc = getDocByPath(path)

  if (!doc) {
    notFound()
  }

  return <DocContent doc={doc} />
}
