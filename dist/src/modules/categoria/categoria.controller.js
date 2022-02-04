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
const service_interface_1 = require("../interfaces/service.interface");
const categoria_service_1 = __importDefault(require("./categoria.service"));
class CategoriaController extends service_interface_1.Controller {
    constructor() {
        super();
        this.firsValueRes = {
            status: this.HTTPResponses.BadRequest,
            data: null,
            msg: 'ok'
        };
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                response = yield this.categoriaService.getAll();
                res.status(response.status).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getAll', e) });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(this.HTTPResponses.Unauthorized);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('create', e) });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(this.HTTPResponses.Unauthorized);
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('delete', e) });
            }
        });
        this.categoriaService = new categoria_service_1.default();
    }
}
exports.default = CategoriaController;
//# sourceMappingURL=categoria.controller.js.map