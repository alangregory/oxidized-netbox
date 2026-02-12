import cron from "node-cron";
import OxidizedSync from "./OxidizedSync";
import Logger from "./logger";
const logger = Logger.getInstance("scheduler");

class Scheduler {
    public run() {
        logger.logMessage('start schduler');
        const oxidizedSync = new OxidizedSync();
        cron.schedule('* * * * *', async () => {
            logger.logMessage(`run cron task`);
            await oxidizedSync.sync();
        });
    }
}

export default Scheduler;