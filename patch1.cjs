const fs = require('fs');
let code = fs.readFileSync('src/components/RightSidebar.astro', 'utf-8');

const renderInstancesFunc = `
  function renderInstances(font: any) {
    const instancesContainer = document.getElementById('instances-container');
    const instancesSelect = document.getElementById('font-instances') as HTMLSelectElement;
    if (!instancesContainer || !instancesSelect) return;

    if (!font.namedVariations || Object.keys(font.namedVariations).length === 0) {
      instancesContainer.classList.add('hidden');
      return;
    }

    instancesContainer.classList.remove('hidden');
    instancesSelect.innerHTML = '<option value="">Custom</option>';

    Object.entries(font.namedVariations).forEach(([name, axes]) => {
      const option = document.createElement('option');
      option.value = JSON.stringify(axes);
      option.textContent = name;
      instancesSelect.appendChild(option);
    });

    instancesSelect.onchange = (e) => {
      const target = e.target as HTMLSelectElement;
      if (!target.value) return; // Custom

      try {
        const axesValues = JSON.parse(target.value);
        const axisControls = document.querySelectorAll('.axis-control');
        axisControls.forEach(control => {
          const axisTag = control.getAttribute('data-axis');
          if (axisTag && axesValues[axisTag] !== undefined) {
             const input = control.querySelector('input');
             const valueDisplay = control.querySelector('.axis-value');
             if (input && valueDisplay) {
               input.value = String(axesValues[axisTag]);
               valueDisplay.textContent = String(axesValues[axisTag]);
             }
          }
        });
        dispatchAxesChange();
      } catch (err) {
        console.error("Error parsing instance values", err);
      }
    };
  }
`;

code = code.replace(
  'function renderAxesControls(axes: typeof currentFontConfig.axes) {',
  renderInstancesFunc + '\n  // Generate axes controls safely via DOM API\n  function renderAxesControls(axes: typeof currentFontConfig.axes) {'
);

code = code.replace(
  'renderAxesControls(dynamicAxes);',
  'renderAxesControls(dynamicAxes);\n        renderInstances(font);'
);

code = code.replace(
  'renderAxesControls(dynamicAxes);\n\n      renderDynamicFontFeatures(extractAvailableFeatures(font));',
  'renderAxesControls(dynamicAxes);\n      renderInstances(font);\n\n      renderDynamicFontFeatures(extractAvailableFeatures(font));'
);

// We need to apply it for the init block too (the IIFE at the bottom)
code = code.replace(
  'renderAxesControls(dynamicAxes);\n\n      renderDynamicFontFeatures(extractAvailableFeatures(font));',
  'renderAxesControls(dynamicAxes);\n      renderInstances(font);\n\n      renderDynamicFontFeatures(extractAvailableFeatures(font));'
);

fs.writeFileSync('src/components/RightSidebar.astro', code);
