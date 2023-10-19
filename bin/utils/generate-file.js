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
exports.generateFile = exports.generateFileFn = void 0;
const fs_1 = __importDefault(require("fs"));
const ensure_directory_exists_1 = require("./ensure-directory-exists");
const try_catch_wrapper_1 = require("./try-catch-wrapper");
const unlink_file_1 = require("./unlink-file");
const generateFileFn = (props) => {
    const { content, noEmptyLineStart = true, targetPath, } = props;
    (0, unlink_file_1.unlinkFile)({ file: targetPath });
    let c = content;
    if (noEmptyLineStart && c.startsWith('\n')) {
        c = c.replace('\n', '');
    }
    (0, ensure_directory_exists_1.ensureFileDirectoryExists)({ pathAbs: targetPath });
    fs_1.default.writeFileSync(targetPath, c, 'utf8');
};
exports.generateFileFn = generateFileFn;
/**
 * Generates file
 */
const generateFile = (props) => {
    const { tryCatchOptions } = props, rest = __rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => (0, exports.generateFileFn)(rest) }, tryCatchOptions));
};
exports.generateFile = generateFile;
