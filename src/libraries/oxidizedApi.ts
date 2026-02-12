import axios from "axios";
import config from "config";
import Logger from "./logger";
const loggger = Logger.getInstance("oxidized-api");

class OxidizedApi {
    private api;
    public constructor() {
        const host: string = config.get("oxidized.host");
        this.api = axios.create({
            baseURL: `${host}`
        });
    }

    public async reload() {
        const reloadRequest = await this.api.get("reload");
        if (!reloadRequest.data) {
            loggger.logMessage(`failed to reload oxidized node list`, "error");
            return false;
        }
        return true;
    }
}

export default OxidizedApi;