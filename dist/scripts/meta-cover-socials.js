"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMetaCoverSocials = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const ensure_directory_exists_1 = require("../utils/ensure-directory-exists");
const string_1 = require("../utils/string");
/**
 * Copy meta-cover-socials.js
 */
const checkMetaCoverSocials = (props) => {
    const { config, names, paths, } = props;
    const { outputLib } = paths;
    if (config.assets.indexHtml.metaCoverSocials) {
        const fileInput = config.assets.indexHtml.metaCoverSocials;
        if (!(0, string_1.isStringAndNotEmpty)(fileInput)) {
            return;
        }
        const fileDest = `${outputLib}/assets/images/${names.files.metaCoverSocial}`;
        if (fs_1.default.existsSync(fileInput)) {
            (0, ensure_directory_exists_1.ensureFileDirectoryExists)({
                pathAbs: fileDest,
                tryCatchOptions: { errMessageTitle: 'Copy meta-cover-socials.js' },
            });
            fs_1.default.copyFileSync(fileInput, fileDest);
        }
    }
};
exports.checkMetaCoverSocials = checkMetaCoverSocials;
