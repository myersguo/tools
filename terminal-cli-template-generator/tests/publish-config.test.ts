import { describe, expect, it } from 'vitest'
import packageJson from '../package.json'
import { readFileSync } from 'node:fs'

describe('tools publishing config', () => {
it('publishes under the tools GitHub Pages subpath with relative Vite assets', () => {
 const viteConfig = readFileSync('vite.config.ts', 'utf8')

expect(packageJson.homepage).toBe('https://myersguo.github.io/tools/terminal-cli-template-generator')
expect(viteConfig).toContain("base: './'")
})
})
