import { createApp } from 'vue'
import { setupRouter } from './router'

import '@unocss/reset/tailwind.css'
import './style.css'
import 'uno.css'

import App from './App.vue'

async function setupApp() {
  const app = createApp(App)

  // vue router
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
