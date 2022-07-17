import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const config: UserConfig = {
		plugins: [
			react(),
			tsconfigPaths(),
			// mkcert({
			// 	source: "coding",
			// }),
		],
	};
	return config;
});
