"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showConsoleError = void 0;
const tslib_1 = require("tslib");
/**
 * Generate and show console.error message
 *
 * @param props
 */
const console_1 = require("./console");
const generate_error_message_1 = require("./generate-error-message");
/**
 * Extended console.log
 *
 * @param props
 */
const showConsoleError = (props) => {
    const { noLogs = true } = props, rest = tslib_1.__rest(props, ["noLogs"]);
    if (!noLogs) {
        (0, console_1.consoleError)((0, generate_error_message_1.generateErrorMessage)(rest));
    }
};
exports.showConsoleError = showConsoleError;
