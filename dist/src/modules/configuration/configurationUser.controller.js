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
const class_validator_1 = require("class-validator");
const service_interface_1 = require("../interfaces/service.interface");
const configurationUser_service_1 = __importDefault(require("./configurationUser.service"));
const configuration_dto_1 = require("./configuration.dto");
class ConfigurationUserController extends service_interface_1.Controller {
    constructor() {
        super();
        this.firsValueRes = { status: 400, data: null, msg: "ok" };
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new configuration_dto_1.UpdateConfigurationUser(req.body);
                console.log("ACTUALIZANDO CONFIGURACION", { data });
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.configurationService.update(data, req);
                }))
                    .catch((e) => {
                    response.msg = this.eH.validationHandler("update", e);
                });
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler("update", e) });
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                response = yield this.configurationService.get(req);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler("update", e) });
            }
        });
        this.configurationService = new configurationUser_service_1.default();
    }
}
exports.default = ConfigurationUserController;
//# sourceMappingURL=configurationUser.controller.js.map