import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		react(),
		vanillaExtractPlugin(),
		nodePolyfills({
			protocolImports: true
		})
	],
	server: {
		port: 3035
	}
});
