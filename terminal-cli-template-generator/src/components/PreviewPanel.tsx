interface Props { html:string }

export function PreviewPanel({html}:Props){
 return <section className="panel preview-panel">
 <header className="panel-head"><div><p className="kicker">Live output</p><h2>样式预览</h2></div></header>
 <div className="preview-shell">
 <div className="browser-bar" aria-hidden="true"><span className="traffic"><i/><i/><i/></span><span>terminal-cli-intro.html</span></div>
 <iframe title="生成页预览" sandbox="allow-scripts" srcDoc={html}/>
 </div>
 </section>
}
