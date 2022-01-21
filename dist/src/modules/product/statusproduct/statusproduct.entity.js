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
exports.StatusProduct = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product.entity");
const types_1 = require("../../../types");
let StatusProduct = class StatusProduct extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StatusProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: types_1.StatusProductEnum,
        default: types_1.StatusProductEnum.NUEVO,
        nullable: false
    }),
    __metadata("design:type", String)
], StatusProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Producto, product => product.statusProduct),
    __metadata("design:type", Array)
], StatusProduct.prototype, "product", void 0);
StatusProduct = __decorate([
    (0, typeorm_1.Entity)()
], StatusProduct);
exports.StatusProduct = StatusProduct;
//# sourceMappingURL=statusproduct.entity.js.map