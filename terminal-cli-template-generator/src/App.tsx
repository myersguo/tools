import { useMemo, useState } from 'react'
import { PreviewPanel } from './components/PreviewPanel'
import { SourcePanel } from './components/SourcePanel'
import { TemplateFields } from './components/TemplateFields'
import { buildStandaloneHtml, getTemplate, templateRegistry, type TemplateId, type TemplateValues } from './templates'
import './styles/app.css'

function cloneValues(values:TemplateValues):TemplateValues{return{...values}}

export function App(){
 const [templateId,setTemplateId]=useState<TemplateId>('feature')
 const template=getTemplate(templateId)
 const [values,setValues]=useState<TemplateValues>(()=>cloneValues(template.sample))
 const [status,setStatus]=useState('预览与源码会随输入实时更新。')
 const html=useMemo(()=>buildStandaloneHtml(template,values),[template,values])

 function selectTemplate(id:TemplateId){const next=getTemplate(id);setTemplateId(id);setValues(cloneValues(next.sample));setStatus(`已载入 ${next.name} 示例。`)}
 function reset(){setValues(cloneValues(template.sample));setStatus(`已恢复 ${template.name} 示例。`)}
 async function copy(){try{await navigator.clipboard.writeText(html);setStatus('已复制 HTML。')}catch{setStatus('复制失败，请从源码框手动复制。')}}
 function download(){const blob=new Blob([html],{type:'text/html;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='terminal-cli-intro.html';document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);setStatus('已下载 terminal-cli-intro.html。')}

 return <main className="studio-page">
 <header className="masthead"><div className="brand-mark">&gt;_</div><div><p className="kicker">Offline HTML workshop</p><h1>Terminal / CLI<br/>Template Studio</h1><p>用可扩展模板生成独立、可离线打开的 CLI介绍页。生成器使用 React，导出结果不依赖 React 或网络资源。</p></div></header>
 <div className="workspace">
 <aside className="panel editor-panel">
 <header className="panel-head"><div><p className="kicker">Template registry</p><h2>内容与模板</h2></div><button className="button secondary" onClick={reset}>恢复示例</button></header>
 <div className="editor-body">
 <div className="field"><label htmlFor="template">模板样式</label><select id="template" aria-label="模板样式" value={templateId} onChange={(event)=>selectTemplate(event.target.value as TemplateId)}>{templateRegistry.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}</select><p className="hint">{template.description}</p></div>
 <TemplateFields template={template} values={values} onChange={setValues}/>
 </div>
 </aside>
 <section className="result-stack"><PreviewPanel html={html}/><SourcePanel html={html} status={status} onCopy={copy} onDownload={download}/></section>
 </div>
 </main>
}
