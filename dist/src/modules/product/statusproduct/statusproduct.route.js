"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statusproduct_controller_1 = __importDefault(require("./statusproduct.controller"));
const auth_middleware_1 = __importDefault(require("../../../middleware/auth.middleware"));
class ProductRoutes {
    constructor() {
        this.globalMidleware = [auth_middleware_1.default];
        this.route = "api/statusproduct";
        this.router = (0, express_1.Router)();
        this.controller = new statusproduct_controller_1.default();
        this.config();
    }
    config() {
        this.router.get('/', this.globalMidleware, this.controller.getAll);
    }
}
exports.default = new ProductRoutes().router;
//# sourceMappingURL=statusproduct.route.js.map