import { renderInlineMarkdown, stripMarkdown } from './escape'

export interface ParsedCopy {
 title: string
 paragraphs: string[]
}

export function splitParagraphs(value: unknown): string[] {
 const source = String(value ?? '').trim()
 if (!source) return []
 return source
 .split(/\n\s*\n/g)
 .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
 .filter(Boolean)
}

export function parseCopy(value: unknown): ParsedCopy {
 const source = String(value ?? '').replace(/\r\n?/g, '\n').trim()
 if (!source) return { title: '', paragraphs: [] }
 const firstBold = source.match(/^\s*\*\*([\s\S]*?)\*\*/)
 if (!firstBold) return { title: '', paragraphs: splitParagraphs(source) }
 return {
 title: firstBold[1].trim(),
 paragraphs: splitParagraphs(source.slice(firstBold[0].length).trim()),
 }
}

export function renderCopy(value: string, eyebrow: string): string {
 const parsed = parseCopy(value)
 const eyebrowHtml = stripMarkdown(eyebrow)
 ? `<p class="eyebrow">${renderInlineMarkdown(stripMarkdown(eyebrow), 'copy-strong')}</p>`
 : ''
 const titleHtml = parsed.title
 ? `<h1>${renderInlineMarkdown(parsed.title, 'copy-strong')}</h1>`
 : ''
 const bodyHtml = parsed.paragraphs.length
 ? `<div class="copy-body">${parsed.paragraphs
 .map((paragraph) => `<p>${renderInlineMarkdown(paragraph, 'copy-strong')}</p>`)
 .join('')}</div>`
 : ''
 return [eyebrowHtml, titleHtml, bodyHtml].filter(Boolean).join('\n')
}
