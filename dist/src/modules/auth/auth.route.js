"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
class AuthRoutes {
    constructor() {
        this.globalMidleware = [];
        this.router = (0, express_1.Router)();
        this.controller = new auth_controller_1.default();
        this.config();
    }
    config() {
        this.router.post("/", this.globalMidleware, this.controller.logIn);
        this.router.post("/logout", this.globalMidleware, this.controller.logOut);
        this.router.post("/validate/:token", this.globalMidleware, this.controller.validateTokenSesion);
    }
}
exports.default = new AuthRoutes().router;
//# sourceMappingURL=auth.route.js.map