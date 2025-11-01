import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { marked } from 'marked'

/**
 * Terms of Service Page (Regulamin)
 *
 * Displays the terms of service from markdown file.
 *
 * Features:
 * - Server-side markdown to HTML conversion
 * - SEO optimized with metadata
 * - Polish legal requirements compliant
 *
 * File location: src/content/legal/pl/regulamin.md
 */

export const metadata: Metadata = {
  title: 'Regulamin | LessManual',
  description:
    'Regulamin świadczenia usług LessManual. Zapoznaj się z warunkami korzystania z naszych usług AI.',
  robots: 'index, follow',
}

async function getTermsContent(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'src/content/legal/pl/regulamin.md'
  )
  const content = await fs.readFile(filePath, 'utf8')
  const html = await marked(content)
  return html
}

export default async function TermsOfServicePage(): Promise<React.ReactElement> {
  const htmlContent = await getTermsContent()

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
