import { renderCopy } from '../core/content'
import { escapeHtml, renderInlineMarkdown, stripMarkdown } from '../core/escape'
import type { TemplateField, TemplateValues } from '../core/types'

export const emptyValues: TemplateValues = {
 copy: '', terminal: '', items: '', eyebrow: '', primaryCta: '', secondaryCta: '',
}

type BuiltinFieldId='copy'|'terminal'|'items'|'eyebrow'|'primaryCta'|'secondaryCta'

export const fieldCatalog: Record<BuiltinFieldId, TemplateField> = {
 copy: { id:'copy', label:'文本', kind:'textarea', rows:7, hint:'以 **标题** 开头生成 H1；直接写正文则省略标题。' },
 terminal: { id:'terminal', label:'终端命令 / TUI 内容', kind:'textarea', rows:12, hint:'保留换行；**token** 会高亮。' },
 items: { id:'items', label:'列表项 / 步骤项', kind:'textarea', rows:14, hint:'格式由所选模板定义。' },
 eyebrow: { id:'eyebrow', label:'序号 / Eyebrow', kind:'text', hint:'可留空。' },
 primaryCta: { id:'primaryCta', label:'主按钮文案', kind:'text', hint:'可留空。' },
 secondaryCta: { id:'secondaryCta', label:'次按钮文案', kind:'text', hint:'可留空。' },
}

export function renderCopyBlock(values: TemplateValues): string {
 return renderCopy(values.copy, values.eyebrow)
}

export function renderCtas(primary: string, secondary = ''): string {
 const links = []
 if (stripMarkdown(primary)) links.push(`<a class="cta" href="#terminal-panel">${escapeHtml(stripMarkdown(primary))}</a>`)
 if (stripMarkdown(secondary)) links.push(`<a class="cta cta-secondary" href="#details">${escapeHtml(stripMarkdown(secondary))}</a>`)
 return links.length ? `<div class="cta-row">${links.join('')}</div>` : ''
}

export function renderTerminal(source: string): string {
 const terminalHtml = renderInlineMarkdown(source.replace(/\r\n?/g, '\n').trimEnd(), 'term-strong')
 return `<div class="stage"><section class="terminal" id="terminal-panel" aria-label="Terminal example"><div class="terminal-bar" aria-hidden="true"><span class="dots"><i></i><i></i><i></i></span><span class="terminal-title">terminal session</span></div><pre><code>${terminalHtml}</code></pre></section></div>`
}
