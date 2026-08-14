import { describe, expect, it } from 'vitest'
import { buildStandaloneHtml, getTemplate } from '../src/templates'

describe('steps template', () => {
it('renders switchable install methods and keeps later steps separate', () => {
 const template = getTemplate('steps')
 const html = buildStandaloneHtml(template, {
 ...template.sample,
 items: `1 | Install Codex | Choose an installation method.
[macOS/Linux]
Install Codex
curl -fsSL https://chatgpt.com/codex/install.sh | sh

Update Codex
curl -fsSL https://chatgpt.com/codex/install.sh | sh
[Windows]
Install Codex
irm https://chatgpt.com/codex/install.ps1 | iex
[npm]
Install Codex
npm install -g @openai/codex
[Homebrew]
Install Codex
brew install codex

2 | Run Codex and sign in | Open a project directory and run codex.`,
 })

 expect(html).toContain('role="tablist"')
 expect(html).toContain('macOS/Linux')
 expect(html).toContain('Windows')
 expect(html).toContain('npm install -g @openai/codex')
 expect(html).toContain('brew install codex')
 expect(html).toContain('function initInstallTabs')
expect(html.match(/class="step-card"/g)).toHaveLength(2)
})

 it('keeps shell pipelines with multiple pipes inside the current method command', () => {
 const template = getTemplate('steps')
 const html = buildStandaloneHtml(template, {
 ...template.sample,
 items: `1 | Diagnose process | Use a shell pipeline.
[macOS/Linux]
Find process
ps aux | grep node | awk '{print $2}'

2 | Stop process | Kill it.`,
 })

 expect(html.match(/class="step-card"/g)).toHaveLength(2)
 expect(html).toContain("ps aux | grep node | awk &#39;{print $2}&#39;")
 expect(html).not.toContain('<span class="step-marker">ps aux</span>')
 })

it('does not add runtime JavaScript to static templates', () => {
 const template = getTemplate('cards')
 const html = buildStandaloneHtml(template, template.sample)

 expect(html).not.toContain('initInstallTabs')
 })
})

it('switches installation panels when the generated runtime runs', () => {
 const template = getTemplate('steps')
 const html = buildStandaloneHtml(template, template.sample)
 document.open()
 document.write(html)
 document.close()

 const windowsTab = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
 .find((tab) => tab.textContent === 'Windows')
 expect(windowsTab).toBeDefined()
 windowsTab!.click()

 expect(windowsTab).toHaveAttribute('aria-selected', 'true')
 expect(document.getElementById(windowsTab!.getAttribute('aria-controls')!)).not.toHaveAttribute('hidden')
 const macTab = document.querySelector<HTMLButtonElement>('[role="tab"]')!
 expect(macTab).toHaveAttribute('aria-selected', 'false')
expect(document.getElementById(macTab.getAttribute('aria-controls')!)).toHaveAttribute('hidden')
})

it('hides inactive installation panels in the rendered layout', () => {
 const template = getTemplate('steps')
 const html = buildStandaloneHtml(template, template.sample)
 document.open()
 document.write(html)
 document.close()

 const panels = Array.from(document.querySelectorAll<HTMLElement>('[role="tabpanel"]'))
 expect(panels).toHaveLength(4)
 expect(getComputedStyle(panels[0]).display).toBe('grid')
for (const panel of panels.slice(1)) {
expect(panel).toHaveAttribute('hidden')
expect(getComputedStyle(panel).display).toBe('none')
}
 expect(html).toContain('.method-panel[hidden]{display:none}')
})
