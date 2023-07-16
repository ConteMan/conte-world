import { presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import prismjs from 'vite-plugin-prismjs'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@unocss/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-lazy-load',
    '@nuxt/content',
  ],
  content: {
    highlight: {
      // OR
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
    },
  },
  vite: {
    plugins: [
      prismjs({
        languages: 'all',
        plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
        theme: '',
        css: true,
      }),
    ],
  },
  devtools: {
    enabled: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://ik.imagekit.io/chinesefonts/packages/lxgwwenkai/dist/LXGWWenKai-Regular/result.css' },
        { rel: 'stylesheet', href: 'https://ik.imagekit.io/chinesefonts/packages/lxgwwenkai/dist/LXGWWenKai-Bold/result.css' },
        { rel: 'stylesheet', href: 'https://ik.imagekit.io/chinesefonts/packages/jxzk/dist/江西拙楷/result.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.6.0/style.min.css' },
        { rel: 'stylesheet', href: '//unpkg.com/heti/umd/heti.min.css' },
      ],
      script: [],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },
  css: [
    '~/assets/css/prism-theme.css',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: 'first',
    viewer: true,
  },
  unocss: {
    presets: [presetUno(), presetDaisy()],
  },
  imports: {
    dirs: ['apis', 'stores'],
  },
  ssr: true,
})
