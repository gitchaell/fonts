The problem:
`renderAxesControls()` calls `setupSliderListeners()`.
`setupSliderListeners()` calls `dispatchAxesChange()` at the end.
`dispatchAxesChange()` calls `saveFontConfig()`.

When the page loads, the async IIFE calls `renderAxesControls(dynamicAxes)`.
This sets up the inputs with default values, and then calls `setupSliderListeners()`.
`setupSliderListeners()` calls `dispatchAxesChange()`, which saves the **default values** to `localStorage`, overwriting the saved configuration BEFORE `loadFontConfig()` is even called!

The fix:
1. Remove `dispatchAxesChange()` from the end of `setupSliderListeners()`. Listeners should just be attached; they shouldn't immediately trigger a save. The caller (the init IIFE or font-selected handler) will call `dispatchAxesChange()` after loading the config.
2. In the async IIFE and the 'font-selected' listener, we DO call `dispatchTypographyChange()` and `dispatchAxesChange()`. This is fine as long as we have already loaded the configuration with `loadFontConfig(fontId)` first.

Wait, are there any other functions that trigger a save before `loadFontConfig`?
Let's trace the 'font-selected' event handler:
```javascript
      // Inside font-selected handler:
      try {
        // ...
        currentFontConfig = { ...currentFontConfig, axes: dynamicAxes };
        renderAxesControls(dynamicAxes); // Calls setupSliderListeners() -> which used to call dispatchAxesChange()
        renderInstances(font);
        renderDynamicFontFeatures(extractAvailableFeatures(font));

        // rebind toggles
        const featureToggles = document.querySelectorAll('.feature-toggle');
        featureToggles.forEach(toggle => {
           toggle.addEventListener('change', dispatchAxesChange);
        });
      } catch (err) {
        // ...
      }

      loadFontConfig(fontId);
      updateFeaturePreviews();
      dispatchTypographyChange();
      dispatchAxesChange();
```

If we just remove `dispatchAxesChange();` from the end of `setupSliderListeners()`, will it break anything else?
Wait, if we remove it, `setupSliderListeners()` will just attach event listeners. The event handlers themselves call `dispatchAxesChange()`, which is correct. And the caller of `setupSliderListeners` (which is `renderAxesControls`) is followed up by `loadFontConfig()` and then manual calls to `dispatchTypographyChange()` and `dispatchAxesChange()`.

Wait, `setupSliderListeners` is also called explicitly in the initialization IIFE:
```javascript
    setupSliderListeners();
    setupTypographyListeners();
```
If we remove `dispatchAxesChange()` from `setupSliderListeners()`, it'll just attach events again (it might attach twice, but we're re-rendering the DOM anyway so it's probably fine, wait, `setupSliderListeners` does `querySelectorAll('.axis-control')`. They were just recreated by `renderAxesControls` which already called `setupSliderListeners`!).

Let's look at `setupSliderListeners`:
```javascript
  function setupSliderListeners() {
    const axisControls = document.querySelectorAll('.axis-control');
    axisControls.forEach(control => {
      const input = control.querySelector('input');
      const valueDisplay = control.querySelector('.axis-value');

      if (input && valueDisplay) {
        // To avoid duplicate listeners, but actually `renderAxesControls` clears `.innerHTML` so the old inputs are gone.
        input.addEventListener('input', (e) => { ... });
      }
    });
    dispatchAxesChange(); // REMOVE THIS
  }
```

Wait, `setupTypographyListeners` doesn't do a global dispatch at the end, right? Let's check `setupTypographyListeners`.
