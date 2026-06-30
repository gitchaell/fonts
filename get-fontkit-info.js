import * as fontkit from 'fontkit';
const font = fontkit.openSync('public/fonts/GoogleSans-normal-400-1.woff2');
console.log('Opened Google Sans');
if (font.variationAxes) console.log('variationAxes:', Object.keys(font.variationAxes));
if (font.namedVariations) console.log('namedVariations:', Object.keys(font.namedVariations));
if (font.availableFeatures) console.log('availableFeatures:', font.availableFeatures);
