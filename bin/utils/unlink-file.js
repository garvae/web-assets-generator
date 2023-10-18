"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkFile = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const try_catch_wrapper_1 = require("./try-catch-wrapper");
const unlinkFileFn = (props) => {
    const { file } = props;
    if (fs_1.default.existsSync(file)) {
        fs_1.default.unlinkSync(file);
    }
};
/**
 * Safe file unlink
 */
const unlinkFile = (props) => {
    const { tryCatchOptions } = props, rest = tslib_1.__rest(props, ["tryCatchOptions"]);
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => unlinkFileFn(rest) }, tryCatchOptions));
};
exports.unlinkFile = unlinkFile;
