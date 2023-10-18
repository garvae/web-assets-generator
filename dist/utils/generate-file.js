"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFile = exports.generateFileFn = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
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
    const { tryCatchOptions } = props, rest = tslib_1.__rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => (0, exports.generateFileFn)(rest) }, tryCatchOptions));
};
exports.generateFile = generateFile;
