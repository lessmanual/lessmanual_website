import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { marked } from 'marked'

/**
 * Privacy Policy Page (Polityka Prywatności)
 *
 * Displays the full privacy policy from markdown file.
 *
 * Features:
 * - Server-side markdown to HTML conversion
 * - SEO optimized with metadata
 * - RODO compliant content
 *
 * File location: src/content/legal/pl/polityka-prywatnosci.md
 */

export const metadata: Metadata = {
  title: 'Polityka Prywatności | LessManual',
  description:
    'Polityka prywatności LessManual. Dowiedz się, jak chronimy Twoje dane osobowe zgodnie z RODO.',
  robots: 'index, follow',
}

async function getPrivacyPolicyContent(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'src/content/legal/pl/polityka-prywatnosci.md'
  )
  const content = await fs.readFile(filePath, 'utf8')
  const html = await marked(content)
  return html
}

export default async function PrivacyPolicyPage(): Promise<React.ReactElement> {
  const htmlContent = await getPrivacyPolicyContent()

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
