#!/usr/bin/env node

const { emoji } = require("../console-utils");
const fs = require('fs');
const { commands } = require('../db');

const args = process.argv.slice(2);

const options = {
    debug: false,
    force: false,
}

if (!args.length) {
    return console.log(emoji.cross, 'Please add an argument, eg: '.error, "oeo-cli help".help,);
}
if (args.includes("--force") || args.includes("-f")) {
    options.force = true;
    var e = args.indexOf("--force" || "-f");
    args.splice(e, 1);
    console.log(emoji.warning, "Forced mode can cause unexpected errors.".warn);
}
if (args.includes("--debug") || args.includes("-d")) {
    var e = args.indexOf("--debug" || "-d");
    args.splice(e, 1);
    options.debug = true;
    console.log(emoji.warning, "Debug mode can cause private info to be released, use with caution.".warn);
}
const command = args[0];

fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".js")).forEach(file => {
    const prop = require(`./commands/${file}`);
    commands.set(prop.name, prop);
    if (options.debug == true) {
        console.log(emoji.info, "Loaded command: ".info, prop.name);
    }
});
if (!commands.has(args[0])) {
    return console.log(emoji.cross, 'The command'.warn, args[0].info, 'is not a valid command.'.warn, 'You can use'.success, 'oeo-cli help'.help, 'for a list of all commands.'.success);
}
var cmd = commands.get(command);
let z = args.indexOf(command)
args.splice(z, 1);
cmd.execute(options, args)