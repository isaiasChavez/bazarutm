"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const asset_entity_1 = require("../asset/asset.entity");
const publication_entity_1 = require("../publication/publication.entity");
const statusproduct_entity_1 = require("./statusproduct/statusproduct.entity");
let Producto = class Producto extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => statusproduct_entity_1.StatusProduct, statusProduct => statusProduct.product),
    __metadata("design:type", statusproduct_entity_1.StatusProduct)
], Producto.prototype, "statusProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asset_entity_1.Asset, asset => asset.product),
    __metadata("design:type", Array)
], Producto.prototype, "assets", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => publication_entity_1.Publication, publication => publication.producto),
    __metadata("design:type", publication_entity_1.Publication)
], Producto.prototype, "publication", void 0);
Producto = __decorate([
    (0, typeorm_1.Entity)()
], Producto);
exports.Producto = Producto;
//# sourceMappingURL=product.entity.js.map