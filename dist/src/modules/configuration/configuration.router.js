"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const getUser_middlesare_1 = __importDefault(require("../../middleware/getUser.middlesare"));
const configurationUser_controller_1 = __importDefault(require("./configurationUser.controller"));
class ConfigurationUserRoutes {
    constructor() {
        this.globalMidleware = [auth_middleware_1.default];
        this.route = "api/config";
        this.router = (0, express_1.Router)();
        this.controller = new configurationUser_controller_1.default();
        this.config();
    }
    config() {
        this.router.put('/', this.globalMidleware, getUser_middlesare_1.default, this.controller.update);
        this.router.get('/', this.globalMidleware, getUser_middlesare_1.default, this.controller.get);
    }
}
exports.default = new ConfigurationUserRoutes().router;
//# sourceMappingURL=configuration.router.js.map