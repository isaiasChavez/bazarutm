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
const types_1 = require("../../types");
const user_entity_1 = require("../user/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const service_interface_1 = require("../interfaces/service.interface");
const configuration_1 = __importDefault(require("../../config/configuration"));
class AuthService extends service_interface_1.Service {
    constructor() {
        super();
        this.createTokenSesion = (user) => {
            const dataToSign = {
                role: user.role.uuid,
                uuidauth: user.uuid,
            };
            const jwtToken = jsonwebtoken_1.default.sign(dataToSign, configuration_1.default.get(types_1.ENVV.SECRET), {
                expiresIn: configuration_1.default.timeExpireSesions,
            });
            return jwtToken;
        };
        this.validateTokenSesion = (token) => {
            try {
                const cifrado = jsonwebtoken_1.default.verify(token, configuration_1.default.get(types_1.ENVV.SECRET));
                return {
                    msg: "ok",
                    status: this.HTTPResponses.Ok,
                    data: cifrado
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.BadRequest,
                    msg: "Token no longer valid",
                };
            }
        };
        this.verifyUser = (loginDTO) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_entity_1.User.findOne({
                    where: {
                        email: loginDTO.email,
                    },
                    relations: ["role"],
                });
                if (!user) {
                    return {
                        msg: "user does not exist",
                        status: this.HTTPResponses.NotFound,
                    };
                }
                const match = yield bcryptjs_1.default.compare(loginDTO.password, user.password);
                if (!match) {
                    return {
                        msg: "Password does not match",
                        status: this.HTTPResponses.BadRequest,
                    };
                }
                const token = this.createTokenSesion(user);
                return {
                    msg: "Ok",
                    status: this.HTTPResponses.Ok,
                    data: { token },
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("verifyUser", error),
                };
            }
        });
        this.logOut = () => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("logOut", error),
                };
            }
        });
        this.statusOk = {
            status: 400,
            msg: "ok",
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map