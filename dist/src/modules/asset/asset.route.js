"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const getUser_middlesare_1 = __importDefault(require("../../middleware/getUser.middlesare"));
const asset_controller_1 = __importDefault(require("./asset.controller"));
class AssetRoutes {
    constructor() {
        this.globalMidleware = [auth_middleware_1.default];
        this.route = "api/asset";
        this.router = (0, express_1.Router)();
        this.controller = new asset_controller_1.default();
        this.config();
    }
    config() {
        this.router.post('/profile', this.globalMidleware, getUser_middlesare_1.default, this.controller.uploadProfilePicture);
        this.router.post('/asset', this.globalMidleware, this.controller.uploadAsset);
    }
}
exports.default = new AssetRoutes().router;
//# sourceMappingURL=asset.route.js.map