import * as fontkit from 'fontkit';
const font = fontkit.openSync('public/fonts/GoogleSans-normal-400-1.woff2');

console.log('---GSUB---');
if (font.GSUB) {
    if (font.GSUB.featureList) {
        console.log(font.GSUB.featureList.map(f => f.tag));
    }
}
console.log('---GPOS---');
if (font.GPOS) {
    if (font.GPOS.featureList) {
         console.log(font.GPOS.featureList.map(f => f.tag));
    }
}
