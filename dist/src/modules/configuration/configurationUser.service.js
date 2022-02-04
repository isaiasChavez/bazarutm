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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asset_service_1 = __importDefault(require("../asset/asset.service"));
const service_interface_1 = require("../interfaces/service.interface");
const user_service_1 = __importDefault(require("../user/user.service"));
const configurationUser_entity_1 = require("./configurationUser.entity");
class ConfigurationUserService extends service_interface_1.Service {
    constructor() {
        super();
        this.assetService = new asset_service_1.default();
        this.userService = new user_service_1.default();
        this.statusOk = {
            status: this.HTTPResponses.Ok,
            msg: 'ok',
        };
    }
    update(dto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const configuration = req.body.user.configurationUser;
                console.log({ user, configuration });
                configuration.instagram = dto.instagram;
                configuration.telegram = dto.telegram;
                yield configurationUser_entity_1.ConfigurationUser.save(configuration);
                const { id: __ } = configuration, resConfig = __rest(configuration, ["id"]);
                return {
                    msg: 'ok',
                    status: this.HTTPResponses.Ok,
                    data: resConfig
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('create', error),
                };
            }
        });
    }
    get(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const configuration = req.body.user.configurationUser;
                return {
                    msg: 'ok',
                    status: this.HTTPResponses.Ok,
                    data: configuration
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('create', error),
                };
            }
        });
    }
}
exports.default = ConfigurationUserService;
//# sourceMappingURL=configurationUser.service.js.map