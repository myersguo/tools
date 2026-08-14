import type { TemplateDefinition } from '../core/types'
import { emptyValues, fieldCatalog, renderCopyBlock, renderCtas, renderTerminal } from './shared'

export const heroTemplate: TemplateDefinition = {
 id:'hero', name:'Hero + Terminal', description:'适合 CLI 产品介绍首屏，支持双按钮与终端 mock。',
 fields:[fieldCatalog.copy,fieldCatalog.terminal,fieldCatalog.eyebrow,fieldCatalog.primaryCta,fieldCatalog.secondaryCta],
 sample:{...emptyValues,copy:'**Inspect, edit, and run code from your terminal**\nInspect code, make changes, run commands, and automate repeatable work without leaving your terminal.',terminal:'**OpenAI Codex**\n\nmodel: **gpt-5.6-sol** medium\ndirectory: **~/code/my-app**',eyebrow:'Codex CLI',primaryCta:'Install Codex',secondaryCta:'CLI reference'},
 render(values){return{body:`<div class="hero-grid"><div class="copy">${renderCopyBlock(values)}${renderCtas(values.primaryCta,values.secondaryCta)}</div>${renderTerminal(values.terminal)}</div>`}},
}
