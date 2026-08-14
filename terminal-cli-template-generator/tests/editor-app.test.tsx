import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../src/App'

describe('template studio', () => {
 it('renders fields from the selected template schema', () => {
 render(<App />)

 expect(screen.getByLabelText('终端命令 / TUI 内容')).toBeInTheDocument()
 expect(screen.queryByLabelText('列表项 / 步骤项')).not.toBeInTheDocument()

 fireEvent.change(screen.getByLabelText('模板样式'), { target: { value: 'steps' } })

 expect(screen.getByLabelText('列表项 / 步骤项')).toBeInTheDocument()
 expect(screen.queryByLabelText('终端命令 / TUI 内容')).not.toBeInTheDocument()
 })

 it('keeps generated source and iframe preview in sync', () => {
 render(<App />)
 const copyInput = screen.getByLabelText('文本')
 fireEvent.change(copyInput, { target: { value: '**Custom title**\nCustom body' } })

 const output = screen.getByLabelText('生成的 HTML 源码') as HTMLTextAreaElement
 const preview = screen.getByTitle('生成页预览') as HTMLIFrameElement

 expect(output.value).toContain('Custom title')
 expect(preview.srcdoc).toBe(output.value)
 })

 it('loads the sample belonging to the newly selected template', () => {
 render(<App />)
 fireEvent.change(screen.getByLabelText('模板样式'), { target: { value: 'cards' } })

 expect((screen.getByLabelText('文本') as HTMLTextAreaElement).value).toContain('Build a terminal workflow')
 expect((screen.getByLabelText('列表项 / 步骤项') as HTMLTextAreaElement).value).toContain('codex resume')
 })
})
