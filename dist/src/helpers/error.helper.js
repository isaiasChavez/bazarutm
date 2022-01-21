"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorService {
    constructor(className) {
        this.className = className.constructor.name;
    }
    validationHandler(trigger, error, message) {
        let errorString = `${trigger} - The following fields have irregularities:`;
        error.map((error) => {
            errorString += `- ${error.property}: `;
            for (const key in error.constraints)
                errorString += ` ${key} `;
            errorString += ` - `;
        });
        console.log({ errorString });
        return errorString;
    }
    genericHandler(trigger, error, message) {
        return this.genericHandlerDevelopment(trigger, error, message);
    }
    genericHandlerDevelopment(trigger, error, message) {
        const realMessage = message ? message : error.message;
        console.log('===========');
        console.log(`${realMessage} | An error has occurred on: ${this.className} - ${trigger} `);
        console.log('===========');
        return realMessage;
    }
    genericHandlerProduction(trigger, message, error) { }
    serviceHandler(trigger, message) {
        console.log('**********');
        console.log(`${message} | An error has occurred on: ${this.className} - ${trigger} `);
        console.log('===========');
        return message;
    }
}
exports.default = ErrorService;
//# sourceMappingURL=error.helper.js.map