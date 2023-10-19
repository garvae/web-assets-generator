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
exports.readDirFiles = exports.readDirFilesFn = void 0;
/**
 * Get List of all files in a directory
 */
const fs_1 = __importDefault(require("fs"));
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
    const { tryCatchOptions } = props, rest = __rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => (0, exports.readDirFilesFn)(rest) }, tryCatchOptions));
};
exports.readDirFiles = readDirFiles;
