import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const toolRoot = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(toolRoot, '..')

function readProjectFile(file) {
 return fs.readFileSync(path.join(toolRoot, file), 'utf8')
}

const checks = [
 {
 file: 'src/core/generated-css.ts',
 tokens: ['at12%', 'transparent28rem', '#f8fbff0%', 'padding:018px', 'padding:7px12px', 'box-shadow:018px', 'auto1fr', 'inset0001px', 'flex:00 auto', 'font:70014px', 'box-shadow:0001px'],
 },
 {
 file: 'src/styles/app.css',
 tokens: ["padding:17px20px","margin:5px00","padding:10px16px","at8%0%","transparent32rem","calc(100% -32px)","calc(100% -20px)","font:80016px","font:80011px","padding:clamp(24px,4vw,56px)0","box-shadow:014px","margin:8px014px","box-shadow:024px","padding:012px","box-shadow:0004px","padding:014px","border-radius:16px16px00","border-radius:0016px16px"],
 },
]

const failures = []
for (const check of checks) {
 const source = readProjectFile(check.file)
for (const token of check.tokens) {
if (source.includes(token)) failures.push(`${check.file}: invalid token ${token}`)
}
}


const workflow = fs.readFileSync(path.join(repoRoot, '.github/workflows/deploy.yml'), 'utf8')
for (const required of [
 "node-version: '18'",
 'Building terminal-cli-template-generator...',
 'cd terminal-cli-template-generator',
 'npm run check',
 'mv terminal-cli-template-generator/dist publish/terminal-cli-template-generator',
]) {
 if (!workflow.includes(required)) failures.push(`tools deploy workflow missing: ${required}`)
}

const packageJson = JSON.parse(readProjectFile('package.json'))
for (const required of [
 ['homepage', 'https://myersguo.github.io/tools/terminal-cli-template-generator'],
 ['scripts.check', 'npm run audit && npm test && npm run typecheck && npm run build'],
]) {
 const value = required[0].split('.').reduce((current, key) => current?.[key], packageJson)
 if (value !== required[1]) failures.push(`package.json ${required[0]} should be ${required[1]}`)
}

const viteConfig = readProjectFile('vite.config.ts')
for (const required of [
 "base: './'",
]) {
 if (!viteConfig.includes(required)) failures.push(`vite config missing: ${required}`)
}

const homepage = fs.readFileSync(path.join(repoRoot, 'homepage/src/App.tsx'), 'utf8')
for (const required of [
 'Terminal / CLI Template Studio',
 'terminal-cli-template-generator/',
]) {
 if (!homepage.includes(required)) failures.push(`homepage missing: ${required}`)
}

const rootReadme = fs.readFileSync(path.join(repoRoot, 'CLAUDE.md'), 'utf8')
for (const required of [
 'terminal-cli-template-generator',
 '/terminal-cli-template-generator',
]) {
 if (!rootReadme.includes(required)) failures.push(`CLAUDE.md missing: ${required}`)
}

const localReadme = readProjectFile('README.md')
for (const required of [
'tools/terminal-cli-template-generator',
 '发布前检查：`npm run check`',
]) {
 if (!localReadme.includes(required)) failures.push(`README.md missing: ${required}`)
}

if (failures.length) {
 console.error(failures.join('\n'))
 process.exit(1)
}
console.log('source audit passed')
