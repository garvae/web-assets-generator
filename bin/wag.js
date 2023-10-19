"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAG = void 0;
const path_1 = __importDefault(require("path"));
const generators_1 = require("./scripts/generators");
const icons_pack_1 = require("./scripts/icons-pack");
const comment_empty_tags_1 = require("./scripts/index-html/comment-empty-tags");
const map_config_1 = require("./scripts/map-config");
const meta_cover_socials_1 = require("./scripts/meta-cover-socials");
const delete_dir_recursive_1 = require("./utils/delete-dir-recursive");
const execute_1 = require("./utils/execute");
const string_1 = require("./utils/string");
const throw_error_1 = require("./utils/throw-error");
/**
 * Main WEB-assets-generator function
 */
const WAG = (props) => {
    const { configPath, rootUser, } = props;
    if ((0, string_1.isStringAndNotEmpty)(configPath) && (0, string_1.isStringAndNotEmpty)(rootUser)) {
        const VAR_APP_USER_ROOT = path_1.default.resolve(rootUser, 'web-assets-generator');
        const VAR_APP_ROOT = path_1.default.resolve(path_1.default.dirname(__filename), '../');
        const VAR_APP_LIB_DIR = path_1.default.resolve(VAR_APP_ROOT, 'bin');
        const VAR_APP_LIB_DIR_SCRIPTS = path_1.default.resolve(VAR_APP_LIB_DIR, 'scripts');
        const VAR_APP_LIB_DIR_SCRIPTS_ICONS_PACK = path_1.default.resolve(VAR_APP_LIB_DIR_SCRIPTS, 'icons-pack');
        const VAR_APP_OUTPUT_PATH_ASSETS_RELATIVE = './assets';
        const VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE = `${VAR_APP_OUTPUT_PATH_ASSETS_RELATIVE}/images`;
        const VAR_APP_OUTPUT_PATH_ASSETS_ABSOLUTE = path_1.default.resolve(VAR_APP_USER_ROOT, VAR_APP_OUTPUT_PATH_ASSETS_RELATIVE);
        const VAR_APP_PLUGINS_TEMP = path_1.default.resolve(VAR_APP_USER_ROOT, 'temp');
        const VAR_APP_PLUGIN_PWAAG_NAME = 'pwaag';
        const VAR_APP_PLUGIN_PWAAG_IMAGES_EXTENSION = 'png';
        const VAR_APP_PLUGIN_PWAAG_DIR_ROOT = path_1.default.resolve(VAR_APP_LIB_DIR_SCRIPTS_ICONS_PACK, VAR_APP_PLUGIN_PWAAG_NAME);
        const VAR_APP_PLUGIN_PWAAG_DIR_OUTPUT = path_1.default.resolve(VAR_APP_PLUGINS_TEMP, VAR_APP_PLUGIN_PWAAG_NAME);
        const VAR_APP_PLUGIN_REALFAVICON_NAME = 'real-favicon';
        /**
         * A file with this name is generated by the real-favicon plugin
         */
        const VAR_APP_PLUGIN_REALFAVICON_HTML_INDEX = 'html_code.html';
        const VAR_APP_PLUGIN_REALFAVICON_IMAGES_EXTENSIONS = [
            'png',
            'svg',
            'ico',
        ];
        const VAR_APP_PLUGIN_REALFAVICON_DIR_ROOT = path_1.default.resolve(VAR_APP_LIB_DIR_SCRIPTS_ICONS_PACK, VAR_APP_PLUGIN_REALFAVICON_NAME);
        const VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT = path_1.default.resolve(VAR_APP_PLUGINS_TEMP, VAR_APP_PLUGIN_REALFAVICON_NAME);
        const VAR_APP_FILE_NAME_HTML_INDEX = 'index.html';
        /**
         * APP context base
         */
        const CTX_BASE = {
            faviconName: 'favicon.ico',
            indexHtml: { preLoader: { text: 'Loading...' } },
            names: { files: {
                    browserconfig: 'browserconfig.xml',
                    indexHtml: VAR_APP_FILE_NAME_HTML_INDEX,
                    manifestPublic: 'manifest.json',
                    metaCoverSocial: 'meta-cover-socials.jpg',
                } },
            outputImgsExtensionPreferred: 'png',
            paths: {
                indexHtml: path_1.default.resolve(VAR_APP_USER_ROOT, VAR_APP_FILE_NAME_HTML_INDEX),
                outputLib: VAR_APP_USER_ROOT,
                outputLibAssets: VAR_APP_OUTPUT_PATH_ASSETS_ABSOLUTE,
                outputLibAssetsImages: path_1.default.resolve(VAR_APP_USER_ROOT, VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE),
                rootLib: VAR_APP_ROOT,
                rootUser,
            },
            plugins: {
                pwaag: {
                    img: {
                        extension: VAR_APP_PLUGIN_PWAAG_IMAGES_EXTENSION,
                        extensionRegExp: new RegExp(`.${VAR_APP_PLUGIN_PWAAG_IMAGES_EXTENSION}$`),
                    },
                    name: VAR_APP_PLUGIN_PWAAG_NAME,
                    paths: {
                        indexHtml: path_1.default.resolve(VAR_APP_PLUGIN_PWAAG_DIR_OUTPUT, 'index.html'),
                        output: VAR_APP_PLUGIN_PWAAG_DIR_OUTPUT,
                        override: VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE,
                        root: VAR_APP_PLUGIN_PWAAG_DIR_ROOT,
                    },
                },
                realfavicon: {
                    img: { extensionsRegExp: VAR_APP_PLUGIN_REALFAVICON_IMAGES_EXTENSIONS.map(re => new RegExp(`.${re}$`)) },
                    name: VAR_APP_PLUGIN_REALFAVICON_NAME,
                    names: { files: {
                            androidIconsFilenamesBase: 'android-chrome',
                            androidIconsFilenamesRegExpSize: /\d+x\d+/g,
                            browserconfig: 'browserconfig.xml',
                            indexHtml: VAR_APP_PLUGIN_REALFAVICON_HTML_INDEX,
                            manifest: 'site.webmanifest',
                        } },
                    paths: {
                        config: path_1.default.resolve(VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT, 'config.json'),
                        indexHtml: path_1.default.resolve(VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT, VAR_APP_PLUGIN_REALFAVICON_HTML_INDEX),
                        output: VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT,
                        outputDataFile: path_1.default.resolve(VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT, 'data.json'),
                        override: VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE,
                        root: VAR_APP_PLUGIN_REALFAVICON_DIR_ROOT,
                    },
                },
            },
        };
        const errBase = `Something went wrong while reading ${configPath}`;
        /**
         * ----------------------------------------------------------------
         * Mapping config
         * ----------------------------------------------------------------
         */
        const configMapped = (0, map_config_1.mapConfig)({
            configPath,
            errBase,
            rootUser: CTX_BASE.paths.rootUser,
        });
        if (!configMapped) {
            (0, throw_error_1.throwError)(errBase);
            return;
        }
        /**
         * APP context
         */
        const CTX = Object.assign(Object.assign({}, CTX_BASE), { config: configMapped });
        const cleanup = () => {
            (0, delete_dir_recursive_1.deleteDirRecursive)({
                directoryPathAbs: CTX.paths.outputLib,
                tryCatchOptions: {
                    errMessageTitle: 'Removing old generated files',
                    throwErr: false,
                },
            });
        };
        try {
            /**
             * ----------------------------------------------------------------
             * Old files removing
             * ----------------------------------------------------------------
             */
            cleanup();
            /**
             * Web and frameworks assets generating
             */
            (0, generators_1.generateWebAndFrameworksSecondaryAssets)(CTX);
            /**
             * Copy meta-cover-socials.js
             */
            (0, meta_cover_socials_1.checkMetaCoverSocials)(CTX);
            /**
             * Generating favicon bundle
             */
            (0, icons_pack_1.generateFaviconBundle)(CTX);
            /**
             * Finds and comments meta tags with empty content
             */
            (0, comment_empty_tags_1.commentEmptyTags)(CTX);
            /**
             * Clean temp
             */
            (0, delete_dir_recursive_1.deleteDirRecursive)({ directoryPathAbs: VAR_APP_PLUGINS_TEMP });
            /**
             * Format public dir using prettier
             */
            (0, execute_1.execute)(`npx prettier ${CTX.paths.outputLib} --write`);
        }
        catch (err) {
            cleanup();
            (0, throw_error_1.throwError)(err);
        }
    }
};
exports.WAG = WAG;
