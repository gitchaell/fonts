Okay, so `setupTypographyListeners` does NOT have a global `dispatchTypographyChange()` at the end of the function!
It only calls it inside the event listeners.
But `setupSliderListeners` DOES have a global `dispatchAxesChange()` at the end:
```javascript
  function setupSliderListeners() {
    const axisControls = document.querySelectorAll('.axis-control');
    axisControls.forEach(control => {
      // ...
    });
    dispatchAxesChange(); // <-- This is the culprit!
  }
```

If we remove this single line, `dispatchAxesChange()` will not be called randomly during `renderAxesControls` (which runs before `loadFontConfig`).
This will allow `loadFontConfig` to actually read the values from localStorage before the first save happens.

Wait, is there anywhere else?
Let's review the initialization IIFE again:
```javascript
      currentFontConfig = { ...currentFontConfig, axes: dynamicAxes };
      renderAxesControls(dynamicAxes);
      renderInstances(font);

      renderDynamicFontFeatures(extractAvailableFeatures(font));
    } catch (err) {
      console.error("Error parsing font on init:", err);
      renderDynamicFontFeatures([]);
    }

    setupSliderListeners(); // <-- NOTE: it's called again here? wait, it was already called in renderAxesControls!
    setupTypographyListeners();

    const featureToggles = document.querySelectorAll('.feature-toggle');
    featureToggles.forEach(toggle => {
       toggle.addEventListener('change', dispatchAxesChange);
    });

    loadFontConfig(currentFontConfig.id);
    updateFeaturePreviews();
    dispatchTypographyChange();
    dispatchAxesChange();
```

Wait! What does `loadFontConfig` do exactly for the inputs?
```javascript
    if (config && config.axes) {
      const axisControls = document.querySelectorAll('.axis-control');
      axisControls.forEach(control => {
        const axisTag = control.getAttribute('data-axis');
        if (axisTag && config.axes[axisTag] !== undefined) {
           const input = control.querySelector('input');
           const valueDisplay = control.querySelector('.axis-value');
           if (input && valueDisplay) {
             input.value = config.axes[axisTag];
             valueDisplay.textContent = config.axes[axisTag];
           }
        }
      });
    }
```
If we remove `dispatchAxesChange()` from `setupSliderListeners()`, the default values will NOT be saved to localStorage before `loadFontConfig` runs.

BUT WAIT! Is there ANY other place where `saveFontConfig` is called before `loadFontConfig`?
There are toggles!
```javascript
    const featureToggles = document.querySelectorAll('.feature-toggle');
    featureToggles.forEach(toggle => {
       toggle.addEventListener('change', dispatchAxesChange);
    });
```
This just adds event listeners, it does not call `dispatchAxesChange`.

Let's do a replace of `dispatchAxesChange();` at the end of `setupSliderListeners()`.
