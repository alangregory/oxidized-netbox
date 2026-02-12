"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const netBoxApi_1 = __importDefault(require("./netBoxApi"));
const deviceModel_1 = __importDefault(require("../database/models/deviceModel"));
const oxidizedApi_1 = __importDefault(require("./oxidizedApi"));
const logger = logger_1.default.getInstance("oxidized-sync");
class OxidizedSync {
    async sync() {
        logger.logMessage("start sync");
        const api = new netBoxApi_1.default();
        const oxidizedApi = new oxidizedApi_1.default();
        const devices = await api.getDevices();
        if (devices === null) {
            return false;
        }
        //using basic logic for os detection for now
        await deviceModel_1.default.query().delete();
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
            await deviceModel_1.default.query().insert({
                name: name,
                model: model,
                ip: ip
            });
        }
        await oxidizedApi.reload();
        logger.logMessage("end sync");
        return true;
    }
    parseModel(manufacturer) {
        if (manufacturer.match(/Mikrotik/)) {
            return "routeros";
        }
        return null;
    }
}
exports.default = OxidizedSync;
