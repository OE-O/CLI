const colortils = require('../console-utils');
// test all consoletils
const string = colortils.color(
    'This should be red!',
    colortils.colors.FgRed,
);
const anotherString = 'This should be normal!';
console.log(string);
console.log(anotherString);
const emojiBad = colortils.emoji("Oh no, this should be a cross emoji!", colortils.emojis.Cross);
const emojiGood = colortils.emoji("This should be good, and a tick emoji!", colortils.emojis.Tick);
console.log(emojiBad + "\n" + emojiGood);

console.log(colortils.color(colortils.emoji(" Test passed!", colortils.emojis.Tick), colortils.colors.FgGreen, colortils.colors.BgBlack, colortils.colors.Bright))