"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const tslib_1 = require("tslib");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
/**
 * Main CLI executor
 */
const execute = (cmd, options) => child_process_1.default.execSync(cmd, Object.assign({ stdio: 'inherit' }, (options !== null && options !== void 0 ? options : {})));
exports.execute = execute;
