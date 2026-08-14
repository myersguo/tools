import type { TemplateDefinition } from '../core/types'
import { emptyValues, fieldCatalog, renderCopyBlock, renderCtas, renderTerminal } from './shared'

export const featureTemplate: TemplateDefinition = {
 id:'feature', name:'Feature + Terminal', description:'适合单个 CLI 能力介绍。',
 fields:[fieldCatalog.copy,fieldCatalog.terminal,fieldCatalog.eyebrow,fieldCatalog.primaryCta],
 sample:{...emptyValues,copy:'**Keep the coding loop in your terminal**\nStart in a repository to explore code, plan a change, edit files, and run local tools.',terminal:'**OpenAI Codex**\n\nmodel: **gpt-5.6-sol** medium\ndirectory: **~/code/my-app**',eyebrow:'01',primaryCta:'Learn more'},
 render(values){return{body:`<div class="feature-grid"><div class="copy">${renderCopyBlock(values)}${renderCtas(values.primaryCta)}</div>${renderTerminal(values.terminal)}</div>`}},
}
