"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = __importDefault(require("./auth.service"));
const class_validator_1 = require("class-validator");
const service_interface_1 = require("../interfaces/service.interface");
class AuthController extends service_interface_1.Controller {
    constructor() {
        super();
        this.validateTokenSesion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params;
                const response = this.authService.validateTokenSesion(token);
                console.log({ response });
                res.status(this.HTTPResponses.Ok).json(response);
            }
            catch (error) {
                res.status(this.HTTPResponses.InternalError).json({ msg: this.eH.genericHandler('validateTokenSesion', error) });
            }
        });
        this.logIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    msg: '',
                    status: 500,
                    data: null
                };
                const data = new auth_dto_1.LoginDTO(req.body);
                try {
                    yield (0, class_validator_1.validateOrReject)(data);
                }
                catch (error) {
                    response.msg = this.eH.validationHandler('logIn', error);
                    res.status(this.HTTPResponses.BadRequest).json(response);
                    return;
                }
                response = yield this.authService.verifyUser(data);
                console.log({ response });
                res.status(this.HTTPResponses.Ok).json(response);
            }
            catch (error) {
                res.status(this.HTTPResponses.InternalError).json({ msg: this.eH.genericHandler('logIn', error) });
            }
        });
        this.logOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = new auth_dto_1.LoginDTO(req.body);
                res.json({
                    msg: '',
                    token: '1'
                });
            }
            catch (error) {
                console.log({ error });
                res.status(500).json({ msg: this.eH.genericHandler('logIn', error) });
            }
        });
        this.authService = new auth_service_1.default();
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map