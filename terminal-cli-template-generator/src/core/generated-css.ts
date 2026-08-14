export const sharedGeneratedCss = String.raw`:root {
 color-scheme: light;
 --paper:#f4f8fd; --ink:#142034; --muted:#68788f; --line:#d6e1ef;
 --accent:#316fe0; --terminal:#111923; --terminal-2:#172233;
 --terminal-muted:#a8b7c9; --terminal-hot:#fff; --radius-lg:34px;
 --display:"Iowan Old Style","Palatino Linotype","Book Antiqua",Georgia,serif;
 --sans:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
 --mono:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,"PingFang SC",monospace;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;min-width:0;min-height:100%;overflow-x:hidden}
body{background:radial-gradient(circle at 12% 0%,rgba(49,111,224,.14),transparent 28rem),linear-gradient(180deg,#f8fbff 0%,var(--paper) 48%,#edf4fb 100%);color:var(--ink);font:16px/1.7 var(--sans);text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
h1,h2,h3,p,pre,ol{margin:0}ol{padding:0;list-style:none}code,pre{font-family:var(--mono)}
:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.page{min-width:0;min-height:100vh;padding:clamp(28px,6vw,84px) clamp(16px,4vw,48px);display:grid;place-items:center}
.shell{width:min(100%,1180px);min-width:0}.copy{min-width:0;display:grid;align-content:center}
.eyebrow{width:max-content;max-width:100%;margin-bottom:26px;padding:7px 12px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--accent);font:800 12px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase}
h1{max-width:12ch;font:clamp(42px,7vw,84px)/.94 var(--display);letter-spacing:-.064em}
.copy-body{max-width:58ch;margin-top:24px;display:grid;gap:14px;color:var(--muted);font-size:clamp(16px,1.45vw,20px);line-height:1.75}
.copy-body:first-child,.eyebrow+.copy-body{margin-top:0}.copy-strong{color:var(--ink);font-weight:760}
.hero-grid,.feature-grid{min-width:0;display:grid;grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr);gap:clamp(34px,6vw,78px);align-items:center}
.template-feature h1{max-width:14ch;font-size:clamp(36px,5vw,68px)}
.cta-row{margin-top:34px;display:flex;flex-wrap:wrap;gap:12px}.cta{width:max-content;max-width:100%;min-height:46px;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:var(--ink);color:#fff;font-weight:760;text-decoration:none;box-shadow:0 18px 40px rgba(20,32,52,.18)}
.cta-secondary{background:#fff;color:var(--ink);border:1px solid var(--line);box-shadow:none}
.stage{min-width:0;padding:clamp(20px,4vw,44px);border-radius:var(--radius-lg);background:linear-gradient(135deg,#eaf4ff 0%,rgba(184,212,255,.42) 42%,rgba(93,143,237,.78) 78%,#3368d8 100%);box-shadow:0 30px 90px rgba(54,103,188,.3);overflow:hidden}
.terminal{min-width:0;min-height:clamp(310px,42vw,480px);padding:clamp(18px,3vw,30px);display:grid;grid-template-rows:auto 1fr;border-radius:24px;background:linear-gradient(180deg,var(--terminal-2),var(--terminal));color:var(--terminal-muted);box-shadow:0 28px 80px rgba(9,17,29,.42),inset 0 0 0 1px rgba(255,255,255,.08);overflow:hidden}
.terminal-bar{min-width:0;margin-bottom:24px;display:flex;align-items:center;gap:10px;font:12px/1 var(--mono)}.dots{display:inline-flex;gap:7px;flex:0 0 auto}.dots i{width:10px;aspect-ratio:1;border-radius:50%;background:#ff6b6b}.dots i:nth-child(2){background:#ffd166}.dots i:nth-child(3){background:#51cf66}.terminal-title{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.terminal pre,.step-command pre{max-width:100%;min-width:0;overflow-x:auto;white-space:pre}.terminal pre{font-size:clamp(13px,1.25vw,15px);line-height:1.86}.terminal code,.step-command code{display:block;min-width:max-content}.term-strong{color:var(--terminal-hot);font-weight:850}
.section-head{max-width:760px;margin-bottom:clamp(28px,5vw,52px)}.section-head h1{max-width:13ch}.section-head .copy-body{font-size:clamp(15px,1.25vw,18px)}
.steps{display:grid;gap:16px}.step-card,.number-card{min-width:0;padding:clamp(18px,3vw,28px);border:1px solid var(--line);border-radius:26px;background:rgba(255,255,255,.86);box-shadow:0 20px 62px rgba(39,72,118,.12)}
.step-card{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:start}.step-marker,.card-marker{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:var(--ink);color:#fff;font:850 13px/1 var(--mono)}
.step-main{min-width:0;display:grid;gap:10px}.step-main h2,.number-card h2{font-size:clamp(20px,2vw,28px);line-height:1.15;letter-spacing:-.025em}.step-main>p,.number-card>p{color:var(--muted)}
.step-command{margin-top:6px;padding:14px 16px;border-radius:16px;background:var(--terminal);color:var(--terminal-muted);overflow:hidden}.step-command pre{font-size:13px;line-height:1.7}
.step-methods{display:grid;gap:16px}.method-tabs{width:max-content;max-width:100%;display:flex;gap:4px;padding:4px;border-radius:12px;background:rgba(20,32,52,.06);overflow-x:auto}.method-tab{min-height:36px;padding:0 14px;border:1px solid transparent;border-radius:10px;background:transparent;color:var(--muted);font:700 14px/1 var(--sans);cursor:pointer;white-space:nowrap}.method-tab[aria-selected=true]{border-color:var(--accent);background:#fff;color:var(--ink);box-shadow:0 0 0 1px rgba(49,111,224,.14)}.method-panel{display:grid;gap:16px}.method-panel[hidden]{display:none}.method-command-block{display:grid;gap:8px}.method-command-label{color:var(--ink);font-weight:760;font-size:14px}
.card-grid{min-width:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.number-card{display:grid;gap:14px}.card-top{min-width:0;display:flex;align-items:center;gap:12px}.card-command{min-width:0;color:var(--accent);font:850 14px/1 var(--mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:820px){.hero-grid,.feature-grid{grid-template-columns:1fr}.card-grid{grid-template-columns:1fr}}
@media(max-width:480px){.page{padding-inline:12px}.cta{width:100%}.stage{padding:12px}.step-card{grid-template-columns:1fr}}`
