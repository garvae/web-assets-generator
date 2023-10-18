"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDirFiles = exports.readDirFilesFn = void 0;
const tslib_1 = require("tslib");
/**
 * Get List of all files in a directory
 */
const fs_1 = tslib_1.__importDefault(require("fs"));
const try_catch_wrapper_1 = require("./try-catch-wrapper");
const readDirFilesFn = (props) => {
    const { dirPath } = props;
    return fs_1.default.readdirSync(dirPath, { withFileTypes: true });
};
exports.readDirFilesFn = readDirFilesFn;
/**
 * Runs files generators
 */
const readDirFiles = (props) => {
    const { tryCatchOptions } = props, rest = tslib_1.__rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => (0, exports.readDirFilesFn)(rest) }, tryCatchOptions));
};
exports.readDirFiles = readDirFiles;
