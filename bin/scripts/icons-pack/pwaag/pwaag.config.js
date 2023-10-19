"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePWAAGConfig = void 0;
const string_1 = require("../../../utils/string");
const generatePWAAGConfig = (ctx) => {
    const { config, plugins, } = ctx;
    const { pwaag } = plugins;
    const PWA_ASSET_GENERATOR_COMMAND_OPTIONS = [
        '--mstile true',
        '--xhtml true',
        '--maskable false',
        '--log false',
    ];
    const themeColor = config.tokensMain.themeColor;
    const pathOverride = pwaag.paths.override;
    const index = pwaag.paths.indexHtml;
    const type = pwaag.img.extension;
    if ((0, string_1.isStringAndNotEmpty)(themeColor)) {
        PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--background ${themeColor}`);
    }
    if ((0, string_1.isStringAndNotEmpty)(pathOverride)) {
        PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--path-override "${pathOverride}"`);
    }
    if ((0, string_1.isStringAndNotEmpty)(index)) {
        PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--index "${index}"`);
    }
    if ((0, string_1.isStringAndNotEmpty)(type)) {
        PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--type ${type}`);
    }
    return `npx --yes pwa-asset-generator "${config.assets.favicon.input}" "${pwaag.paths.output}" ${PWA_ASSET_GENERATOR_COMMAND_OPTIONS.join(' ')}`;
};
exports.generatePWAAGConfig = generatePWAAGConfig;
