import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue(),

      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
      }),

      Components({
        dirs: ['src/components'],
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'cw',
          }),
        ],
      }),

      Unocss(),
      Icons(),
    ],
    build: {
      emptyOutDir: true,
      outDir: `dist/${mode}`,
    },
  }
})
