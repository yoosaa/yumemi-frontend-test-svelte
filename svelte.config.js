import adapter from '@sveltejs/adapter-auto'
import sveltePreProcess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
  preprocess: sveltePreProcess({
    scss: {
      prependData: `@import 'src/lib/scss/components/_mixin.scss';`
    }
  }),
  env: {
    dir: process.cwd()
  }
};

export default config;
