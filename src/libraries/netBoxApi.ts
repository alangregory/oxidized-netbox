import config from "config";
import axios from "axios";
import Logger from "./logger";
const logger = Logger.getInstance("netboxapi");

class NetBoxApi {
    private api;
    public constructor() {
        const host: string = config.get("netbox.host");
        const key: string = config.get("netbox.key");
        const token: string = config.get("netbox.token");
        this.api = axios.create({
            baseURL: `${host}/api`,
            headers: {
                'Authorization': `Bearer nbt_${key}.${token}`
            }
        });
    }

    public async getDevices() {
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

export default NetBoxApi;