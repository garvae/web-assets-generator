"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.realFaviconCleanTemp = exports.realFaviconUpdatePublicManifest = exports.realFaviconCopyBrowserConfig = exports.realFaviconCopyImages = void 0;
const fs_1 = __importDefault(require("fs"));
const delete_dir_recursive_1 = require("../../../utils/delete-dir-recursive");
const list_dir_files_1 = require("../../../utils/list-dir-files");
const replace_file_1 = require("../../../utils/replace-file");
const realFaviconCopyImages = (ctx) => {
    var _a;
    const { realfavicon } = ctx.plugins;
    const { output } = realfavicon.paths;
    const generatedFilesList = (_a = (0, list_dir_files_1.readDirFiles)({
        dirPath: output,
        tryCatchOptions: { throwErr: true },
    })) === null || _a === void 0 ? void 0 : _a.map(file => file.name);
    const imagesList = generatedFilesList === null || generatedFilesList === void 0 ? void 0 : generatedFilesList.filter(file => realfavicon.img.extensionsRegExp.find(re => re.test(file)));
    imagesList === null || imagesList === void 0 ? void 0 : imagesList.forEach(file => fs_1.default.copyFileSync(`${output}/${file}`, `${ctx.paths.outputLibAssetsImages}/${file}`));
};
exports.realFaviconCopyImages = realFaviconCopyImages;
const realFaviconCopyBrowserConfig = (ctx) => {
    const { realfavicon } = ctx.plugins;
    const { browserconfig } = realfavicon.names.files;
    fs_1.default.copyFileSync(`${realfavicon.paths.output}/${browserconfig}`, `${ctx.paths.outputLib}/${ctx.names.files.browserconfig}`);
};
exports.realFaviconCopyBrowserConfig = realFaviconCopyBrowserConfig;
const realFaviconUpdatePublicManifest = (ctx) => {
    const fileManifestPublicPath = `${ctx.paths.outputLib}/${ctx.names.files.manifestPublic}`;
    const { realfavicon } = ctx.plugins;
    const images = JSON.parse(fs_1.default.readFileSync(`${realfavicon.paths.output}/${realfavicon.names.files.manifest}`, 'utf-8')).icons;
    const manifestPublic = JSON.parse(fs_1.default.readFileSync(fileManifestPublicPath, 'utf-8'));
    const manifestUpdatedJson = Object.assign(Object.assign({}, manifestPublic), { icons: images });
    const manifestUpdated = JSON.stringify(manifestUpdatedJson, null, 2);
    (0, replace_file_1.replaceFile)({
        content: manifestUpdated,
        file: fileManifestPublicPath,
        tryCatchOptions: { throwErr: true },
    });
};
exports.realFaviconUpdatePublicManifest = realFaviconUpdatePublicManifest;
const realFaviconCleanTemp = (ctx) => {
    if (!fs_1.default.existsSync(ctx.plugins.realfavicon.paths.output)) {
        return;
    }
    (0, delete_dir_recursive_1.deleteDirRecursive)({
        directoryPathAbs: ctx.plugins.realfavicon.paths.output,
        tryCatchOptions: { errMessageTitle: 'realFaviconCleanTemp - deleteFolderRecursive' },
    });
};
exports.realFaviconCleanTemp = realFaviconCleanTemp;
