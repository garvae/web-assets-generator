"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../defaults/config");
const console_1 = require("../utils/console");
const deep_merge_safe_1 = require("../utils/deep-merge-safe");
const ensure_directory_exists_1 = require("../utils/ensure-directory-exists");
const path_1 = require("../utils/path");
const string_1 = require("../utils/string");
const throw_error_1 = require("../utils/throw-error");
/**
 * Resolves a path from a user root
 */
const getPathAbsFromUserRoot = (p, rootUser) => {
    let pathAbs = p;
    if ((0, string_1.isStringAndNotEmpty)(pathAbs)) {
        pathAbs = (0, path_1.pathResolve)(rootUser, pathAbs);
        if (fs_1.default.existsSync(pathAbs)) {
            return pathAbs;
        }
        (0, console_1.consoleError)(`The path ${pathAbs} doesn't exists`);
    }
    return '';
};
/**
 * Mapping config
 */
const mapConfig = (props) => {
    const { configPath, errBase, rootUser, } = props;
    const config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8'));
    if (!config) {
        (0, throw_error_1.throwError)(errBase);
        return;
    }
    if (!Object.keys(config).length) {
        (0, throw_error_1.throwError)(`${errBase}: config is empty`);
        return;
    }
    const configMapped = (0, deep_merge_safe_1.deepMergeSafe)({
        attachable: [config],
        original: config_1.APP_CONFIG_DEFAULTS,
    });
    const resolver = (p) => getPathAbsFromUserRoot(p, rootUser);
    const outputDir = (0, path_1.pathResolve)(rootUser, configMapped.outputDir);
    (0, ensure_directory_exists_1.ensureDirectoryExists)({ pathAbs: outputDir });
    const { tokensMeta } = configMapped.assets.indexHtml;
    return Object.assign(Object.assign({}, configMapped), { assets: Object.assign(Object.assign({}, configMapped.assets), { favicon: Object.assign(Object.assign({}, configMapped.assets.favicon), { input: resolver(configMapped.assets.favicon.input) }), indexHtml: Object.assign(Object.assign({}, configMapped.assets.indexHtml), { metaCoverSocials: resolver(configMapped.assets.indexHtml.metaCoverSocials), tokensMeta: Object.assign(Object.assign({}, tokensMeta), { msapplicationNavbuttonColor: (0, string_1.getColorHexaOrEmptyStr)(tokensMeta.msapplicationNavbuttonColor), msapplicationTileColor: (0, string_1.getColorHexaOrEmptyStr)(tokensMeta.msapplicationTileColor), themeColor: (0, string_1.getColorHexaOrEmptyStr)(tokensMeta.themeColor) }) }) }), outputDir, tokensMain: Object.assign(Object.assign({}, configMapped.tokensMain), { appPlaceholderBackgroundColor: (0, string_1.getColorHexaOrEmptyStr)(configMapped.tokensMain.appPlaceholderBackgroundColor), msapplicationTileColor: (0, string_1.getColorHexaOrEmptyStr)(configMapped.tokensMain.msapplicationTileColor), themeColor: (0, string_1.getColorHexaOrEmptyStr)(configMapped.tokensMain.themeColor) }) });
};
exports.mapConfig = mapConfig;
