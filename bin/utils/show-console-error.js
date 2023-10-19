"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showConsoleError = void 0;
/**
 * Generate and show console.error message
 *
 * @param props
 */
const console_1 = require("./console");
const generate_error_message_1 = require("./generate-error-message");
/**
 * Extended console.error
 *
 * @param props
 */
const showConsoleError = (props) => {
    const { noLogs = true } = props, rest = __rest(props, ["noLogs"]);
    if (!noLogs) {
        (0, console_1.consoleError)((0, generate_error_message_1.generateErrorMessage)(rest));
    }
};
exports.showConsoleError = showConsoleError;
