import Bord from "./classes/Bord.js";

// as of right now, esm cannot asynchronously import json files.
// so we need to load the config manually here.
//const config = JSON.parse(await readFile("data/config.json"));
export default new Bord({ port: 9001 });
