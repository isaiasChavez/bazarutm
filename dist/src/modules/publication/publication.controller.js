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
const publication_service_1 = __importDefault(require("./publication.service"));
const publication_dto_1 = require("./publication.dto");
const class_validator_1 = require("class-validator");
const service_interface_1 = require("../interfaces/service.interface");
class PublicationController extends service_interface_1.Controller {
    constructor() {
        super();
        this.firsValueRes = { status: 400, data: null, msg: 'ok' };
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const category = req.query.category;
                const query = req.query.query;
                const realCategory = category ? category : 'all';
                const realQuery = query ? query : '';
                response = yield this.publicationService.getAll(realCategory, realQuery);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('addProduct', e) });
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                response = yield this.publicationService.getOne(req.params.uuid);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getOne', e) });
            }
        });
        this.getRelated = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const publicationUuid = req.query.p;
                let response = this.firsValueRes;
                if (!publicationUuid) {
                }
                const dto = new publication_dto_1.GetRelated(req.params.category, publicationUuid);
                (0, class_validator_1.validateOrReject)(dto);
                response = yield this.publicationService.getRelated(dto);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getOne', e) });
            }
        });
        this.getAllOfUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                response = yield this.publicationService.getAllOfUser(req);
                res.status(response.status).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getAllOfUser', e) });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new publication_dto_1.CreatePublicationDTO(req.body);
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.publicationService.create(data);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('create', e);
                });
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('create', e) });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const data = new publication_dto_1.UpdatePublicationDTO(req.body);
                yield (0, class_validator_1.validateOrReject)(data)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    response = yield this.publicationService.update(data);
                }))
                    .catch(e => {
                    response.msg = this.eH.validationHandler('update', e);
                });
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('create', e) });
            }
        });
        this.deletePublication = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = this.firsValueRes;
                const publicationUuid = req.params.uuid;
                response = yield this.publicationService.delete(publicationUuid, req);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ msg: this.eH.genericHandler('getOne', e) });
            }
        });
        this.publicationService = new publication_service_1.default();
    }
}
exports.default = PublicationController;
//# sourceMappingURL=publication.controller.js.map