import { env } from "node:process";
import pino from "pino";
import { startTime } from "./constants.js";

const level = env["log_level"] || "trace"; // @todo not using dotenv currently so make this work

export const log = pino({
    level: level,
    transport: {
        targets: [
            {
                target: "pino/file",
                level: level,
                options: {
                    destination: `logs/${startTime.toISODate()}_${startTime.toMillis()}.log`,
                    mkdir: true
                },
            },
            {
                target: "pino-pretty",
                level: level,
                options: {
                    ignore: "pid,hostname",
                },
            },
        ],
    },
});


/**
 * Determines logging level based on the first digit of the http code.
 * @param {number} firstDigit first digit of the http code
 */
export const httpCodeSeverity = (code) => {
    const firstDigit = (code / 100) | 0; // divide by 100, truncate decimal
    if (firstDigit === 5) return "error";
    if (firstDigit === 4) return "debug";
    return "trace";
};
