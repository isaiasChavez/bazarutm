"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOLDERS = void 0;
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const configuration_1 = __importDefault(require("../config/configuration"));
const types_1 = require("../types");
var FOLDERS;
(function (FOLDERS) {
    FOLDERS["profile"] = "profile";
    FOLDERS["users"] = "users";
})(FOLDERS = exports.FOLDERS || (exports.FOLDERS = {}));
class MulterService {
    constructor() {
        this.spaces_endpoint = new aws_sdk_1.default.Endpoint(configuration_1.default.get(types_1.ENVV.S3_ENDPOINT));
        this.s3 = new aws_sdk_1.default.S3({
            endpoint: this.spaces_endpoint,
        });
        this.NAME_INPUT = "upload";
        this.uploadSingle = (folder) => {
            return (0, multer_1.default)({
                storage: (0, multer_s3_1.default)({
                    s3: this.s3,
                    bucket: configuration_1.default.get(types_1.ENVV.BUCKET_NAME),
                    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
                    acl: "public-read",
                    metadata: (req, file, cb) => {
                        cb(null, {
                            fieldname: file.fieldname,
                        });
                    },
                    key: (req, file, cb) => {
                        console.log("UPLOAD SINGLE", { file });
                        cb(null, `${folder}/${Date.now().toString()}-${file.originalname.replace(/\s+/g, "").trim()}`);
                    },
                }),
            }).single(this.NAME_INPUT);
        };
        console.log(configuration_1.default.get(types_1.ENVV.BUCKET_NAME));
    }
}
exports.default = MulterService;
//# sourceMappingURL=multer.js.map