"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFile = exports.replaceFileFn = void 0;
const tslib_1 = require("tslib");
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
    const { tryCatchOptions } = props, rest = tslib_1.__rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => (0, exports.replaceFileFn)(rest) }, tryCatchOptions));
};
exports.replaceFile = replaceFile;
