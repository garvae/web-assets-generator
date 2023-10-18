"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDirRecursive = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const try_catch_wrapper_1 = require("./try-catch-wrapper");
/**
 * Removes a directory recursively
 */
const deleteDirRecursive = (props) => {
    const { directoryPathAbs, tryCatchOptions, } = props;
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => fs_1.default.rmSync(directoryPathAbs, { recursive: true }) }, tryCatchOptions));
};
exports.deleteDirRecursive = deleteDirRecursive;
