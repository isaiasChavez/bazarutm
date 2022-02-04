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
exports.Publication = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("../categoria/categoria.entity");
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../user/user.entity");
let Publication = class Publication extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Publication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Publication.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 50
    }),
    __metadata("design:type", String)
], Publication.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Publication.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 150
    }),
    __metadata("design:type", String)
], Publication.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Publication.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    __metadata("design:type", Boolean)
], Publication.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Category, category => category.publication),
    __metadata("design:type", categoria_entity_1.Category)
], Publication.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.publication),
    __metadata("design:type", user_entity_1.User)
], Publication.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        default: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
    }),
    __metadata("design:type", String)
], Publication.prototype, "coverPage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Producto),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entity_1.Producto)
], Publication.prototype, "producto", void 0);
Publication = __decorate([
    (0, typeorm_1.Entity)()
], Publication);
exports.Publication = Publication;
//# sourceMappingURL=publication.entity.js.map