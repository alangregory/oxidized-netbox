"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("./logger"));
const logger = logger_1.default.getInstance("netboxapi");
class NetBoxApi {
    api;
    constructor() {
        const host = config_1.default.get("netbox.host");
        const key = config_1.default.get("netbox.key");
        const token = config_1.default.get("netbox.token");
        this.api = axios_1.default.create({
            baseURL: `${host}/api`,
            headers: {
                'Authorization': `Bearer nbt_${key}.${token}`
            }
        });
    }
    async getDevices() {
        const devicesRequest = await this.api.get("dcim/devices", {
            params: {
                fields: "id,name,site,status,role,primary_ip4,device_type"
            }
        });
        if (!devicesRequest.data) {
            logger.logMessage(`failed to get devices from api`, "error");
            return null;
        }
        return devicesRequest.data;
    }
}
exports.default = NetBoxApi;
