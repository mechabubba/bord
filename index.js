// i'm decidedly writing this in js. surely won't regret this...
import { log } from "./src/log.js";

// process events. https://nodejs.org/api/process.html
process.on("uncaughtException", (error, origin) => {
    log.fatal(`${origin},`, error);
    return process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => log.error(`unhandledRejection\n`, promise));
process.on("rejectionHandled", (promise) => log.debug("rejectionHandled\n", promise));
process.on("warning", (warning) => log.warn(warning));
process.on("exit", (code) => code === 0 ? log.info("Exiting peacefully") : log.warn("Exiting abnormally with code ", code));

/*
try {
    await fs.access("data/config.json", fs.constants.F_OK);
} catch(e) {
    log.error("config.json doesn't exist. Creating it!");
    log.error("Fill out your important data inside of it and then relaunch. :)");
    
    const json = JSON.parse(await fs.readFile("data/default_config.json"));
    delete json["__message__"];
    await fs.writeFile("data/config.json", JSON.stringify(json, null, 4));
    
    process.exit(1);
}
*/

import bord from "./src/bord.js";
bord.start(); // lets rock.
