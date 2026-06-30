const fs = require('fs');
let code = fs.readFileSync('src/components/LeftSidebar.astro', 'utf-8');

// I need to add 'let activeItem = fontList.querySelector(".active-font");' to be in the scope of the script.
// Wait, it is defined later in the file inside `if (fontList) {` block!
// Ah, the fileUpload change event listener is defined BEFORE `let activeItem...`
// I injected it right after `if (fontList) {`

code = code.replace(
  `  const fontList = document.getElementById('font-list');`,
  `  const fontList = document.getElementById('font-list');\n  let activeItem: Element | null = null;`
);

code = code.replace(
  `// Track the currently active element\n    let activeItem = fontList.querySelector('.active-font');`,
  `// Track the currently active element\n    activeItem = fontList.querySelector('.active-font');`
);

fs.writeFileSync('src/components/LeftSidebar.astro', code);
