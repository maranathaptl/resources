import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';
import { NodePackageImporter } from 'sass';

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteInspector()
  ],
  assetsInclude: [
    '**/*.xml'
  ],
  css: {
    preprocessorOptions: {
      scss: {
        importers: [new NodePackageImporter()],
        verbose: true,
        loadPaths: ['node_modules'],
      }
    }
  }
});