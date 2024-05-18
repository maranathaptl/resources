import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex } from 'mdsvex'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md', '.svx'],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    vitePreprocess({
      style: {
        css: {
          transformer: 'lightningcss',
        },
      }
    }),
    mdsvex(mdsvexOptions),
  ],

  kit: {
    adapter: adapter(),
    alias: {
      '$styles': './src/styles',
      '$components': './src/components',
    }
  }
};

export default config;