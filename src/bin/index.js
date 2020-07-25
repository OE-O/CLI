#!/usr/bin/env node

const {colors, color, emoji, emojis, resetColor} = require("../console-utils");
const fs = require('fs');
const {commands} = require('../db');
const Logging = require('../loggingClass')

const args = process.argv.slice(2);

const options = {
    debug: false,
    force: false,
    logger: undefined,
}

if (!args.length) {
    return console.log(emoji(color(" Please add an argument, eg: " + color("oeo help", colors.FgGreen), colors.FgRed), emojis.Cross));
}
if (args.includes("--force") || args.includes("-f")) {
    options.force = true;
    var e = args.indexOf("--force" || "-f");
    args.splice(e);
    console.log(color("Forced mode can cause unexpected errors.", colors.FgYellow));
}
if (args.includes("--debug") || args.includes("-d")) {
    var e = args.indexOf("--debug" || "-d");
    args.splice(e);
    options.debug = true;
    console.log(color("Debug mode can cause private info to be released, use with caution.", colors.FgRed));
}
const logger = new Logging(options.debug);
options.logger = logger;
const command = args[0];
fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".js")).forEach(file => {
    const prop = require(`./commands/${file}`);
    commands.set(prop.name, prop);
    logger.debug("Loaded command: " + colors.FgYellow + prop.name);
});
if(!commands.has(args[0])) return logger.error(` The command ${colors.FgGreen}${args[0]}${colors.FgRed} is not a valid command.`, `You can use ${colors.FgGreen}oeo help {command}${colors.FgRed} for a list of each command.`)
var cmd = commands.get(command);
cmd.execute(options, args)