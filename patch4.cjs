const fs = require('fs');
let code = fs.readFileSync('src/components/RightSidebar.astro', 'utf-8');

const newRenderDynamicFontFeatures = `
  const requiredFeaturesList = [
    { tag: 'ccmp', name: 'Glyph Composition/Decomposition' },
    { tag: 'locl', name: 'Localized Forms' },
    { tag: 'rvrn', name: 'Required Variation Alternates' },
    { tag: 'mark', name: 'Mark Positioning' },
    { tag: 'mkmk', name: 'Mark to Mark Positioning' },
    { tag: 'kern', name: 'Kerning' }
  ];

  function renderDynamicFontFeatures(availableFeatures: string[] = []) {
    const container = document.getElementById('dynamic-font-features');
    if (!container) return;

    container.innerHTML = '';

    const activeRequired = requiredFeaturesList.filter(f => availableFeatures.includes(f.tag));

    let htmlStr = '';

    if (activeRequired.length > 0) {
      htmlStr += \`
      <div class="mb-4">
        <h4 class="text-[11px] font-bold text-gray-500 uppercase mb-2">Required Features</h4>
        <p class="text-[10px] text-gray-400 mb-2">These are always turned on by default.</p>
        <div class="space-y-1">
          \${activeRequired.map(f => \`
            <div class="text-[12px] text-gray-300 flex items-center justify-between bg-[#1e1e1e] p-2 rounded border border-[#333]">
              <span>\${f.name}</span>
              <span class="text-[10px] font-mono text-gray-500 bg-[#2c2c2c] px-1 rounded">\${f.tag}</span>
            </div>
          \`).join('')}
        </div>
      </div>
      \`;
    }

    const filteredGroups = otFeatures.map(group => {
      // Filter out required features from optional groups to avoid duplication
      const requiredTags = requiredFeaturesList.map(r => r.tag);
      const activeFeatures = group.features.filter(f => availableFeatures.includes(f.tag) && !requiredTags.includes(f.tag));
      return { ...group, features: activeFeatures };
    }).filter(group => group.features.length > 0);

    if (filteredGroups.length === 0) {
       if (activeRequired.length === 0) {
           htmlStr += '<p class="text-[12px] text-gray-500 italic">No advanced OpenType features found in this font.</p>';
       } else {
           htmlStr += '<p class="text-[12px] text-gray-500 italic mt-4">No optional OpenType features found.</p>';
       }
    } else {
       htmlStr += \`
        <div>
          <h4 class="text-[11px] font-bold text-gray-500 uppercase mb-2">Optional Features</h4>
          <div class="space-y-2">
            \${filteredGroups.map(group => \`
              <details class="group bg-[#1e1e1e] border border-[#333] rounded overflow-hidden">
                <summary class="text-[11px] font-bold text-gray-500 uppercase p-3 cursor-pointer select-none hover:bg-[#252525] transition-colors flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  \${group.category}
                  <svg class="w-4 h-4 text-gray-500 transform transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </summary>
                <div class="p-3 pt-0 border-t border-[#333] mt-1 space-y-2">
                  \${group.features.map(f => \`
                    <label class="flex items-center justify-between cursor-pointer group/label mb-2">
                      <div class="flex items-center gap-3">
                          <div class="relative">
                            <input type="checkbox" class="sr-only peer feature-toggle" data-feature="\${f.tag}">
                            <div class="w-8 h-4 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                          </div>
                          <span class="text-[12px] text-gray-300 group-hover/label:text-white transition-colors">\${f.name} (\${f.tag})</span>
                      </div>
                      <span class="text-sm text-gray-400 feature-preview" style="font-feature-settings: '\${f.tag}' 1;">\${f.preview}</span>
                    </label>
                  \`).join('')}
                </div>
              </details>
            \`).join('')}
          </div>
        </div>
       \`;
    }

    container.innerHTML = htmlStr;
  }
`;

const startIndex = code.indexOf('function renderDynamicFontFeatures');
const endIndex = code.indexOf('function dispatchTypographyChange') - 1; // get to the end of the previous function

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + newRenderDynamicFontFeatures + '\n  ' + code.substring(endIndex);
}

fs.writeFileSync('src/components/RightSidebar.astro', code);
