import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

// to inject .env
const env = loadEnv(process.env.NODE_ENV, process.cwd());

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__APP_ENV__: JSON.stringify(env),
	},
});
