const https = require('https');
const { emoji } = require('../../console-utils');
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

        if (args[0]) {
            const request = https.request({ hostname: 'oe-o.tk', path: `/api/mods/get/${args[0]}` }, response => {

                response.on('data', info => {
                    try {
                        console.log(JSON.parse(info));
                    } catch {
                        console.log(emoji.info, info.toString('ascii').info);
                    }
                })
            })

            request.on('error', error => {
                console.error(error);
            })

            request.end();
        } else {
            console.log(emoji.cross, 'Specify mod to request'.error);
        }
    }
}