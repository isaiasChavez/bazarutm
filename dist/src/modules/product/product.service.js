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
const service_interface_1 = require("../interfaces/service.interface");
class ProductService extends service_interface_1.Service {
    constructor() {
        super();
        this.createProduct = (createProductDTO) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("createProduct", error)
                };
            }
        });
        this.updateProduct = (updateProductDTO) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("updateProduct", error)
                };
            }
        });
        this.deleteAssetProduct = (uuidAsset) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("updateProduct", error)
                };
            }
        });
        this.statusOk = {
            status: this.HTTPResponses.Ok,
            msg: 'ok'
        };
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map