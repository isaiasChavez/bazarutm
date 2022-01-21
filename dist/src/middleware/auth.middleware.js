"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const securerequest_class_1 = require("../modules/interfaces/securerequest.class");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configuration_1 = __importDefault(require("../config/configuration"));
const types_1 = require("../types");
const class_validator_1 = require("class-validator");
const types_2 = require("../types");
const authMid = (req, res, next) => {
    try {
        let secureRequest;
        const payload = req.header('Authorization');
        if (!payload) {
            return res
                .status(types_2.HTTPResponses.Unauthorized)
                .json({ msg: 'No hay token, permiso no valido' });
        }
        const token = payload.replace('Bearer ', '').replace('bearer ', '');
        try {
            const cifrado = jsonwebtoken_1.default.verify(token, configuration_1.default.get(types_1.ENVV.SECRET));
            const data = {
                uuidauth: cifrado.uuidauth,
                role: cifrado.role
            };
            secureRequest = new securerequest_class_1.SecureRequest(data);
        }
        catch (error) {
            return res
                .status(types_2.HTTPResponses.Unauthorized)
                .json({ msg: 'Invalid token' });
        }
        try {
            (0, class_validator_1.validateOrReject)(secureRequest);
        }
        catch (error) {
            console.log({ error });
            return res
                .status(types_2.HTTPResponses.Unauthorized)
                .json({ msg: 'Invalid token some fields are invalid' });
        }
        req.body.uuidauth = secureRequest.uuidauth;
        req.body.role = secureRequest.role;
        next();
    }
    catch (error) {
        console.log('error en el middleware');
    }
};
exports.default = authMid;
//# sourceMappingURL=auth.middleware.js.map