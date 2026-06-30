const fs = require('fs');
let code = fs.readFileSync('src/components/RightSidebar.astro', 'utf-8');

// Insert total glyphs placeholder
code = code.replace(
  '<h3 class="text-xl font-bold text-white mb-1" id="details-font-name">{defaultFont.fontName}</h3>\n        <p class="text-[13px] text-gray-400 mb-4" id="details-font-type">{defaultFont.type}</p>',
  '<h3 class="text-xl font-bold text-white mb-1" id="details-font-name">{defaultFont.fontName}</h3>\n        <p class="text-[13px] text-gray-400 mb-2" id="details-font-type">{defaultFont.type}</p>\n        <p class="text-[11px] text-gray-500 mb-4" id="details-font-glyphs"></p>'
);

// Update glyphs on font-selected
code = code.replace(
  'if (detailsFontType) detailsFontType.textContent = currentFontConfig.type;',
  'if (detailsFontType) detailsFontType.textContent = currentFontConfig.type;\n\n      const detailsFontGlyphs = document.getElementById(\'details-font-glyphs\');'
);

code = code.replace(
  'const font = fontkit.create(new Uint8Array(buffer) as any) as any;\n\n        let dynamicAxes = currentFontConfig.axes;',
  'const font = fontkit.create(new Uint8Array(buffer) as any) as any;\n        \n        if (detailsFontGlyphs) {\n          detailsFontGlyphs.textContent = font.numGlyphs ? `${font.numGlyphs} glyphs` : \'\';\n        }\n\n        let dynamicAxes = currentFontConfig.axes;'
);

// Update glyphs on init
code = code.replace(
  'const font = fontkit.create(new Uint8Array(buffer) as any) as any;\n\n      let dynamicAxes = currentFontConfig.axes;',
  'const font = fontkit.create(new Uint8Array(buffer) as any) as any;\n\n      const detailsFontGlyphs = document.getElementById(\'details-font-glyphs\');\n      if (detailsFontGlyphs) {\n          detailsFontGlyphs.textContent = font.numGlyphs ? `${font.numGlyphs} glyphs` : \'\';\n      }\n\n      let dynamicAxes = currentFontConfig.axes;'
);

fs.writeFileSync('src/components/RightSidebar.astro', code);
