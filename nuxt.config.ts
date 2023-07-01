import { presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@unocss/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
  ],
  devtools: {
    enabled: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.6.0/style.min.css' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    // injectPosition: 'first',
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
