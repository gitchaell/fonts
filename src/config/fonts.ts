interface FontAxis {
	tag: string;
	name: string;
	min: number;
	max: number;
	default: number;
}

export interface FontConfig {
	id: string;
	fontFamily: string;
	fontName: string;
	type: string;
	axes: FontAxis[];
	fileUrl: string;
	fileName: string;
	fontFace: string;
}

export const fonts: FontConfig[] = [
	{
		id: 'google-sans',
		fontFamily: "'Google Sans', sans-serif",
		fontName: 'Google Sans',
		type: 'Variable Font with Weight, Optical Size, and Grade axes.',
		fileUrl: '/fonts/google-sans/GoogleSansVariable.woff2',
		fileName: 'GoogleSansVariable.woff2',
		fontFace: `@font-face {\n  font-family: 'Google Sans';\n  font-style: normal;\n  src: url('/fonts/google-sans/GoogleSansVariable.woff2') format('woff2-variations');\n}\n`,
		axes: [
			{ tag: 'opsz', name: 'Optical Size', min: 17, max: 18, default: 18 },
			{ tag: 'wght', name: 'Weight', min: 400, max: 700, default: 400 },
			{ tag: 'GRAD', name: 'Grade', min: -50, max: 200, default: 0 },
		],
	},
	{
		id: 'google-sans-mono',
		fontFamily: "'Google Sans Mono', monospace",
		fontName: 'Google Sans Mono',
		type: 'Variable Font with Weight axis.',
		fileUrl: '/fonts/google-sans-mono/GoogleSansMono400.woff2',
		fileName: 'GoogleSansMono400.woff2',
		fontFace: `@font-face {\n  font-family: 'Google Sans Mono';\n  font-style: normal;\n  font-weight: 400;\n  src: url('/fonts/google-sans-mono/GoogleSansMono400.woff2') format('woff2');\n}\n`,
		axes: [{ tag: 'wght', name: 'Weight', min: 400, max: 700, default: 400 }],
	},
	{
		id: 'google-sans-code',
		fontFamily: "'Google Sans Code', monospace",
		fontName: 'Google Sans Code',
		type: 'Variable Font with Weight and Mono axes.',
		fileUrl: '/fonts/google-sans-code/GoogleSansCodeVariable.woff2',
		fileName: 'GoogleSansCodeVariable.woff2',
		fontFace: `@font-face {\n  font-family: 'Google Sans Code';\n  font-style: normal;\n  src: url('/fonts/google-sans-code/GoogleSansCodeVariable.woff2') format('woff2-variations');\n}\n`,
		axes: [
			{ tag: 'wght', name: 'Weight', min: 300, max: 800, default: 400 },
			{ tag: 'MONO', name: 'Monospace', min: 0, max: 1, default: 1 },
		],
	},
	{
		id: 'geist-sans',
		fontFamily: "'Geist Sans', sans-serif",
		fontName: 'Geist Sans',
		type: 'Variable Font with Weight axis.',
		fileUrl: '/fonts/geist-sans/GeistSansVariable.woff2',
		fileName: 'GeistSansVariable.woff2',
		fontFace: `@font-face {\n  font-family: 'Geist Sans';\n  src: url('/fonts/geist-sans/GeistSansVariable.woff2') format('woff2-variations');\n}\n`,
		axes: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }],
	},
	{
		id: 'geist-mono',
		fontFamily: "'Geist Mono', monospace",
		fontName: 'Geist Mono',
		type: 'Variable Font with Weight axis.',
		fileUrl: '/fonts/geist-mono/GeistMonoVariable.woff2',
		fileName: 'GeistMonoVariable.woff2',
		fontFace: `@font-face {\n  font-family: 'Geist Mono';\n  src: url('/fonts/geist-mono/GeistMonoVariable.woff2') format('woff2-variations');\n}\n`,
		axes: [{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 }],
	},
	{
		id: 'inter',
		fontFamily: "'Inter', sans-serif",
		fontName: 'Inter',
		type: 'Variable Font with Weight and Optical Size axes.',
		fileUrl: '/fonts/inter/InterVariable.woff2',
		fileName: 'InterVariable.woff2',
		fontFace: `@font-face {\n  font-family: 'Inter';\n  font-style: normal;\n  src: url('/fonts/inter/InterVariable.woff2') format('woff2-variations');\n}\n`,
		axes: [
			{ tag: 'opsz', name: 'Optical Size', min: 14, max: 32, default: 14 },
			{ tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400 },
		],
	},
	{
		id: 'space-grotesk',
		fontFamily: "'Space Grotesk Variable', sans-serif",
		fontName: 'Space Grotesk',
		type: 'Variable Font with Weight axis.',
		fileUrl: '/fonts/space-grotesk/SpaceGroteskVariable.woff2',
		fileName: 'SpaceGroteskVariable.woff2',
		fontFace: `@font-face {\n  font-family: 'Space Grotesk Variable';\n  src: url('/fonts/space-grotesk/SpaceGroteskVariable.woff2') format('woff2-variations');\n}\n`,
		axes: [{ tag: 'wght', name: 'Weight', min: 300, max: 700, default: 300 }],
	},
	{
		id: 'google-sans-flex',
		fontFamily: "'Google Sans Flex', sans-serif",
		fontName: 'Google Sans Flex',
		type: 'Variable Font with Weight axis.',
		fileUrl: '/fonts/google-sans-flex/GoogleSansFlex.woff2',
		fileName: 'GoogleSansFlex.woff2',
		fontFace: `@font-face {\n  font-family: 'Google Sans Flex';\n  src: url('/fonts/google-sans-flex/GoogleSansFlex.woff2') format('woff2-variations');\n}\n`,
		axes: [{ tag: 'wght', name: 'Weight', min: 1, max: 1000, default: 400 }],
	},
];

export const defaultFont = fonts[0];
