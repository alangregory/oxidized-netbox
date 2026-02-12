"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const loggger = logger_1.default.getInstance("oxidized-api");
class OxidizedApi {
    api;
    constructor() {
        const host = config_1.default.get("oxidized.host");
        this.api = axios_1.default.create({
            baseURL: `${host}`
        });
    }
    async reload() {
        const reloadRequest = await this.api.get("reload");
        if (!reloadRequest.data) {
            loggger.logMessage(`failed to reload oxidized node list`, "error");
            return false;
        }
        return true;
    }
}
exports.default = OxidizedApi;
