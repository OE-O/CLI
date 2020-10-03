const { emoji } = require('../../console-utils');
const { commands } = require('../../db');
require('../../console-utils');

module.exports = {
    name: "help",
    desc: "View a list of all the commands or a certain command",
    usage: "{command}",
    args: [{
        optional: true,
        key: "command",
        desc: "The command to get help with."
    }],
    execute(options, args) {
        if (options.forceMode) {
            console.log(emoji.warn, "The --force tag has no effect on this command.".warn);
        }
        if (options.debug) {
            console.log(emoji.info, "Getting all commands.".info);
        }
        if (args[0]) {
            if (!commands.has(args[0])) {
                return console.log('The command'.warn, args[0].info, 'does not exist'.warn, 'did you make a typo?'.success);
            }
            var command = commands.get(args[0]);
            console.log('oeo-cli'.prefix, command.name.info, command.usage.help, '-'.prefix, command.desc.help)
            console.log("Arguments:\n")
            command.args.forEach(arg => {
                console.log(arg.key.info, '-', arg.desc.help, '-', 'Optional?'.warn, arg.optional.help)
            })
            return;
        }
        console.log(emoji.info, 'For infomation on each command, use'.info, 'oeo-cli'.prefix, 'help {command}\n'.help)
        commands.forEach(command => {
            console.log(command.desc.help, '-', 'oeo-cli'.prefix, command.name.info, command.usage.help)
        });
    }
}