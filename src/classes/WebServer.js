import { log, httpCodeSeverity } from "../log.js";
import { init } from "../routes.js";
import { App } from "@tinyhttp/app";
import { Eta } from "eta";
import sirv from "sirv";

class WebServer {
    constructor(options) {
        this.port = options?.port;
        this.server = null;
        this.app = new App({
            settings: {
                networkExtensions: true,
                views: "./src/views",
            }
        });

        this.eta = new Eta({ views: "/" });
        this.app.engine("eta", this.renderFile.bind(this));
    
        // log requests
        this.app.use((req, res, next) => {
            const time = Date.now();
            res.on("finish", () => {
                /** @todo Figure out how to log the JSON body of requests and responses if present on either */
                const ms = Date.now() - time;
                const level = httpCodeSeverity(res.statusCode);
                log[level]({
                    "ip": req.ip || req.socket.remoteAddress || null,
                    "method": req.method,
                    "code": res.statusCode,
                    "url": req.originalUrl || req.url || null,
                    "cookies": req.cookies,
                    "responseTime": `${ms}ms`,
                }, res.statusMessage);
            });
            next();
        });

        // static files
        this.app.use("/", sirv("src/public", {
            maxAge: 86400
        }));
    }

    start() {
        init(this.app); // init routes. might revisit this implementation...

        this.server = this.app.listen(this.port, () => {
            log.info(`[READY] ROCK AND ROLL`);
        });
    }

    renderFile(template, locals, options, cb) {
        let result;
        try {
            result = this.eta.render(template, locals, options);
        } catch(e) {
            cb(e, result);
        }
        cb(null, result);
    }
}

export default WebServer;
