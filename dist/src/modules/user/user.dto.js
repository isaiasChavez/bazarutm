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
exports.CreateUserDTO = exports.UpdateUserDTO = exports.GetUserLoggedProfileDTO = exports.GetUserProfileDTO = void 0;
const class_validator_1 = require("class-validator");
class GetUserProfileDTO {
    constructor(email) {
        this.email = email;
    }
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserProfileDTO.prototype, "email", void 0);
exports.GetUserProfileDTO = GetUserProfileDTO;
class GetUserLoggedProfileDTO {
    constructor(UUID) {
        this.UUID = UUID;
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserLoggedProfileDTO.prototype, "UUID", void 0);
exports.GetUserLoggedProfileDTO = GetUserLoggedProfileDTO;
class UpdateUserDTO {
    constructor({ name, lastname, email, birthday, phonenumber, gender, password, uuidauth, role }) {
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.phonenumber = phonenumber;
        this.gender = gender;
        this.password = password;
        this.email = email;
    }
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "phonenumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsAlphanumeric)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "password", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
class CreateUserDTO extends UpdateUserDTO {
    constructor({ email, name, lastname, birthday, phonenumber, gender, password, role, uuidauth, }) {
        super({ name, lastname, email, birthday, phonenumber, gender, password, uuidauth, role });
    }
}
exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=user.dto.js.map