#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const string_1 = require("./utils/string");
const throw_error_1 = require("./utils/throw-error");
const wag_1 = require("./wag");
/**
 * Config file name
 */
const VAR_APP_CONFIG_FILE_NAME_DEFAULT = 'wag.config.json';
/**
 * Show wag-runner error when some problems with provided config were found
 */
const getErrorNotFound = (props) => {
    const { passed } = props !== null && props !== void 0 ? props : {};
    let message = `Please specify valid path to the configuration file "${VAR_APP_CONFIG_FILE_NAME_DEFAULT}" in the CLI command`;
    if (!passed) {
        message = `${message}, or create the configuration file "${VAR_APP_CONFIG_FILE_NAME_DEFAULT}" in the directory where the CLI command was run.`;
    }
    return message;
};
/**
 * WEB-assets-generator runner
 */
(() => {
    const VAR_APP_ROOT_USER = process.cwd();
    const isDev = process.env.DEV === 'true';
    if (!(0, string_1.isStringAndNotEmpty)(VAR_APP_ROOT_USER)) {
        (0, throw_error_1.throwError)('A critical error occured while app running');
        return;
    }
    /**
     * CLI arguments
     */
    const ARGS = process.argv.slice(2);
    /**
     * Default WAG config path
     */
    const WAG_CONFIG_FILE_PATH_DEFAULT = path_1.default.resolve(VAR_APP_ROOT_USER, VAR_APP_CONFIG_FILE_NAME_DEFAULT);
    if (isDev || ARGS.length < 1) {
        if (!fs_1.default.existsSync(WAG_CONFIG_FILE_PATH_DEFAULT)) {
            (0, throw_error_1.throwError)(getErrorNotFound());
        }
        (0, wag_1.WAG)({
            configPath: WAG_CONFIG_FILE_PATH_DEFAULT,
            rootUser: VAR_APP_ROOT_USER,
        });
        return;
    }
    if (ARGS.length > 1) {
        (0, throw_error_1.throwError)('Only 1 argument expected');
    }
    const configFilePassed = ARGS[0];
    if (configFilePassed && fs_1.default.existsSync(configFilePassed)) {
        (0, wag_1.WAG)({
            configPath: `${VAR_APP_ROOT_USER}/${configFilePassed}`,
            rootUser: VAR_APP_ROOT_USER,
        });
        return;
    }
    (0, throw_error_1.throwError)(getErrorNotFound({ passed: true }));
})();
