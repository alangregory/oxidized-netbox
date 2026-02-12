"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class Logger {
    static instances = {};
    logger;
    constructor(prefix) {
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({
                format: 'YYYY-MM-DD-HH:mm:ss'
            }), winston_1.format.printf(info => `${info.timestamp} ${info.level}:${prefix}=> ${info.message}`)),
            transports: [
                new winston_1.transports.Console({
                    level: "info"
                }),
                new winston_1.transports.File({
                    filename: 'logs/app.log',
                    options: { flags: 'w' }
                })
            ]
        });
    }
    logMessage(text, level = "info") {
        this.logger.log({
            level: level,
            message: text
        });
    }
    static getInstance(prefix = "main") {
        if (!this.instances[prefix]) {
            this.instances[prefix] = new Logger(prefix);
        }
        return this.instances[prefix];
    }
}
exports.default = Logger;
