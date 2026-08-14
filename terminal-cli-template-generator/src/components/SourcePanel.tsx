interface Props { html:string; status:string; onCopy:()=>void; onDownload:()=>void }

export function SourcePanel({html,status,onCopy,onDownload}:Props){
 return <section className="panel source-panel">
 <header className="panel-head source-head"><div><p className="kicker">Standalone artifact</p><h2>生成的单页 HTML</h2></div><div className="action-row"><button className="button secondary" onClick={onCopy}>复制 HTML</button><button className="button secondary" onClick={onDownload}>下载 HTML</button></div></header>
 <textarea aria-label="生成的 HTML 源码" readOnly spellCheck={false} value={html}/>
 <p className="status" aria-live="polite">{status}</p>
 </section>
}
