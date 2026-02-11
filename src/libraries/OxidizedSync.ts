import Logger from "./logger";
import NetBoxApi from "./netBoxApi";
const logger = Logger.getInstance("oxidized-sync");

class OxidizedSync {

    public async sync(){
        logger.logMessage("start sync");
        const api = new NetBoxApi();
        const devices = await api.getDevices();
        if(devices === null){
            return false;
        }
        
        console.log(devices);
    }
}

export default OxidizedSync;