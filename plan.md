1. **Instances Support:**
   - Parse `font.namedVariations` using `fontkit` to get the list of named instances and their axes values.
   - Add a UI dropdown in `RightSidebar.astro` under Font Details to select an instance.
   - When an instance is selected, update the axes sliders and dispatch the `axes-changed` event to update the CSS/preview.

2. **Required/Optional Layout Features (OpenType Features):**
   - Separate the currently extracted OpenType features into Required and Optional/Advanced based on standard OpenType feature definitions (e.g., `ccmp`, `locl`, `rvrn`, `mark`, `mkmk`, `kern` are required).
   - Display required features in a separate section or indicate that they are always on.
   - Optional layout features should have a toggle, which is already present but needs better classification or mirroring wakamai's categories more thoroughly if requested.
   - Improve the "Font Features" section in `RightSidebar.astro` to include `kern` (if present) as "On by default".

3. **Character Set Viewer:**
   - Add a way to view the character set of the font.
   - Add an Astro component or UI in `RightSidebar.astro` or a separate tab to display supported characters using `font.characterSet`.

4. **Upload Custom Font:**
   - Add a file input to allow users to upload their own `.ttf`, `.otf`, `.woff`, `.woff2` fonts, like Wakamai Fondue does.
   - Read the uploaded file as ArrayBuffer, parse with `fontkit`, and update the UI just like when selecting a font from the left sidebar.

5. **Localizations / Supported Languages:**
   - Extract `font.GSUB.scriptList` or parse unicode ranges to guess supported languages if requested. (Wakamai shows supported languages and localized forms).

The user's prompt is: "Analiza el funcionamiento de esta aplicacion, es muy completa e informativa, quiero implementar todas las funcionalidades que ofrece en nuetro playground" (Analyze the functioning of this application, it is very complete and informative, I want to implement all the functionalities it offers in our playground).

This is a very broad request. I will focus on implementing the most prominent missing features based on Wakamai Fondue:
1. **Instances (Named Variations) dropdown**: Allows quickly setting axis combinations.
2. **Character Set summary**: Showing how many characters the font supports.
3. **Layout Features Distinction**: Separating Required vs Optional OpenType features better, and handling `kern`.
4. **Drag and Drop / Upload custom fonts**: A crucial part of Wakamai Fondue.

I will request a plan review to confirm if this covers the expected scope.
