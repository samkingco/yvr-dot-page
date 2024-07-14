/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: ["CommitMono", "monospace"],
		},
		fontSize: {
			DEFAULT: "1rem",
			"heading-one": "1.6rem",
			"heading-two": "0.875rem",
			"heading-three": "0.875rem",
			xl: "1.375rem",
			lg: "1.125rem",
			md: "1rem",
			sm: "0.875rem",
			xs: "0.75rem",
			label: "0.875rem",
			root: "16px",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			background: "hsl(var(--background), <alpha-value>)",
			foreground: "hsl(var(--foreground), <alpha-value>)",
		},
	},
	plugins: [require("./tailwind.variableFontPlugin.js")],
}
