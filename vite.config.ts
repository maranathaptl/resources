import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import purge from '@erbelion/vite-plugin-sveltekit-purgecss';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		sveltekit(),
		// @ts-ignore
		purge(),
		enhancedImages(),
	]
});
