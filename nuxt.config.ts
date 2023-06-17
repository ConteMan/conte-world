// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@unocss/nuxt',
    'nuxt-icon',
  ],
  devtools: {
    enabled: true
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: 'first',
    viewer: true,
  },
  imports: {
    dirs: ["apis"],
  },
  ssr: true,
})
