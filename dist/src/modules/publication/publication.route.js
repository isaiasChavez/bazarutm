"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_controller_1 = __importDefault(require("./publication.controller"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const getUser_middlesare_1 = __importDefault(require("../../middleware/getUser.middlesare"));
class PublicationRoutes {
    constructor() {
        this.globalMidleware = [auth_middleware_1.default];
        this.route = "api/publication";
        this.router = (0, express_1.Router)();
        this.controller = new publication_controller_1.default();
        this.config();
    }
    config() {
        this.router.post('/', this.globalMidleware, getUser_middlesare_1.default, this.controller.create);
        this.router.get('/all', this.controller.getAll);
        this.router.delete('/:uuid', this.globalMidleware, getUser_middlesare_1.default, this.controller.deletePublication);
        this.router.put('/', this.globalMidleware, getUser_middlesare_1.default, this.controller.update);
        this.router.get('/user', this.globalMidleware, getUser_middlesare_1.default, this.controller.getAllOfUser);
        this.router.get('/:uuid', this.controller.getOne);
        this.router.get('/related/:category', this.controller.getRelated);
    }
}
exports.default = new PublicationRoutes().router;
//# sourceMappingURL=publication.route.js.map