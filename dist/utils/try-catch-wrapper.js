"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = void 0;
const show_console_error_1 = require("./show-console-error");
const throw_error_1 = require("./throw-error");
/**
 * Try-Catch wrapper with auto-log
 */
const tryCatchWrapper = (props) => {
    const { errMessageTitle, fn, noLogs, onError, throwErr = true, } = props;
    try {
        if (typeof fn === 'function') {
            return fn();
        }
        (0, throw_error_1.throwError)('Error in "tryCatchWrapper": provided "fn" is not a function');
    }
    catch (err) {
        if (throwErr) {
            throw err;
        }
        (0, show_console_error_1.showConsoleError)({
            err,
            errMessageTitle,
            noLogs,
        });
        if (typeof onError === 'function') {
            onError();
        }
    }
};
exports.tryCatchWrapper = tryCatchWrapper;
