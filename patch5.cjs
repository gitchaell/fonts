const fs = require('fs');
let code = fs.readFileSync('src/components/LeftSidebar.astro', 'utf-8');

// I need to add script logic to LeftSidebar.astro to handle the file upload
// and to dynamically add the custom font to the global state so that RightSidebar.astro can pick it up.

const uploadScript = `
  const fileInput = document.getElementById('font-upload-input') as HTMLInputElement;

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name;
      // We don't have font name yet, use filename without extension
      const fontName = fileName.replace(/\.[^/.]+$/, "");
      const fontFamily = \`"CustomFont-\${Date.now()}"\`;
      const fontId = \`custom-\${Date.now()}\`;

      const fontFaceRule = \`@font-face {
  font-family: \${fontFamily};
  src: url('\${fileUrl}');
}\`;

      // Inject the @font-face rule so EditorCanvas can use it
      const style = document.createElement('style');
      style.textContent = fontFaceRule;
      document.head.appendChild(style);

      // Create a new font config object
      const customFontConfig = {
        id: fontId,
        fontFamily: fontFamily,
        fontName: fontName,
        type: "Custom Uploaded Font",
        axes: [], // RightSidebar will parse axes
        fileUrl: fileUrl,
        fileName: fileName,
        fontFace: fontFaceRule
      };

      // In order to make it work seamlessly with RightSidebar.astro, which expects fonts to be in the 'fonts' array from config,
      // we need to dispatch an event that contains the full configuration instead of just the id,
      // or we can dispatch a special event for custom fonts.
      // Wait, RightSidebar.astro checks: const fontConfig = fonts.find(f => f.id === fontId);
      // Let's modify RightSidebar.astro so it can accept a direct fontConfig object if provided in event.detail

      window.dispatchEvent(new CustomEvent('font-selected', {
         detail: {
            fontFamily: fontFamily,
            fontName: fontName,
            id: fontId,
            customConfig: customFontConfig
         }
      }));

      // Optionally, add a new item to the LeftSidebar list to show the custom font
      if (fontList) {
        if (activeItem) {
          activeItem.classList.remove('active-font', 'bg-[#2c2c2c]', 'border-blue-500', 'shadow-sm');
          activeItem.classList.add('hover:bg-[#2c2c2c]', 'border-transparent');
          const indicator = activeItem.querySelector('.font-active-indicator');
          if (indicator) indicator.classList.add('hidden');
          const nameDisplay = activeItem.querySelector('.font-name-display');
          if (nameDisplay) {
             nameDisplay.classList.remove('text-white');
             nameDisplay.classList.add('text-slate-300', 'group-hover:text-white');
          }
        }

        const newItemStr = \`
          <div class="font-item group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 active-font bg-[#2c2c2c] border-blue-500 shadow-sm" data-id="\${fontId}" data-font='\${fontFamily}' data-name="\${fontName}">
             <div class="flex flex-col">
                <span class="font-name-display text-[13px] font-bold text-white transition-colors" style="font-family: \${fontFamily}">\${fontName}</span>
                <span class="text-[11px] text-gray-500 mt-1">Custom Font</span>
             </div>
             <div class="font-active-indicator w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          </div>
        \`;

        fontList.insertAdjacentHTML('afterbegin', newItemStr);
        activeItem = fontList.firstElementChild;
      }
    });
  }
`;

code = code.replace(
  '  const fontList = document.getElementById(\'font-list\');\n\n  if (fontList) {',
  '  const fontList = document.getElementById(\'font-list\');\n\n' + uploadScript + '\n  if (fontList) {'
);

fs.writeFileSync('src/components/LeftSidebar.astro', code);
