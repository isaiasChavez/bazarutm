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
const asset_service_1 = __importDefault(require("./asset.service"));
const multer_1 = require("../../libs/multer");
const user_service_1 = __importDefault(require("../user/user.service"));
class AssetController extends service_interface_1.Controller {
    constructor() {
        super();
        this.firsValueRes = { status: 400, data: null, msg: "ok" };
        this.uploadProfilePicture = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const user = Object.assign({}, req.body.user);
                const folder = multer_1.FOLDERS.profile;
                console.log({ folder, user });
                const response = yield this.assetService.uploadImage(folder, req, res);
                if (response.status === this.HTTPResponses.Ok) {
                    const finalRes = yield this.userService.updateUserAvatar(response.data, user);
                    res.status(finalRes.status).json(finalRes);
                }
                else {
                    res.status(response.status).json(response);
                }
            }
            catch (e) {
                res.status(this.HTTPResponses.InternalError).json({ msg: this.eH.genericHandler("uploadProfilePicture", e) });
            }
        });
        this.uploadAsset = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const folder = multer_1.FOLDERS.users;
                const response = yield this.assetService.uploadImage(folder, req, res);
                res.status(response.status).json(response);
            }
            catch (e) {
                res.status(this.HTTPResponses.InternalError).json({ msg: this.eH.genericHandler("uploadAsset", e) });
            }
        });
        this.assetService = new asset_service_1.default();
        this.userService = new user_service_1.default();
    }
}
exports.default = AssetController;
//# sourceMappingURL=asset.controller.js.map