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
const categoria_entity_1 = require("./../categoria/categoria.entity");
const publication_entity_1 = require("./publication.entity");
const asset_service_1 = __importDefault(require("../asset/asset.service"));
const service_interface_1 = require("../interfaces/service.interface");
const product_entity_1 = require("../product/product.entity");
const statusproduct_entity_1 = require("../product/statusproduct/statusproduct.entity");
const user_service_1 = __importDefault(require("../user/user.service"));
const typeorm_1 = require("typeorm");
class PublicationService extends service_interface_1.Service {
    constructor() {
        super();
        this.assetService = new asset_service_1.default();
        this.userService = new user_service_1.default();
        this.statusOk = {
            status: this.HTTPResponses.Ok,
            msg: 'ok',
        };
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = dto.body.user;
                const statusProduct = yield statusproduct_entity_1.StatusProduct.findOne({
                    where: {
                        name: dto.statusProduct,
                    },
                });
                const category = yield categoria_entity_1.Category.findOne({
                    where: {
                        name: dto.category,
                    },
                });
                const producto = product_entity_1.Producto.create({
                    statusProduct,
                });
                yield product_entity_1.Producto.save(producto);
                const imagenesParsed = JSON.parse(dto.images);
                const publication = publication_entity_1.Publication.create({
                    category,
                    coverPage: imagenesParsed[0],
                    description: dto.description,
                    title: dto.title,
                    price: dto.price,
                    producto,
                    images: dto.images,
                    user,
                });
                yield publication_entity_1.Publication.save(publication);
                return {
                    msg: 'ok',
                    status: this.HTTPResponses.OkCreated,
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('create', error),
                };
            }
        });
    }
    update(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = dto.body.user;
                const publication = yield publication_entity_1.Publication.createQueryBuilder('publication')
                    .leftJoinAndSelect('publication.producto', 'producto')
                    .leftJoinAndSelect('publication.user', 'user')
                    .leftJoinAndSelect('publication.category', 'category')
                    .leftJoinAndSelect('producto.statusProduct', 'statusProduct')
                    .where('publication.uuid = :uuid', { uuid: dto.uuid })
                    .getOne();
                if (publication.user.uuid !== user.uuid) {
                    return {
                        msg: 'unauthorized',
                        status: this.HTTPResponses.Unauthorized,
                    };
                }
                const product = publication.producto;
                publication.title =
                    publication.title !== dto.title ? dto.title : publication.title;
                publication.description =
                    publication.description !== dto.description
                        ? dto.description
                        : publication.description;
                const categoryHasChanged = publication.category.name !== dto.category;
                const statusHasChanged = product.statusProduct.name !== dto.statusProduct;
                if (categoryHasChanged) {
                    const category = yield categoria_entity_1.Category.findOne({
                        where: {
                            name: dto.category,
                        },
                    });
                    publication.category = category;
                }
                if (statusHasChanged) {
                    const statusProduct = yield statusproduct_entity_1.StatusProduct.findOne({
                        where: {
                            name: dto.statusProduct,
                        },
                    });
                    product.statusProduct = statusProduct;
                    yield product_entity_1.Producto.save(product);
                }
                yield publication_entity_1.Publication.save(publication);
                return {
                    msg: 'ok',
                    status: this.HTTPResponses.OkCreated,
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('create', error),
                };
            }
        });
    }
    getOne(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publication = yield publication_entity_1.Publication.createQueryBuilder('publication')
                    .leftJoinAndSelect('publication.producto', 'producto')
                    .leftJoinAndSelect('publication.category', 'category')
                    .leftJoinAndSelect('publication.user', 'user')
                    .leftJoinAndSelect('producto.statusProduct', 'statusProduct')
                    .where('publication.uuid = :uuid', {
                    uuid,
                })
                    .getOne();
                if (!publication) {
                    return {
                        msg: 'There is not publication',
                        status: this.HTTPResponses.OkNoContent,
                    };
                }
                const userData = yield this.userService.getUserProfile({
                    email: publication.user.email,
                });
                console.log({ userData });
                const response = Object.assign({}, publication);
                response.status = publication.producto.statusProduct.name;
                response.category = publication.category.name;
                response.user = Object.assign(Object.assign({}, response.user), userData.data.profile);
                delete response.user.id;
                delete response.producto;
                delete response.id;
                if (!userData.data.configuration.instagram) {
                    response.user.instagram = null;
                }
                if (!userData.data.configuration.telegram) {
                    response.user.telegram = null;
                }
                console.log({ response });
                return {
                    msg: 'Ok',
                    status: this.HTTPResponses.Ok,
                    data: response,
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('getOne', error),
                };
            }
        });
    }
    delete(uuid, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const publication = yield publication_entity_1.Publication.findOne({
                    where: {
                        uuid
                    },
                    relations: ["producto", "user"]
                });
                if (!publication) {
                    return {
                        msg: 'There is not publication',
                        status: this.HTTPResponses.OkNoContent,
                    };
                }
                if (publication.user.uuid !== user.uuid) {
                    return {
                        msg: 'unauthorized',
                        status: this.HTTPResponses.Unauthorized,
                    };
                }
                yield Promise.all([publication_entity_1.Publication.delete(publication), product_entity_1.Producto.delete(publication.producto)]);
                return {
                    msg: 'Ok',
                    status: this.HTTPResponses.Ok,
                    data: null,
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('getOne', error),
                };
            }
        });
    }
    getAll(category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let publications;
                const realQuery = query.toLowerCase().trim();
                if (category === "ALL") {
                    publications = yield publication_entity_1.Publication.find({
                        where: {
                            isActive: true,
                            title: (0, typeorm_1.Like)(`%${realQuery}%`),
                        },
                        relations: ['category'],
                        select: ['title', 'description', 'isActive', "uuid", "coverPage", "images"],
                    });
                }
                else {
                    publications = yield publication_entity_1.Publication.find({
                        where: {
                            isActive: true,
                            category: {
                                name: category
                            }
                        },
                        relations: ['category'],
                        select: ['title', 'description', 'isActive', "uuid", "coverPage", "images"],
                    });
                }
                if (publications.length === 0) {
                    return {
                        msg: 'There is not values',
                        status: this.HTTPResponses.OkNoContent,
                    };
                }
                return {
                    msg: "ok",
                    status: this.HTTPResponses.Ok,
                    data: publications
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('getAll', error),
                };
            }
        });
    }
    getRelated(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorySearch = yield categoria_entity_1.Category.findOne({
                    where: {
                        name: dto.category
                    }
                });
                const publications = yield publication_entity_1.Publication.find({
                    where: {
                        isActive: true,
                        category: categorySearch,
                        uuid: (0, typeorm_1.Not)(dto.publicationUuid)
                    },
                    take: 3
                });
                if (publications.length === 0) {
                    console.log("No hay contenido");
                    return {
                        msg: 'There is not values',
                        status: this.HTTPResponses.OkNoContent,
                    };
                }
                return {
                    msg: "ok",
                    status: this.HTTPResponses.Ok,
                    data: publications
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('getAll', error),
                };
            }
        });
    }
    getAllOfUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const publications = yield publication_entity_1.Publication.find({
                    where: {
                        user,
                    },
                    relations: ['category'],
                    select: [
                        'title',
                        'coverPage',
                        'description',
                        'isActive',
                        "coverPage",
                        "images",
                        'price',
                        'uuid',
                    ],
                });
                if (publications.length === 0) {
                    return {
                        msg: 'There is not values',
                        status: this.HTTPResponses.OkNoContent,
                    };
                }
                this;
                return Object.assign(Object.assign({}, this.statusOk), { data: publications });
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler('getAll', error),
                };
            }
        });
    }
}
exports.default = PublicationService;
//# sourceMappingURL=publication.service.js.map