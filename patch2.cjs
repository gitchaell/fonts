const fs = require('fs');
let code = fs.readFileSync('src/components/RightSidebar.astro', 'utf-8');

// Add to the slider listener so that it resets the instance dropdown to "Custom" when manually dragged
code = code.replace(
  `input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          valueDisplay.textContent = target.value;
          dispatchAxesChange();
        });`,
  `input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          valueDisplay.textContent = target.value;

          const instancesSelect = document.getElementById('font-instances') as HTMLSelectElement;
          if (instancesSelect && instancesSelect.value !== "") {
             instancesSelect.value = ""; // Reset to custom
          }

          dispatchAxesChange();
        });`
);
fs.writeFileSync('src/components/RightSidebar.astro', code);
