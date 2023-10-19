"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDirRecursive = void 0;
const fs_1 = __importDefault(require("fs"));
const try_catch_wrapper_1 = require("./try-catch-wrapper");
/**
 * Removes a directory recursively
 */
const deleteDirRecursive = (props) => {
    const { directoryPathAbs, tryCatchOptions, } = props;
    return (0, try_catch_wrapper_1.tryCatchWrapper)(Object.assign({ fn: () => fs_1.default.rmSync(directoryPathAbs, { recursive: true }) }, tryCatchOptions));
};
exports.deleteDirRecursive = deleteDirRecursive;
