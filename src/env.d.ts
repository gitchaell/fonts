declare module '@calumk/editorjs-codecup';
/// <reference types="astro/client" />

interface FontSelectedEventDetail {
  id: string;
  fontFamily: string;
  fontName: string;
}

interface AxesChangedEventDetail {
  settings: string;
  features: string;
}

interface CustomEventMap {
  'font-selected': CustomEvent<FontSelectedEventDetail>;
  'axes-changed': CustomEvent<AxesChangedEventDetail>;
}

declare global {
  interface WindowEventMap extends CustomEventMap {}
  interface Window {
    Buffer: any;
  }
}
