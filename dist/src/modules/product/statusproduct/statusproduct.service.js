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
Object.defineProperty(exports, "__esModule", { value: true });
const service_interface_1 = require("../../interfaces/service.interface");
const statusproduct_entity_1 = require("./statusproduct.entity");
class StatusProductService extends service_interface_1.Service {
    constructor() {
        super();
        this.statusOk = {
            status: this.HTTPResponses.Ok,
            msg: 'ok'
        };
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('create', error)
                };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statuses = yield statusproduct_entity_1.StatusProduct.find({
                    select: ['name', 'id']
                });
                if (statuses.length === 0) {
                    return {
                        msg: 'There are not statuses',
                        status: this.HTTPResponses.InternalError,
                    };
                }
                return {
                    msg: 'ok',
                    status: this.HTTPResponses.Ok,
                    data: {
                        statuses
                    }
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('getAll', error)
                };
            }
        });
    }
}
exports.default = StatusProductService;
//# sourceMappingURL=statusproduct.service.js.map