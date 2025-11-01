import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { marked } from 'marked'

/**
 * Cookie Policy Page (Polityka Cookies)
 *
 * Displays the cookie policy from markdown file.
 *
 * Features:
 * - Server-side markdown to HTML conversion
 * - SEO optimized with metadata
 * - RODO compliant content
 *
 * File location: src/content/legal/pl/polityka-cookies.md
 */

export const metadata: Metadata = {
  title: 'Polityka Cookies | LessManual',
  description:
    'Polityka cookies LessManual. Dowiedz się, jak wykorzystujemy pliki cookies na naszej stronie.',
  robots: 'index, follow',
}

async function getCookiePolicyContent(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'src/content/legal/pl/polityka-cookies.md'
  )
  const content = await fs.readFile(filePath, 'utf8')
  const html = await marked(content)
  return html
}

export default async function CookiePolicyPage(): Promise<React.ReactElement> {
  const htmlContent = await getCookiePolicyContent()

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
