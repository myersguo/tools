import type { TemplateDefinition } from '../core/types'
import { escapeHtml, renderInlineMarkdown } from '../core/escape'
import { emptyValues, fieldCatalog, renderCopyBlock } from './shared'

interface MethodBlock { label:string; command:string }
interface Method { label:string; blocks:MethodBlock[] }
interface Step { marker:string; title:string; body:string; command:string; methods:Method[] }
type StepDraft=Omit<Step,'methods'> & {extra:string[]}

function parseMethods(lines:string[]):Method[]{
 const methods:{label:string;lines:string[]}[]=[];let current:{label:string;lines:string[]}|null=null
 for(const raw of lines){const match=raw.trim().match(/^\[([^\]]+)\]$/);if(match){if(current)methods.push(current);current={label:match[1].trim(),lines:[]}}else if(current)current.lines.push(raw)}
 if(current)methods.push(current)
 return methods.map((method)=>({label:method.label,blocks:method.lines.join('\n').split(/\n\s*\n/g).map((chunk)=>chunk.split('\n').map((line)=>line.trim()).filter(Boolean)).filter(Boolean).map((block)=>({label:block.length>1?block[0]:'',command:(block.length>1?block.slice(1):block).join('\n')})).filter((block)=>block.label||block.command)})).filter((method)=>method.blocks.length)
}

function parseSteps(value:string):Step[]{
const rows:StepDraft[]=[];let current:StepDraft|null=null
 for(const raw of value.replace(/\r\n?/g,'\n').split('\n')){const line=raw.trim();if(!line){if(current)current.extra.push('');continue}const parts=line.split('|').map((item)=>item.trim());const isStepRow=parts.length>=3&&/^(?:\d+|[A-Za-z][\w.-]{0,7})$/.test(parts[0]);if(isStepRow){if(current)rows.push(current);const [marker='',title='',body='',...command]=parts;current={marker,title,body,command:command.join(' | '),extra:[]}}else{if(!current)current={marker:'',title:'',body:'',command:'',extra:[]};current.extra.push(raw)}}
if(current)rows.push(current)
return rows.map((row)=>({...row,methods:parseMethods(row.extra)}))
}

function renderMethods(methods:Method[],stepIndex:number):string{
 if(!methods.length)return''
 const tabs=methods.map((method,index)=>`<button class="method-tab" type="button" role="tab" aria-selected="${index===0}" aria-controls="step-${stepIndex}-method-${index}" id="step-${stepIndex}-tab-${index}" data-tab-target="step-${stepIndex}-method-${index}">${escapeHtml(method.label)}</button>`).join('')
 const panels=methods.map((method,index)=>`<div class="method-panel" id="step-${stepIndex}-method-${index}" role="tabpanel" aria-labelledby="step-${stepIndex}-tab-${index}"${index?' hidden':''}>${method.blocks.map((block)=>`<div class="method-command-block">${block.label?`<p class="method-command-label">${renderInlineMarkdown(block.label,'copy-strong')}</p>`:''}${block.command?`<div class="step-command"><pre><code>${renderInlineMarkdown(block.command,'term-strong')}</code></pre></div>`:''}</div>`).join('')}</div>`).join('')
 return `<div class="step-methods"><div class="method-tabs" role="tablist" aria-label="安装方式">${tabs}</div>${panels}</div>`
}

const tabsScript=String.raw`function initInstallTabs(){document.querySelectorAll('.step-methods').forEach(function(group){var tabs=Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));var panels=Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));function activate(tab){var target=tab.getAttribute('data-tab-target');tabs.forEach(function(item){item.setAttribute('aria-selected',item===tab?'true':'false')});panels.forEach(function(panel){panel.hidden=panel.id!==target});tab.focus()}tabs.forEach(function(tab,index){tab.addEventListener('click',function(){activate(tab)});tab.addEventListener('keydown',function(event){var next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();activate(tabs[next])})})})}initInstallTabs();`

export const stepsTemplate:TemplateDefinition={
 id:'steps',name:'Quickstart Steps',description:'适合安装和上手流程，支持步骤内多安装方式切换。',
 fields:[fieldCatalog.copy,{...fieldCatalog.items,hint:'步骤：1 | 标题 |说明 | 命令；安装方式使用 [macOS/Linux] 等分段。'}],
 sample:{...emptyValues,copy:'**Get started with Codex CLI**\nInstall Codex, sign in, and run your first task.',items:'1 | Install Codex | Choose an installation method.\n[macOS/Linux]\nInstall Codex\ncurl -fsSL https://chatgpt.com/codex/install.sh | sh\n[Windows]\nInstall Codex\nirm https://chatgpt.com/codex/install.ps1 | iex\n[npm]\nInstall Codex\nnpm install -g @openai/codex\n[Homebrew]\nInstall Codex\nbrew install codex\n\n2 | Run Codex and sign in | Open a project directory and run codex.\n3 | Start your first task | Describe what you want to accomplish.'},
 render(values){const steps=parseSteps(values.items);return{body:`<header class="section-head" id="details">${renderCopyBlock(values)}</header><ol class="steps">${steps.map((step,index)=>`<li class="step-card"><span class="step-marker">${escapeHtml(step.marker)}</span><div class="step-main">${step.title?`<h2>${renderInlineMarkdown(step.title,'copy-strong')}</h2>`:''}${step.body?`<p>${renderInlineMarkdown(step.body,'copy-strong')}</p>`:''}${renderMethods(step.methods,index+1)}${step.command?`<div class="step-command"><pre><code>${renderInlineMarkdown(step.command,'term-strong')}</code></pre></div>`:''}</div></li>`).join('')}</ol>`,script:steps.some((step)=>step.methods.length)?tabsScript:''}},
}
