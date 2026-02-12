import Logger from "./logger";
import NetBoxApi from "./netBoxApi";
import DeviceModel from "../database/models/deviceModel";
import OxidizedApi from "./oxidizedApi";
const logger = Logger.getInstance("oxidized-sync");

class OxidizedSync {

    public async sync() {
        logger.logMessage("start sync");
        const api = new NetBoxApi();
        const oxidizedApi = new OxidizedApi();
        const devices = await api.getDevices();
        if (devices === null) {
            return false;
        }
        //using basic logic for os detection for now
        await DeviceModel.query().delete();
        for (const device of devices.results) {
            logger.logMessage(`check ${device.name}`);
            const manufacturer = device.device_type.manufacturer.name;
            const name = device.name;
            const model = this.parseModel(manufacturer);
            if (model == null) {
                logger.logMessage(`failed to parse device model for ${name} ${manufacturer}`, "warn");
                continue;
            }
            if (device.primary_ip4 === null) {
                logger.logMessage(`missing ipv4 management on device ${name}`, "warn");
                continue;
            }
            const ip = device.primary_ip4.address.split("/")[0];

            logger.logMessage(`update entry for ${name} ${manufacturer} ${ip}`);
            await DeviceModel.query().insert({
                name: name,
                model: model,
                ip: ip
            });
        }
        await oxidizedApi.reload();
        logger.logMessage("end sync");
        return true;
    }

    private parseModel(manufacturer: string) {
        if (manufacturer.match(/Mikrotik/)) {
            return "routeros";
        }
        return null;
    }

}

export default OxidizedSync;