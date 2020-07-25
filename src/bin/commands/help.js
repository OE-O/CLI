const {
    commands
} = require('../../db');
const {
    colors
} = require('../../console-utils');
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
        var logger = options.logger;
        if (options.forceMode) logger.debug("The --force tag has no effect on this command.");
        logger.debug("Getting all commands.");
        if(args[1]) {
            if(!commands.has(args[1])) return logger.error(` The command ${colors.FgYellow}${args[1]}${colors.FgRed} does not exist, did you make a typo?`);
            var command = commands.get(args[1]);
            logger.log(`${colors.FgMagenta}oeo ${colors.FgYellow}${command.name} ${colors.FgCyan}${command.usage} ${colors.FgBlue}- ${command.desc}`)
            logger.log("Arguments:\n")
            command.args.forEach(arg => {
                logger.log(`${colors.FgCyan}${arg.key}${colors.FgBlue} - ${arg.desc} - ${colors.FgRed}Optional? ${colors.FgYellow}${arg.optional}`)
            })
            return;
        }
        const output = [];
        output.push(`For infomation on each command, use ${colors.FgMagenta}oeo ${colors.FgYellow}help ${colors.FgCyan}{command}${colors.Reset}\n`)
        commands.forEach(command => {
            output.push(`${command.desc} - ${colors.FgMagenta}oeo ${colors.FgYellow}${command.name} ${colors.FgCyan}${command.usage}`)
        });
        output.forEach(o => logger.log(o));
    }
}