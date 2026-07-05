Ah, wait. Let's look at `setupSliderListeners()` and `setupTypographyListeners()`. Do they read the DOM value or what?

```javascript
  function setupTypographyListeners() {
    // Font Size
    const sizeRange = document.getElementById('typo-size') as HTMLInputElement;
    const sizeInput = document.getElementById('typo-size-input') as HTMLInputElement;
    if (sizeRange && sizeInput) {
      const updateSize = (val: string) => {
        sizeRange.value = val;
        sizeInput.value = val;
        typoState.fontSize = `${val}px`;
        dispatchTypographyChange();
      };
      sizeRange.addEventListener('input', (e) => updateSize((e.target as HTMLInputElement).value));
      sizeInput.addEventListener('input', (e) => updateSize((e.target as HTMLInputElement).value));
    }
    // ...
```

Wait! `setupSliderListeners()` and `setupTypographyListeners()` add event listeners to inputs. BUT look closely at the python script output:
```
Browser Console: Error
    at localStorage.setItem (<anonymous>:8:33)
    at saveFontConfig (http://localhost:4321/src/components/RightSidebar.astro?astro&type=script&index=0&lang.ts:171:15)
    at dispatchAxesChange (http://localhost:4321/src/components/RightSidebar.astro?astro&type=script&index=0&lang.ts:926:2)
    at setupSliderListeners (http://localhost:4321/src/components/RightSidebar.astro?astro&type=script&index=0&lang.ts:951:2)
    at renderAxesControls (http://localhost:4321/src/components/RightSidebar.astro?astro&type=script&index=0&lang.ts:1026:2)
```
Wait, `renderAxesControls` calls `setupSliderListeners()`, which executes something that triggers `dispatchAxesChange()` synchronously?
Let's look at `setupSliderListeners()`!
