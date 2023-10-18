"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
/**
 * Utility to generate an error and avoid warning messages from the IDE
 *
 * {@link https://stackoverflow.com/questions/47015693/how-to-fix-throw-of-exception-caught-locally Read more}
 */
const generate_error_message_1 = require("./generate-error-message");
const throwError = (err) => {
    let m = 'Something went wrong';
    if (err) {
        m = (0, generate_error_message_1.generateErrorMessage)({ err });
    }
    // eslint-disable-next-line @typescript-eslint/no-throw-literal -- the message already formatted
    throw m;
};
exports.throwError = throwError;
