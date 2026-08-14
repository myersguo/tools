export function escapeHtml(value: unknown): string {
 return String(value ?? '')
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;')
 .replace(/'/g, '&#39;')
}

export function stripMarkdown(value: unknown): string {
 return String(value ?? '').replace(/\*\*/g, '').trim()
}

export function renderInlineMarkdown(value: unknown, className: string): string {
 return String(value ?? '')
 .split('**')
 .map((part, index) => {
 const escaped = escapeHtml(part)
 return index %2 ===1 ? `<strong class="${className}">${escaped}</strong>` : escaped
 })
 .join('')
}
