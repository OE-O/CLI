const {
    commands
} = require('../../db');
const {
    colors
} = require('../../console-utils');
const request = require('request');
module.exports = {
    name: "info",
    desc: "View info on a mod by its ID",
    usage: "[id]",
    args: [{
        optional: false,
        key: "id",
        desc: "The id of the mod to get infomation on."
    }],
    execute(options, args) {
        var errored = false;
        var logger = options.logger;
        if (options.forceMode) logger.debug("The --force tag has no effect on this command.");
        if (!args[0].length) return logger.error("You didn't specify a mod!");
        logger.debug("Begining query to https://oe-o.tk/api/mods/" + args[0]);
        request(`https://oe-o.tk/api/mods/${args[0]}`, (err, resp) => {
            var body = JSON.parse(resp.body);
            errored = true;
            if (resp.statusCode === 400) {
                logger.debug("Either there was an error getting the mod or it doesn't exist.")
                return logger.error(` ${colors.FgCyan}${args[0]}${colors.FgRed} is not a valid mod id! Try search for a mod using ${colors.FgMagenta}oeo-cli ${colors.FgYellow}query ${colors.FgCyan}{search query}${colors.Reset}`);
            }     
            var table = {
                name: body.name,
                game: body.game,
                desc: body.shortDesc,
                id: Number.parseInt(body.id),
                url: `https://oe-o.tk/mods/${body.id}`, 
                install: `oeo-cli install ${body.id}`               
            }
            logger.log("\n")         
            logger.success(` Successfully collected info for ${colors.FgCyan}${body.name}${colors.FgGreen}!`);
            console.table(table);
        });
        if(errored) return;
    }
}