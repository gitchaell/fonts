Ah! At the end of `setupSliderListeners()`, it calls `dispatchAxesChange()` unconditionally!
```javascript
  function setupSliderListeners() {
    const axisControls = document.querySelectorAll('.axis-control');
    axisControls.forEach(control => {
        // ... addEventListener ...
    });
    dispatchAxesChange(); // <-- This calls saveFontConfig() !
  }
```

Wait, there are MULTIPLE bugs that overwrite the saved configuration on init:

1. In the `// Initialize` IIFE (around line 1109):
```javascript
      renderAxesControls(dynamicAxes); // -> setupSliderListeners() -> dispatchAxesChange() -> saveFontConfig()
      renderInstances(font);

      renderDynamicFontFeatures(extractAvailableFeatures(font));
    } catch (err) { ... }

    setupSliderListeners(); // -> dispatchAxesChange() -> saveFontConfig()
    setupTypographyListeners();

    // ...

    loadFontConfig(currentFontConfig.id); // This reads from localStorage
    updateFeaturePreviews();
    dispatchTypographyChange(); // -> saveFontConfig()
    dispatchAxesChange(); // -> saveFontConfig()
```

When `renderAxesControls` is called, it builds DOM inputs with default values. Then it calls `setupSliderListeners()`, which calls `dispatchAxesChange()`, which saves the **DEFAULT values** back to `localStorage`, **OVERWRITING** whatever was there!

Later, when `loadFontConfig(currentFontConfig.id)` is called, it loads the values from `localStorage`, but `localStorage` has **ALREADY BEEN OVERWRITTEN** with defaults!

To fix this, we should NOT call `saveFontConfig()` inside `dispatchAxesChange` or `dispatchTypographyChange` during initialization, OR we should remove `dispatchAxesChange()` from `setupSliderListeners()` and strictly control when saves happen.

Wait, the best approach is to pass a parameter or flag `isInitializing` to avoid saving, OR structure the initialization sequence properly:

1. `loadFontConfig` reads from localStorage and updates the DOM inputs.
2. `saveFontConfig` reads from DOM inputs and saves to localStorage.
3. Event listeners call `dispatchTypographyChange` and `dispatchAxesChange`, which call `saveFontConfig`.

If we look at `setupSliderListeners()`:
```javascript
  function setupSliderListeners() {
    const axisControls = document.querySelectorAll('.axis-control');
    axisControls.forEach(control => {
        // ...
    });
    // REMOVE THIS: dispatchAxesChange();
  }
```

And in `// Initialize`:
```javascript
      renderAxesControls(dynamicAxes); // This should just render, not setupSliderListeners. Wait, renderAxesControls calls setupSliderListeners.
      // ...
    } catch (err) { ... }

    // setupSliderListeners() is also called here! (duplicate)
    setupTypographyListeners();
    // ...

    loadFontConfig(currentFontConfig.id); // Load config from LocalStorage into DOM

    // Now that DOM is loaded, update styles but don't overwrite if not needed?
    // Wait, dispatchTypographyChange() calls saveFontConfig() which will save the loaded values back (which is fine).
```

Let's check `dispatchTypographyChange` and `setupSliderListeners`.
