import cron from "node-cron";
import OxidizedSync from "./OxidizedSync";
import Logger from "./logger";
const logger = Logger.getInstance("scheduler");

class Scheduler {
    public async run() {
        logger.logMessage('start schduler');
        const oxidizedSync = new OxidizedSync();
        await oxidizedSync.sync();
        cron.schedule('*/10 * * * *', async () => {
            logger.logMessage(`run cron task`);
            await oxidizedSync.sync();
        });
    }
}

export default Scheduler;