"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_controller_1 = __importDefault(require("./categoria.controller"));
class CategoryRoutes {
    constructor() {
        this.route = "api/category";
        this.globalMidleware = [];
        this.router = (0, express_1.Router)();
        this.controller = new categoria_controller_1.default();
        this.config();
    }
    config() {
        this.router.post('/', this.globalMidleware, this.controller.create);
        this.router.get('/', this.globalMidleware, this.controller.getAll);
    }
}
exports.default = new CategoryRoutes().router;
//# sourceMappingURL=categoria.router.js.map