import path from 'path'

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import sveltePreProcess from 'svelte-preprocess'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreProcess({
        scss: {
          prependData: `@import 'src/lib/scss/_mixin.scss';`
        }
      })
    })
  ]
})
