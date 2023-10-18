"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWAAGCleanTemp = exports.PWAAGCopyImages = exports.generatePWAAGHtml = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const delete_dir_recursive_1 = require("../../../utils/delete-dir-recursive");
const generate_file_1 = require("../../../utils/generate-file");
const list_dir_files_1 = require("../../../utils/list-dir-files");
const index_base_1 = require("../index-base");
const generatePWAAGHtml = (ctx) => {
    const { pwaag } = ctx.plugins;
    const { indexHtml } = pwaag.paths;
    (0, generate_file_1.generateFile)({
        content: index_base_1.ICONS_PACK_INDEX_HTML_BASE_TEMPLATE,
        targetPath: indexHtml,
        tryCatchOptions: { errMessageTitle: 'generatePWAAGHtml. An error occurred while preparing files for the PWAAG plugin' },
    });
};
exports.generatePWAAGHtml = generatePWAAGHtml;
const PWAAGCopyImages = (ctx) => {
    var _a;
    const { pwaag } = ctx.plugins;
    const { output } = pwaag.paths;
    const generatedFilesList = (_a = (0, list_dir_files_1.readDirFiles)({ dirPath: output })) === null || _a === void 0 ? void 0 : _a.map(file => file.name);
    const imagesList = generatedFilesList === null || generatedFilesList === void 0 ? void 0 : generatedFilesList.filter(file => pwaag.img.extensionRegExp.test(file));
    imagesList === null || imagesList === void 0 ? void 0 : imagesList.forEach(file => fs_1.default.copyFileSync(`${output}/${file}`, `${ctx.paths.outputLibAssetsImages}/${file}`));
};
exports.PWAAGCopyImages = PWAAGCopyImages;
const PWAAGCleanTemp = (ctx) => {
    const { output } = ctx.plugins.pwaag.paths;
    if (!fs_1.default.existsSync(output)) {
        return;
    }
    (0, delete_dir_recursive_1.deleteDirRecursive)({
        directoryPathAbs: output,
        tryCatchOptions: { errMessageTitle: 'PWAAGCleanTemp - deleteFolderRecursive' },
    });
};
exports.PWAAGCleanTemp = PWAAGCleanTemp;
