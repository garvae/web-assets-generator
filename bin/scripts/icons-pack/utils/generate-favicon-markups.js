"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFaviconMarkups = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const list_dir_files_1 = require("../../../utils/list-dir-files");
const vars_1 = require("../../../vars");
const regAppleMobileWebAppTitle = /<meta name="apple-mobile-web-app-title".*/gm;
const regAppleTouchIcon = /<link rel="apple-touch-icon".*/gm;
const regAppleTouchStartupImage = /<link rel="apple-touch-startup-image".*/gm;
const regApplicationName = /<meta name="application-name".*/gm;
const regExpManifest = /<link rel="manifest".*/gm;
const regMsapplicationConfig = /<meta name="msapplication-config".*/gm;
const REG_EXPS_TO_REMOVE_REAL_FAVICON = [
    regAppleMobileWebAppTitle,
    regAppleTouchIcon,
    regAppleTouchStartupImage,
    regApplicationName,
    regExpManifest,
    regMsapplicationConfig,
];
const REG_EXP_APPLE_MOBILE_WEB_APP_CAPABLE = /<meta name="apple-mobile-web-app-capable".*/gm;
const REG_EXPS_TO_REMOVE_PWAAG = [REG_EXP_APPLE_MOBILE_WEB_APP_CAPABLE];
const REG_EXP_META = /<meta.*/gm;
const REG_EXP_LINK = /<link.*/gm;
const REG_EXPS_TO_PICK_PWAAG = [REG_EXP_META, REG_EXP_LINK];
/**
 * Inject the favicon markups in the main HTML page.
 */
const generateFaviconMarkups = (props) => {
    var _a, _b, _c, _d, _e;
    const { configRealfavicon, ctx, } = props;
    const { pwaag, realfavicon, } = ctx.plugins;
    const { androidIconsFilenamesBase } = realfavicon.names.files;
    const { override } = realfavicon.paths;
    const codeRaw = (_b = (_a = JSON.parse(fs_1.default.readFileSync(realfavicon.paths.outputDataFile, 'utf-8'))) === null || _a === void 0 ? void 0 : _a.favicon) === null || _b === void 0 ? void 0 : _b.html_code;
    const metaFromRealFavicon = (_e = (_d = (_c = codeRaw === null || codeRaw === void 0 ? void 0 : codeRaw.split(vars_1.LINES_SEPARATOR_REGEXP)) === null || _c === void 0 ? void 0 : _c.filter(line => !REG_EXPS_TO_REMOVE_REAL_FAVICON.find(re => re.test(line)))) === null || _d === void 0 ? void 0 : _d.join(vars_1.LINES_SEPARATOR)) !== null && _e !== void 0 ? _e : '';
    const realFaviconFilesList = (0, list_dir_files_1.readDirFiles)({
        dirPath: realfavicon.paths.output,
        tryCatchOptions: { errMessageTitle: 'Error in "generateFaviconMarkups"' },
    });
    /**
     * Specifies the icon to be used for the home screen shortcut
     * on Android devices with a high-density display.
     */
    const androidChromeIcons = (Array.isArray(realFaviconFilesList) ? realFaviconFilesList : [])
        .filter(file => file.name.startsWith(androidIconsFilenamesBase))
        .map(file => {
        var _a;
        const size = (_a = realfavicon.names.files.androidIconsFilenamesRegExpSize.exec(file.name)) === null || _a === void 0 ? void 0 : _a[0];
        if (size) {
            return size;
        }
        return undefined;
    })
        .filter(Boolean)
        .map(iconSize => `<link rel="icon" type="image/png" sizes="${iconSize}" href="${override}/${androidIconsFilenamesBase}-${iconSize}.${ctx.outputImgsExtensionPreferred}">`)
        .join(vars_1.LINES_SEPARATOR);
    /**
     * specifies the icon to be used in the browser tab and bookmarks
     */
    const faviconMain = `<link rel="icon" type="image/x-icon" href="${override}/${ctx.faviconName}">`;
    /**
     * Meta received from pwa-asset-generator
     */
    const pwaagMetaRaw = fs_1.default.readFileSync(pwaag.paths.indexHtml, 'utf-8');
    const pwaagMeta = pwaagMetaRaw
        .split(vars_1.LINES_SEPARATOR)
        .filter(line => {
        const lineTrimmed = line.trim();
        const isValidToPick = REG_EXPS_TO_PICK_PWAAG.find(re => re.test(lineTrimmed));
        const isValidToSkip = REG_EXPS_TO_REMOVE_PWAAG.find(re => re.test(lineTrimmed));
        return isValidToPick && !isValidToSkip;
    })
        .join(vars_1.LINES_SEPARATOR);
    return [
        faviconMain,
        metaFromRealFavicon,
        androidChromeIcons,
        pwaagMeta,
    ].join(vars_1.LINES_SEPARATOR);
};
exports.generateFaviconMarkups = generateFaviconMarkups;
