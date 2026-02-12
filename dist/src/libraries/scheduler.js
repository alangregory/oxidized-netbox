"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const OxidizedSync_1 = __importDefault(require("./OxidizedSync"));
const logger_1 = __importDefault(require("./logger"));
const logger = logger_1.default.getInstance("scheduler");
class Scheduler {
    run() {
        logger.logMessage('start schduler');
        const oxidizedSync = new OxidizedSync_1.default();
        node_cron_1.default.schedule('*/10 * * * *', async () => {
            logger.logMessage(`run cron task`);
            await oxidizedSync.sync();
        });
    }
}
exports.default = Scheduler;
