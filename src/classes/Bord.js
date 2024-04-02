import WebServer from "./WebServer.js";

class Bord {
    constructor(config) {
        this.webserver = new WebServer({
            port: config.port,
        });
    }

    start() {
        this.webserver.start();
    }
}

export default Bord;
