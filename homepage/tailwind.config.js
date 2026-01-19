/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude brand colors
        'claude': {
          'primary': 'hsl(195, 100%, 40%)',      // 青蓝色 - 链接和交互元素
          'button': '#334BFA',                    // 按钮蓝
          'accent': '#CC785C',                    // 陶土橙 - 强调色
        },
        'claude-bg': {
          'main': '#FFFFFF',                      // 主背景 - 纯白
          'header': '#F0F0EB',                    // 页眉背景 - 米白色
          'footer': '#191919',                    // 页脚背景 - 深炭黑
          'card': '#FFFFFF',                      // 卡片背景
        },
        'claude-text': {
          'primary': '#1a1a1a',                   // 主文本
          'secondary': '#737373',                 // 次要文本
          'light': '#F0F0EB',                     // 浅色文本（用于深色背景）
        },
        'claude-status': {
          'info': '#334bfa',
          'info-bg': '#dce1f9',
          'success': '#0f7134',
          'success-bg': '#d7efdc',
          'warning': '#b24d00',
          'warning-bg': '#ffebdb',
          'error': '#df2020',
          'error-bg': '#ffdbdb',
        },
        'claude-border': {
          'light': '#E6E6E6',                     // 浅灰边框
          'medium': '#CCCCCC',                    // 中灰边框
        }
      },
    },
  },
  plugins: [],
}
