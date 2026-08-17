import { describe, expect, it } from 'vitest'
import { buildStandaloneHtml, getTemplate, templateRegistry } from '../src/templates'

describe('template registry', () => {
 it('registers each template behind the same extension contract', () => {
 expect(templateRegistry.map((template) => template.id)).toEqual([
 'feature',
 'hero',
 'steps',
 'cards',
 ])

 for (const template of templateRegistry) {
 expect(template.fields.length).toBeGreaterThan(0)
 expect(template.sample).toBeTypeOf('object')
 expect(template.render).toBeTypeOf('function')
 }
 })

 it('builds an offline standalone document without external assets', () => {
 const template = getTemplate('hero')
 const html = buildStandaloneHtml(template, template.sample)

 expect(html).toContain('<!doctype html>')
 expect(html).toContain('class="page template-hero"')
 expect(html).toContain('<style>')
 expect(html).not.toMatch(/<link[^>]+stylesheet|https?:\/\/[^\s"']+\.(css|js)/)
 })

 it('escapes all user-provided HTML while preserving controlled bold markup', () => {
 const template = getTemplate('hero')
 const html = buildStandaloneHtml(template, {
 ...template.sample,
 copy: '**<img src=x onerror=alert(1)>**\n<script>alert(1)</script>',
 terminal: '<b>unsafe</b>',
 eyebrow: '<tag>',
 })

 expect(html).not.toContain('<script>alert(1)</script>')
 expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
 expect(html).toContain('&lt;b&gt;unsafe&lt;/b&gt;')
 expect(html).toContain('&lt;tag&gt;')
 })

 it('omits optional title, eyebrow and CTAs when values are blank', () => {
 const template = getTemplate('feature')
 const html = buildStandaloneHtml(template, {
 ...template.sample,
 copy: 'Body without a title',
 eyebrow: '',
 primaryCta: '',
 })

 expect(html).not.toContain('<h1>')
 expect(html).not.toContain('class="eyebrow"')
 expect(html).not.toContain('class="cta"')
 expect(html).toContain('Body without a title')
 })
})

describe('generated CSS quality', () => {
 it('does not contain compressed multi-value tokens that browsers reject', () => {
 const html = buildStandaloneHtml(getTemplate('steps'), getTemplate('steps').sample)
 const invalidTokens = [
 'at12%', 'transparent28rem', '#f8fbff0%', 'padding:018px',
 'padding:7px12px', 'box-shadow:018px', 'auto1fr', 'inset0001px',
 'flex:00 auto', 'font:70014px', 'box-shadow:0001px',
 ]
 for (const token of invalidTokens) expect(html).not.toContain(token)
 })

 it('keeps the feature template in two columns on narrow screens', () => {
 const html = buildStandaloneHtml(getTemplate('feature'), getTemplate('feature').sample)

 expect(html).toContain('@media(max-width:820px){.hero-grid{grid-template-columns:1fr}')
 expect(html).not.toContain('.hero-grid,.feature-grid{grid-template-columns:1fr}')
 })

 it('wraps terminal content instead of requiring horizontal scrolling', () => {
 const html = buildStandaloneHtml(getTemplate('feature'), getTemplate('feature').sample)

 expect(html).toContain('.terminal pre{max-width:100%;min-width:0;overflow-x:hidden;white-space:pre-wrap;overflow-wrap:anywhere')
 expect(html).toContain('.terminal code{display:block;min-width:0}')
 })
})

describe('custom template extension', () => {
 it('accepts template-specific fields without changing the document engine', async () => {
 const { defineTemplate } = await import('../src/templates')
 const custom = defineTemplate({
 id: 'custom-banner',
 name: 'Custom Banner',
 description: 'A project-specific template.',
 fields: [{ id: 'badge', label: 'Badge', kind: 'text', hint: 'Custom field.' }],
 sample: { badge: 'Experimental' },
 render(values) {
 return { body: `<p>${values.badge}</p>` }
 },
 })
 const html = buildStandaloneHtml(custom, custom.sample)
 expect(html).toContain('Experimental')
 expect(html).toContain('template-custom-banner')
 })
})
