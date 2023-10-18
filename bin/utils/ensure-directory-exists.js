"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExists = exports.ensureFileDirectoryExists = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const try_catch_wrapper_1 = require("./try-catch-wrapper");
const ensureDirectoryExistsFn = (props) => {
    const { isFile, pathAbs, } = props;
    if (!isFile) {
        if (!fs_1.default.existsSync(pathAbs)) {
            fs_1.default.mkdirSync(pathAbs, { recursive: true });
        }
        return;
    }
    const dirname = path_1.default.dirname(pathAbs);
    if (fs_1.default.existsSync(dirname)) {
        return;
    }
    ensureDirectoryExistsFn(Object.assign(Object.assign({}, props), { pathAbs: dirname }));
    fs_1.default.mkdirSync(dirname);
};
/**
 * Checks that the destination directory of the file exists.
 * Useful when using fs.CopyFileSync
 */
const ensureFileDirectoryExists = (props) => {
    const { tryCatchOptions } = props, rest = tslib_1.__rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => ensureDirectoryExistsFn(Object.assign(Object.assign({}, rest), { isFile: true })) }, tryCatchOptions));
};
exports.ensureFileDirectoryExists = ensureFileDirectoryExists;
/**
 * Checks that the directory exists.
 */
const ensureDirectoryExists = (props) => {
    const { tryCatchOptions } = props, rest = tslib_1.__rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => ensureDirectoryExistsFn(Object.assign(Object.assign({}, rest), { isFile: false })) }, tryCatchOptions));
};
exports.ensureDirectoryExists = ensureDirectoryExists;
