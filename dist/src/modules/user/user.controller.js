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
const user_service_1 = __importDefault(require("./user.service"));
const types_1 = require("../../types");
const user_dto_1 = require("./user.dto");
const class_validator_1 = require("class-validator");
const service_interface_1 = require("../interfaces/service.interface");
class UserController extends service_interface_1.Controller {
    constructor() {
        super();
        this.firsValueRes = { status: 400, data: null, msg: 'ok' };
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                response = yield this.userService.getAll();
                res.status(response.status).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getAll', e) });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new user_dto_1.CreateUserDTO(req.body);
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.userService.create(data, types_1.Roles.user);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('createUser', e);
                });
                res.status(response.status).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('createUser', e) });
            }
        });
        this.createAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new user_dto_1.CreateUserDTO(req.body);
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.userService.create(data, types_1.Roles.admin);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('createUser', e);
                });
                res.status(response.status).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('createUser', e) });
            }
        });
        this.updateUserProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new user_dto_1.UpdateUserProfileDTO(req.body);
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.userService.update(data, req);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('updateUserProfile', e);
                });
                res.status(response.status).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({
                    msg: 'Error!'
                });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new user_dto_1.UpdateUserDTO(req.body);
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('updateUser', e);
                });
                res.status(response.status).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({
                    msg: 'Error!'
                });
            }
        });
        this.getUserLoggedProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const uuid = req.body.uuidauth;
                const getProfileDTO = new user_dto_1.GetUserLoggedProfileDTO(uuid);
                yield (0, class_validator_1.validateOrReject)(getProfileDTO)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.userService.getUserLoggedProfile(getProfileDTO);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('getUserLoggedProfile', e);
                });
                res.status(200).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getUserLoggedProfile', e) });
            }
        });
        this.getUserProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const email = req.params.email;
                const getProfileDTO = new user_dto_1.GetUserProfileDTO(email);
                yield (0, class_validator_1.validateOrReject)(getProfileDTO)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.userService.getUserProfile(getProfileDTO);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('getUserProfile', e);
                });
                res.status(response.status).json(response);
                return;
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getUserProfile', e) });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const userEmail = req.params.email;
                if (!userEmail) {
                    throw new Error('Falta el email');
                }
                const status = yield this.userService.delete(userEmail);
                const response = {
                    status: status.status,
                    data: null,
                    msg: status.msg
                };
                res.status(400).json(response);
            }
            catch (e) {
                res.status(500).json({
                    msg: 'Error!'
                });
            }
        });
        this.userService = new user_service_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map