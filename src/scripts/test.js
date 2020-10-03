const { emoji } = require('../console-utils');

require('../console-utils');

console.log('This should be blue!'.info);
console.log('This should be cyan!'.help);
console.log('This should be yellow!'.warn);
console.log('This should be green!'.success);
console.log('This should be red!'.error);
console.log('This should be normal!');

console.log('\n')
console.log("Cross emoji: ", emoji.cross);
console.log("Warning emoji: ", emoji.warning);
console.log("Info emoji: ", emoji.info);
console.log("Tick emoji: ", emoji.tick);

console.log('\n')
console.log("Test passed!".success, emoji.tick);