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
exports.replaceFile = exports.replaceFileFn = void 0;
const generate_file_1 = require("./generate-file");
const try_catch_wrapper_1 = require("./try-catch-wrapper");
const unlink_file_1 = require("./unlink-file");
const replaceFileFn = (props) => {
    const { content, file, } = props;
    (0, unlink_file_1.unlinkFile)({ file });
    (0, generate_file_1.generateFile)({
        content,
        targetPath: file,
    });
};
exports.replaceFileFn = replaceFileFn;
/**
 * Runs files generators
 */
const replaceFile = (props) => {
    const { tryCatchOptions } = props, rest = __rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => (0, exports.replaceFileFn)(rest) }, tryCatchOptions));
};
exports.replaceFile = replaceFile;
