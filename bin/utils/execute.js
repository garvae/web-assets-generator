"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const child_process_1 = __importDefault(require("child_process"));
/**
 * Main CLI executor
 */
const execute = (cmd, options) => child_process_1.default.execSync(cmd, Object.assign({ stdio: 'inherit' }, (options !== null && options !== void 0 ? options : {})));
exports.execute = execute;
