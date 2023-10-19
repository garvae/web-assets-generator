"use strict";
/**
 * Automated process:
 * - complete favicon bundle generating
 * - browserconfig.xml generating
 * - manifest.json updating
 * - site.webmanifest generating
 * - manifest / favicon meta tags generating
 *
 * @author Garvae
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFaviconBundle = void 0;
const fs_1 = __importDefault(require("fs"));
const console_1 = require("../../utils/console");
const ensure_directory_exists_1 = require("../../utils/ensure-directory-exists");
const execute_1 = require("../../utils/execute");
const generate_file_1 = require("../../utils/generate-file");
const string_1 = require("../../utils/string");
const index_html_1 = require("../index-html");
const pwaag_config_1 = require("./pwaag/pwaag.config");
const pwaag_utils_1 = require("./pwaag/pwaag.utils");
const real_favicon_config_1 = require("./real-favicon/real-favicon.config");
const real_favicon_utils_1 = require("./real-favicon/real-favicon.utils");
const generate_favicon_markups_1 = require("./utils/generate-favicon-markups");
/**
 * Generating favicon bundle
 */
const generateFaviconBundle = (ctx) => {
    const { input: faviconInput } = ctx.config.assets.favicon;
    const output = ctx.paths.outputLib;
    const { pwaag, realfavicon, } = ctx.plugins;
    const realFaviconDataFile = realfavicon.paths.outputDataFile;
    const realFaviconOutput = realfavicon.paths.output;
    const realFaviconConfig = realfavicon.paths.config;
    if (!(0, string_1.isStringAndNotEmpty)(faviconInput)) {
        return;
    }
    const configRealfavicon = (0, real_favicon_config_1.generateRealfaviconConfig)(ctx);
    /**
     * Prepare
     */
    (0, ensure_directory_exists_1.ensureDirectoryExists)({ pathAbs: pwaag.paths.output });
    (0, ensure_directory_exists_1.ensureDirectoryExists)({ pathAbs: realfavicon.paths.output });
    /**
     * Prepare pwa-asset-generator plugin files
     */
    (0, pwaag_utils_1.generatePWAAGHtml)(ctx);
    /**
     * Run pwa-asset-generator
     */
    (0, console_1.consoleInfo)('The first asset generation tool has been launched. This may take a few seconds. Please wait...');
    (0, execute_1.execute)((0, pwaag_config_1.generatePWAAGConfig)(ctx));
    (0, console_1.consoleInfo)('The first asset generation tool has been completed. Asset generation continues, please wait...');
    /**
     * Copy files generated with pwa-asset-generator plugin
     */
    (0, pwaag_utils_1.PWAAGCopyImages)(ctx);
    /**
     * Generate the icons. This task takes a few seconds to complete.
     * You should run it at least once to create the icons. Then,
     * you should run it whenever RealFaviconGenerator updates its
     * package (see the "COMMAND_CHECK_FOR_FAVICON_UPDATES" task below).
     */
    (0, console_1.consoleInfo)('The second asset generation tool has been launched. This may take a few seconds. Please wait...');
    (0, generate_file_1.generateFile)({
        content: JSON.stringify(configRealfavicon),
        targetPath: realFaviconConfig,
        tryCatchOptions: { errMessageTitle: 'real-favicon. An error occurred while preparing config file for the real-favicon plugin' },
    });
    (0, execute_1.execute)(`real-favicon generate "${realFaviconConfig}" "${realFaviconDataFile}" "${realFaviconOutput}"`);
    (0, console_1.consoleInfo)('The second asset generation tool has been completed. Asset generation continues, please wait...');
    /**
     * Copy files generated with real-favicon plugin
     */
    (0, real_favicon_utils_1.realFaviconCopyBrowserConfig)(ctx);
    (0, real_favicon_utils_1.realFaviconCopyImages)(ctx);
    (0, real_favicon_utils_1.realFaviconUpdatePublicManifest)(ctx);
    /**
     * Generate webmanifest
     */
    const fileManifest = ctx.names.files.manifestPublic;
    const fileWebmanifest = ctx.plugins.realfavicon.names.files.manifest;
    try {
        fs_1.default.copyFileSync(`${output}/${fileManifest}`, `${output}/${fileWebmanifest}`);
    }
    catch (err) {
        (0, console_1.consoleError)(`
      Error while generating ${fileWebmanifest}
      Error: ${JSON.stringify(err)}
    `);
    }
    /**
     * Inject favicon markups from pwa-asset-generator and real-favicon plugins
     */
    const faviconMarkups = (0, generate_favicon_markups_1.generateFaviconMarkups)({
        configRealfavicon,
        ctx,
    });
    /**
     * Generate main index.html file
     */
    (0, index_html_1.generateHtmlIndex)({
        ctx,
        faviconMarkups,
    });
};
exports.generateFaviconBundle = generateFaviconBundle;
