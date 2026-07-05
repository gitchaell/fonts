Ah wait! For `opsz` changing, it did NOT save to localStorage!
Why didn't `opsz` save?
Let's look at `setupSliderListeners()`:
```javascript
        input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          valueDisplay.textContent = target.value;

          const instancesSelect = document.getElementById('font-instances') as HTMLSelectElement;
          if (instancesSelect && instancesSelect.value !== "") {
             instancesSelect.value = ""; // Reset to custom
          }

          dispatchAxesChange();
        });
```

Wait, earlier I changed font size, and it saved. But changing axis value didn't save?
Look at output:
`Changing opsz axis value to 24...`
`LocalStorage after change: {"google-sans":{"typoState":... "axes":{"opsz":"18","wght":"400"},"features":[]}}`
Why is it "18"?
Let's see if `opszInput` was actually found and modified by my script.
