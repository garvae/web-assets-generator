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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExists = exports.ensureFileDirectoryExists = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
    const { tryCatchOptions } = props, rest = __rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => ensureDirectoryExistsFn(Object.assign(Object.assign({}, rest), { isFile: true })) }, tryCatchOptions));
};
exports.ensureFileDirectoryExists = ensureFileDirectoryExists;
/**
 * Checks that the directory exists.
 */
const ensureDirectoryExists = (props) => {
    const { tryCatchOptions } = props, rest = __rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => ensureDirectoryExistsFn(Object.assign(Object.assign({}, rest), { isFile: false })) }, tryCatchOptions));
};
exports.ensureDirectoryExists = ensureDirectoryExists;
