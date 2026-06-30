const fs = require('fs');
let code = fs.readFileSync('src/components/LeftSidebar.astro', 'utf-8');

// Fix the filename regex
code = code.replace(
  'const fontName = fileName.replace(/\\.[^/.]+$/, "");',
  'const fontName = fileName.replace(/\\.[^/.]+$/, "") || fileName;'
);
fs.writeFileSync('src/components/LeftSidebar.astro', code);
