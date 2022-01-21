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
const error_helper_1 = __importDefault(require("../../helpers/error.helper"));
const asset_entity_1 = require("./asset.entity");
class AssetService {
    constructor() {
        this.getAssetsPublication = (publication) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!publication.producto) {
                    throw new Error("Publication must have product field");
                }
                const assets = yield asset_entity_1.Asset.find({
                    where: {
                        product: publication.producto
                    },
                    select: ["title", "description", "url"]
                });
                return assets;
            }
            catch (error) {
                this.errorHelper.genericHandler("getAssetsPublication", error);
                return [];
            }
        });
        this.delete = (asset) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof asset === 'string') {
                    asset_entity_1.Asset.createQueryBuilder().delete().where("uuid = :asset", {
                        asset
                    });
                }
                else {
                    asset_entity_1.Asset.remove(asset);
                }
                return true;
            }
            catch (error) {
                this.errorHelper.genericHandler("getAssetsPublication", error);
                return false;
            }
        });
        this.errorHelper = new error_helper_1.default(this);
    }
}
exports.default = AssetService;
//# sourceMappingURL=asset.service.js.map