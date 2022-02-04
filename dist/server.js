"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const typeorm_1 = require("typeorm");
const auth_route_1 = __importDefault(require("./src/modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./src/modules/user/user.route"));
const product_route_1 = __importDefault(require("./src/modules/product/product.route"));
const publication_route_1 = __importDefault(require("./src/modules/publication/publication.route"));
const categoria_router_1 = __importDefault(require("./src/modules/categoria/categoria.router"));
const statusproduct_route_1 = __importDefault(require("./src/modules/product/statusproduct/statusproduct.route"));
const configuration_router_1 = __importDefault(require("./src/modules/configuration/configuration.router"));
const cors_1 = __importDefault(require("cors"));
const asset_route_1 = __importDefault(require("./src/modules/asset/asset.route"));
class Server {
    constructor(init) {
        this.endpoints = {
            baseRoute: '/',
            authentication: '/api/auth',
            user: '/api/user',
            products: '/api/product',
            sale: '/api/sale',
            publication: '/api/publication',
            config: '/api/config',
            asset: '/api/asset',
            category: '/api/category',
            statusproduct: '/api/statusproduct',
        };
        try {
            this.app = (0, express_1.default)();
            this.port = init.port;
        }
        catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)());
            this.app.use((0, express_1.json)());
            this.app.use((0, express_1.urlencoded)());
        });
    }
    lauchDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.createConnection)();
            this.connection = connection;
            if (!connection.isConnected) {
                throw new Error('DataBase is disconected'.toUpperCase());
            }
            else {
                connection.synchronize();
                console.log('DataBase is connected'.toUpperCase());
                this.connection = connection;
                return true;
            }
        });
    }
    lauchRoutes() {
        this.app.use(this.endpoints.authentication, auth_route_1.default);
        this.app.use(this.endpoints.user, user_route_1.default);
        this.app.use(this.endpoints.products, product_route_1.default);
        this.app.use(this.endpoints.publication, publication_route_1.default);
        this.app.use(this.endpoints.category, categoria_router_1.default);
        this.app.use(this.endpoints.config, configuration_router_1.default);
        this.app.use(this.endpoints.statusproduct, statusproduct_route_1.default);
        this.app.use(this.endpoints.asset, asset_route_1.default);
    }
    lauchServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.config();
            yield this.lauchDataBase();
            this.lauchRoutes();
            this.app.listen(this.port, () => {
                return console.log(`Server is listening on ${process.env.PORT}`.toUpperCase());
            });
        });
    }
}
const port = parseInt(process.env.PORT || '3000');
const server = new Server({ port });
server.lauchServer();
//# sourceMappingURL=server.js.map