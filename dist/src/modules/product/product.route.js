"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
class ProductRoutes {
    constructor() {
        this.globalMidleware = [auth_middleware_1.default];
        this.route = '/api/product';
        this.globalMidleware = [];
        this.router = (0, express_1.Router)();
        this.controller = new product_controller_1.default();
        this.config();
    }
    config() {
        this.router.post('/', this.globalMidleware, this.controller.addProduct);
    }
}
exports.default = new ProductRoutes().router;
//# sourceMappingURL=product.route.js.map