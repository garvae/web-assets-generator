"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleInfo = exports.consoleError = void 0;
/**
 * Extended console error message
 */
const consoleError = (message) => {
    if (typeof message === 'string' && message.length) {
        // eslint-disable-next-line no-console -- controlled rule cancellation
        console.error(message);
    }
};
exports.consoleError = consoleError;
/**
 * Extended console info message
 */
const consoleInfo = (message) => {
    if (typeof message === 'string' && message.length) {
        // eslint-disable-next-line no-console -- controlled rule cancellation
        console.info(message);
    }
};
exports.consoleInfo = consoleInfo;
