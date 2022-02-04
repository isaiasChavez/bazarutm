"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.environment = process.env;
        console.log("this.environment:", this.environment);
        if (this.environment.ENVIROMENT === 'production') {
            this.configProduction();
        }
        else {
            this.configDevelopment();
        }
    }
    get(variable) {
        console.log("getting", { variable });
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