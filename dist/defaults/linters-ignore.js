"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINTERS_IGNORE_DEFAULTS = void 0;
/**
 * @description The list of common paths which should be ignored by linters
 */
exports.LINTERS_IGNORE_DEFAULTS = [
    '**/__IGNORE__/**',
    './.DS_Store',
    './.git',
    './.gitignore',
    './.husky',
    './.idea',
    './dist',
    './node_modules',
    './npm-debug.log',
    './package-lock.json',
    './reports',
    './temp',
    './yarn.lock',
];
