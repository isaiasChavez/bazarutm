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
exports.GetRelated = exports.UpdatePublicationDTO = exports.CreatePublicationDTO = void 0;
const class_validator_1 = require("class-validator");
const types_1 = require("../../types");
const securerequest_class_1 = require("../interfaces/securerequest.class");
class CreatePublicationDTO extends securerequest_class_1.SecureRequest {
    constructor(body) {
        console.log({ body });
        super({ role: body.role, uuidauth: body.uuidauth });
        this.title = body.title;
        this.description = body.description;
        this.category = body.category;
        this.statusProduct = body.status;
        this.coverPage = body.coverPage;
        this.price = body.price;
        this.body = body;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePublicationDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePublicationDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePublicationDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreatePublicationDTO.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreatePublicationDTO.prototype, "statusProduct", void 0);
exports.CreatePublicationDTO = CreatePublicationDTO;
class UpdatePublicationDTO extends CreatePublicationDTO {
    constructor(body) {
        super(body);
        this.uuid = body.uuid;
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePublicationDTO.prototype, "uuid", void 0);
exports.UpdatePublicationDTO = UpdatePublicationDTO;
class GetRelated {
    constructor(category) {
        this.category = category;
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(types_1.CategoriesEnum),
    __metadata("design:type", String)
], GetRelated.prototype, "category", void 0);
exports.GetRelated = GetRelated;
//# sourceMappingURL=publication.dto.js.map