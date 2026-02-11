import { createLogger, transports, format } from 'winston';

class Logger {
    private static instances: { [prefix: string]: Logger } = {};
    private logger;
    private constructor(prefix: string) {
        this.logger = createLogger({
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD-HH:mm:ss'
                }),
                format.printf(info => `${info.timestamp} ${info.level}:${prefix}=> ${info.message}`)
            ),
            transports: [
                new transports.Console({
                    level: "info"
                }),
                /*new transports.File({
                    filename: 'logs/app.log',
                    options: { flags: 'w' }
                })*/
            ]
        });
    }
    public logMessage(text: string, level = "info"): void {
        this.logger.log({
            level: level,
            message: text
        });
    }
    static getInstance(prefix = "main"): Logger {
        if (!this.instances[prefix]) {
            this.instances[prefix] = new Logger(prefix);
        }
        return this.instances[prefix];
    }
}
export default Logger;