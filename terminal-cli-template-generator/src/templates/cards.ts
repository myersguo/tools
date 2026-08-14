import type { TemplateDefinition } from '../core/types'
import { escapeHtml, renderInlineMarkdown } from '../core/escape'
import { emptyValues, fieldCatalog, renderCopyBlock } from './shared'

export const cardsTemplate: TemplateDefinition = {
 id:'cards', name:'Numbered Cards', description:'适合命令、能力或工作流卡片网格。',
 fields:[fieldCatalog.copy,{...fieldCatalog.items,hint:'每行：01 | 命令 | 标题 |说明'}],
 sample:{...emptyValues,copy:'**Build a terminal workflow**\nCombine CLI capabilities into a focused workflow.',items:'01 | codex resume | Return to a saved chat | Reopen a recent chat from the current repository.\n02 | codex --image | Bring visual context | Pass a screenshot or design reference.\n03 | subagents | Split up an investigation | Delegate focused work to specialized agents.'},
 render(values){
 const cards=values.items.replace(/\r\n?/g,'\n').split('\n').map((line)=>line.trim()).filter(Boolean).map((line)=>{
 const [marker='',command='',title='',...body]=line.split('|').map((item)=>item.trim())
 return `<article class="number-card"><div class="card-top">${marker?`<span class="card-marker">${escapeHtml(marker)}</span>`:''}${command?`<span class="card-command">${escapeHtml(command)}</span>`:''}</div>${title?`<h2>${renderInlineMarkdown(title,'copy-strong')}</h2>`:''}${body.length?`<p>${renderInlineMarkdown(body.join(' | '),'copy-strong')}</p>`:''}</article>`
 }).join('')
 return{body:`<header class="section-head" id="details">${renderCopyBlock(values)}</header><div class="card-grid">${cards}</div>`}
 },
}
