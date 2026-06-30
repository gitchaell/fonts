const fs = require('fs');
let code = fs.readFileSync('src/components/RightSidebar.astro', 'utf-8');

// modify RightSidebar.astro to accept custom config from event.detail
code = code.replace(
  'const fontId = customEvent.detail.id;\n    const fontConfig = fonts.find(f => f.id === fontId);',
  'const fontId = customEvent.detail.id;\n    const fontConfig = customEvent.detail.customConfig || fonts.find(f => f.id === fontId);'
);

fs.writeFileSync('src/components/RightSidebar.astro', code);
