"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Service = void 0;
const error_helper_1 = __importDefault(require("../../helpers/error.helper"));
const types_1 = require("../../types");
class Service {
    constructor() {
        this.HTTPResponses = types_1.HTTPResponses;
        this.eH = new error_helper_1.default(this);
    }
}
exports.Service = Service;
class Controller {
    constructor() {
        this.HTTPResponses = types_1.HTTPResponses;
        this.eH = new error_helper_1.default(this);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=service.interface.js.map