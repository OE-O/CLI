const {color, colors, resetColor, emoji, emojis} = require('./console-utils');

module.exports = class Logging {
    constructor(debugMode) {
        this.debugMode = debugMode;
    }
    log(...object) {
        console.log(colors.FgBlue + object.join("\n") + colors.Reset);
    }
    warn(...object) {
        console.log(colors.FgYellow + object.join("\n" + " ") + colors.Reset);
    }
    debug(...object) {
        if(!this.debugMode) return;
        console.log(colors.FgCyan + object.join("\n" + " ") + colors.Reset);
    }
    error(...object) {
        console.log(colors.FgRed + emojis.Cross + object.join("\n" + emojis.Cross + " ") + colors.Reset);
    }
    success(...object) {
        console.log(colors.FgGreen + emojis.Tick + object.join("\n" + emojis.Tick + " ") + colors.Reset);
    }
}