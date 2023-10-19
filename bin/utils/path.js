"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathResolve = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Extended path.resolve
 */
const pathResolve = (...paths) => path_1.default.resolve(...paths);
exports.pathResolve = pathResolve;
