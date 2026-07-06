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
    fontName: "Google Sans",
    type: "Variable Font with Weight and Width axes.",
    fileUrl: '/fonts/google-sans/GoogleSans-normal-400-1.woff2',
    fileName: "GoogleSans.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans';\n  src: url('/fonts/google-sans/GoogleSans-normal-400-1.woff2') format('woff2');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 100, max: 900, default: 400 },
      { tag: "wdth", name: "Width", min: 50, max: 150, default: 100 },
      { tag: "opsz", name: "Optical Size", min: 8, max: 144, default: 14 }
    ]
  },
  {
    id: 'google-sans-mono',
    fontFamily: "'Google Sans Mono', monospace",
    fontName: "Google Sans Mono",
    type: "Variable Font with Weight axis.",
    fileUrl: '/fonts/google-sans-mono/GoogleSansMono-normal-500-1.woff2',
    fileName: "GoogleSansMono.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans Mono';\n  src: url('/fonts/google-sans-mono/GoogleSansMono-normal-500-1.woff2') format('woff2');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 400, max: 500, default: 400 }
    ]
  },
  {
    id: 'google-sans-code',
    fontFamily: "'Google Sans Code', monospace",
    fontName: "Google Sans Code",
    type: "Variable Font with Weight axis.",
    fileUrl: '/fonts/google-sans-code/GoogleSansCode-normal-400-700-1.woff2',
    fileName: "GoogleSansCode.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans Code';\n  src: url('/fonts/google-sans-code/GoogleSansCode-normal-400-700-1.woff2') format('woff2');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 400, max: 700, default: 400 }
    ]
  },
  {
    id: 'geist-sans',
    fontFamily: "'Geist', sans-serif",
    fontName: "Geist Sans",
    type: "Variable Font with Weight axis.",
    fileUrl: '/fonts/geist/GeistVF.woff2',
    fileName: "GeistVF.woff2",
    fontFace: `@font-face {\n  font-family: 'Geist';\n  src: url('/fonts/geist/GeistVF.woff2') format('woff2-variations');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 100, max: 900, default: 400 }
    ]
  },
  {
    id: 'geist-mono',
    fontFamily: "'Geist Mono', monospace",
    fontName: "Geist Mono",
    type: "Variable Font with Weight axis.",
    fileUrl: '/fonts/geist-mono/GeistMonoVF.woff2',
    fileName: "GeistMonoVF.woff2",
    fontFace: `@font-face {\n  font-family: 'Geist Mono';\n  src: url('/fonts/geist-mono/GeistMonoVF.woff2') format('woff2-variations');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 100, max: 900, default: 400 }
    ]
  },
  {
    id: 'inter-variable',
    fontFamily: "'Inter Variable', sans-serif",
    fontName: "Inter",
    type: "Variable Font with Weight and Optical Size axes.",
    fileUrl: '/fonts/inter/InterVariable.woff2',
    fileName: "InterVariable.woff2",
    fontFace: `@font-face {\n  font-family: 'Inter Variable';\n  src: url('/fonts/inter/InterVariable.woff2') format('woff2-variations');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 100, max: 900, default: 400 },
      { tag: "opsz", name: "Optical Size", min: 14, max: 32, default: 14 }
    ]
  },
  {
    id: 'space-grotesk',
    fontFamily: "'Space Grotesk Variable', sans-serif",
    fontName: "Space Grotesk",
    type: "Variable Font with Weight axis.",
    fileUrl: '/fonts/space-grotesk/SpaceGrotesk-Variable.woff2',
    fileName: "SpaceGrotesk-Variable.woff2",
    fontFace: `@font-face {\n  font-family: 'Space Grotesk Variable';\n  src: url('/fonts/space-grotesk/SpaceGrotesk-Variable.woff2') format('woff2-variations');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 300, max: 700, default: 300 }
    ]
  },
  {
    id: 'google-sans-flex',
    fontFamily: "'Google Sans Flex', sans-serif",
    fontName: "Google Sans Flex",
    type: "Variable Font with Weight axis.",
    fileUrl: '/fonts/google-sans-flex/GoogleSansFlex.woff2',
    fileName: "GoogleSansFlex.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans Flex';\n  src: url('/fonts/google-sans-flex/GoogleSansFlex.woff2') format('woff2-variations');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 1, max: 1000, default: 400 }
    ]
  }
];

export const defaultFont = fonts[0];
