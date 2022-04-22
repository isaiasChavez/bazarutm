"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
class Config {
    constructor() {
        this.corsOptions = {
            origin: 'http://example.com',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            optionsSuccessStatus: 200
        };
        this.configProduction = () => {
            this.timeExpireSesions = 60 * 60 * 24;
        };
        this.configDevelopment = () => {
            this.timeExpireSesions = 60 * 60 * 24 * 30;
        };
        const variables = dotenv_1.default.config();
        if (variables.error) {
            throw new Error('.env file does not exist, please create one');
        }
        this.environment = dotenv_1.default.config().parsed;
        if (this.environment.ENVIROMENT === 'production') {
            this.configProduction();
        }
        else {
            this.configDevelopment();
        }
    }
    get(variable) {
        const response = this.environment[variable];
        if (!response) {
            throw new Error('env variable does not exist, please be shure of create one');
        }
        return response;
    }
}
const config = new Config();
exports.default = config;
//# sourceMappingURL=configuration.js.map