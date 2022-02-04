"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVV = exports.CategoriesEnum = exports.HTTPResponses = exports.StatusProductEnum = exports.Roles = exports.typesUser = void 0;
var typesUser;
(function (typesUser) {
    typesUser["admin"] = "ADMIN";
    typesUser["user"] = "USER";
})(typesUser = exports.typesUser || (exports.typesUser = {}));
var Roles;
(function (Roles) {
    Roles["admin"] = "ADMIN";
    Roles["user"] = "USER";
})(Roles = exports.Roles || (exports.Roles = {}));
var StatusProductEnum;
(function (StatusProductEnum) {
    StatusProductEnum["NUEVO"] = "NUEVO";
    StatusProductEnum["USADO"] = "USADO - COMO NUEVO";
    StatusProductEnum["BUEN_ESTADO"] = "USADO - BUEN ESTADO";
    StatusProductEnum["SI_QUIERES"] = "USADO - LE NETA SI QUIERES LLEVATELO";
    StatusProductEnum["ENPAQUETADO"] = "ENPAQUETADO";
})(StatusProductEnum = exports.StatusProductEnum || (exports.StatusProductEnum = {}));
var HTTPResponses;
(function (HTTPResponses) {
    HTTPResponses[HTTPResponses["Ok"] = 200] = "Ok";
    HTTPResponses[HTTPResponses["OkCreated"] = 201] = "OkCreated";
    HTTPResponses[HTTPResponses["OkNoContent"] = 204] = "OkNoContent";
    HTTPResponses[HTTPResponses["OkReset"] = 205] = "OkReset";
    HTTPResponses[HTTPResponses["BadRequest"] = 400] = "BadRequest";
    HTTPResponses[HTTPResponses["Unauthorized"] = 401] = "Unauthorized";
    HTTPResponses[HTTPResponses["NotFound"] = 404] = "NotFound";
    HTTPResponses[HTTPResponses["InternalError"] = 500] = "InternalError";
})(HTTPResponses = exports.HTTPResponses || (exports.HTTPResponses = {}));
var CategoriesEnum;
(function (CategoriesEnum) {
    CategoriesEnum["ELECTRONICA"] = "ELECTRONICA";
    CategoriesEnum["HOGAR"] = "HOGAR";
    CategoriesEnum["LABORATORIOTALLER"] = "LABORATORIO Y TALLER";
    CategoriesEnum["ROPA"] = "ROPA";
    CategoriesEnum["OTROS"] = "OTROS";
})(CategoriesEnum = exports.CategoriesEnum || (exports.CategoriesEnum = {}));
var ENVV;
(function (ENVV) {
    ENVV["PORT"] = "PORT";
    ENVV["SECRET"] = "SECRET";
    ENVV["BUCKET_NAME"] = "BUCKET_NAME";
    ENVV["AWS_ACCESS_KEY_ID"] = "AWS_ACCESS_KEY_ID";
    ENVV["AWA_SECRET_ACCESS_KEY"] = "AWA_SECRET_ACCESS_KEY";
    ENVV["S3_ENDPOINT"] = "S3_ENDPOINT";
})(ENVV = exports.ENVV || (exports.ENVV = {}));
//# sourceMappingURL=index.js.map