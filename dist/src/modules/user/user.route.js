"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const user_controller_1 = __importDefault(require("./user.controller"));
class UserRoutes {
    constructor() {
        this.globalMidleware = [auth_middleware_1.default];
        this.route = '/api/user';
        this.config = () => {
            this.router.post('/', this.controller.createUser);
            this.router.get('/', this.globalMidleware, this.controller.getUserLoggedProfile);
            this.router.put('/:email', this.globalMidleware, this.controller.updateUser);
            this.router.delete('/:email', this.globalMidleware, this.controller.deleteUser);
        };
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
        this.config();
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=user.route.js.map