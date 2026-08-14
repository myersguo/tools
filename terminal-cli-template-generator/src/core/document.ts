import type { TemplateDefinition, TemplateValues } from './types'
import { escapeHtml, stripMarkdown } from './escape'
import { parseCopy } from './content'
import { sharedGeneratedCss } from './generated-css'

export function buildStandaloneHtml(
 template: TemplateDefinition,
 values: TemplateValues,
): string {
 const rendered = template.render(values)
 const parsedCopy = parseCopy(values.copy)
 const plainTitle = stripMarkdown(rendered.title || parsedCopy.title) || 'Terminal / CLI introduction'
 const css = [sharedGeneratedCss, rendered.css].filter(Boolean).join('\n')

 return [
 '<!doctype html>',
 '<html lang="zh-CN">',
 '<head>',
 ' <meta charset="utf-8">',
 ' <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
 ` <meta name="description" content="${escapeHtml(plainTitle)} - terminal-first CLI introduction.">`,
 ' <meta name="theme-color" content="#f4f8fd">',
 ` <title>${escapeHtml(plainTitle)}</title>`,
 ' <link rel="icon" href="data:,">',
 ' <style>',
 css,
 ' </style>',
 '</head>',
 '<body>',
 ` <main class="page template-${template.id}">`,
 ' <section class="shell" aria-label="CLI introduction">',
 rendered.body,
 ' </section>',
 ' </main>',
 rendered.script ? ` <script>${rendered.script}<\/script>` : '',
 '</body>',
 '</html>',
 ]
 .filter(Boolean)
 .join('\n')
}
