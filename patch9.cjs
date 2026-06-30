const fs = require('fs');
let code = fs.readFileSync('src/components/RightSidebar.astro', 'utf-8');

// Add the custom font to the fonts array so it can be re-selected
code = code.replace(
  `const fontId = customEvent.detail.id;
    const fontConfig = customEvent.detail.customConfig || fonts.find(f => f.id === fontId);`,
  `const fontId = customEvent.detail.id;
    if (customEvent.detail.customConfig && !fonts.find(f => f.id === fontId)) {
        fonts.unshift(customEvent.detail.customConfig);
    }
    const fontConfig = fonts.find(f => f.id === fontId);`
);

fs.writeFileSync('src/components/RightSidebar.astro', code);
