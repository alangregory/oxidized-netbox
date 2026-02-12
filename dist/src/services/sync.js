"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = __importDefault(require("../libraries/scheduler"));
(async () => {
    const scheduler = new scheduler_1.default();
    scheduler.run();
})();
