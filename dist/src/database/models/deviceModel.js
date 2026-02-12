"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const connection_1 = __importDefault(require("../connection"));
objection_1.Model.knex(connection_1.default);
class DeviceModel extends objection_1.Model {
    name;
    model;
    ip;
    static get tableName() {
        return 'devices';
    }
    static get idColumn() {
        return 'name';
    }
}
exports.default = DeviceModel;
