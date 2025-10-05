/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "!./src/**/__tests__/**",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 灰黑白系列
        primary: {
          50: '#fafafa',   // 最浅灰 - 背景色
          100: '#f5f5f5',  // 浅灰 - 卡片背景
          200: '#e5e5e5',  // 分割线
          300: '#d4d4d4',  // 边框
          400: '#a3a3a3',  // 次要文字
          500: '#737373',  // 辅助文字
          600: '#525252',  // 正文
          700: '#404040',  // 标题
          800: '#262626',  // 重要文字
          900: '#171717',  // 最深色
          950: '#0a0a0a',  // 纯黑
        },
        // 语义化颜色
        background: {
          DEFAULT: '#fafafa',
          secondary: '#f5f5f5',
          tertiary: '#ffffff',
        },
        foreground: {
          DEFAULT: '#171717',
          secondary: '#404040',
          muted: '#737373',
        },
        border: {
          DEFAULT: '#e5e5e5',
          secondary: '#d4d4d4',
        },
        // 保留一些功能性颜色
        accent: {
          DEFAULT: '#000000',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        'display': ['4.5rem', { lineHeight: '1', fontWeight: '900' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}