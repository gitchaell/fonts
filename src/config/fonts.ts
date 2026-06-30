export interface FontAxis {
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
    fileUrl: "/fonts/GoogleSans-normal-400-1.woff2",
    fileName: "GoogleSans.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans';\n  src: url('/fonts/GoogleSans-normal-400-1.woff2') format('woff2');\n}\n`,
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
    fileUrl: "/fonts/GoogleSansMono-normal-500-1.woff2",
    fileName: "GoogleSansMono.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans Mono';\n  src: url('/fonts/GoogleSansMono-normal-500-1.woff2') format('woff2');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 400, max: 500, default: 400 }
    ]
  },
  {
    id: 'google-sans-code',
    fontFamily: "'Google Sans Code', monospace",
    fontName: "Google Sans Code",
    type: "Variable Font with Weight axis.",
    fileUrl: "/fonts/GoogleSansCode-normal-400-700-1.woff2",
    fileName: "GoogleSansCode.woff2",
    fontFace: `@font-face {\n  font-family: 'Google Sans Code';\n  src: url('/fonts/GoogleSansCode-normal-400-700-1.woff2') format('woff2');\n}\n`,
    axes: [
      { tag: "wght", name: "Weight", min: 400, max: 700, default: 400 }
    ]
  }
];

export const defaultFont = fonts[0];
