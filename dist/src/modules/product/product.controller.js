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
const product_service_1 = __importDefault(require("./product.service"));
const service_interface_1 = require("../interfaces/service.interface");
class ProductController extends service_interface_1.Controller {
    constructor() {
        super();
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    msg: 'Si',
                    token: '1'
                });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('getAllProducts', e) });
            }
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    msg: 'Si',
                    token: '1'
                });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('getProduct', e) });
            }
        });
        this.getProductsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    msg: 'Si',
                    token: '1'
                });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('getProductsUser', e) });
            }
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    msg: 'Si',
                    token: '1'
                });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('addProduct', e) });
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    msg: 'Si',
                    token: '1'
                });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('deleteProduct', e) });
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    msg: 'Si',
                    token: '1'
                });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ msg: this.eH.genericHandler('updateProduct', e) });
            }
        });
        this.productService = new product_service_1.default();
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map