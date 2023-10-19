"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWebAndFrameworksSecondaryAssets = void 0;
/**
 * Web and frameworks assets generating
 */
const linters_ignore_1 = require("../../defaults/linters-ignore");
const generate_file_1 = require("../../utils/generate-file");
const licence_1 = require("./web/licence");
const manifest_1 = require("./web/manifest");
const robots_1 = require("./web/robots");
const search_xml_1 = require("./web/search-xml");
const generateWebAndFrameworksSecondaryAssets = (props) => {
    const { config, names, paths, } = props;
    const { outputLib } = paths;
    const outputLibFrameworks = `${outputLib}/frameworks`;
    const contentLintersIgnoreCommon = linters_ignore_1.LINTERS_IGNORE_DEFAULTS
        .join('\n')
        .replaceAll('\'', '');
    console.log('----------- contentLintersIgnoreCommon', contentLintersIgnoreCommon);
    console.log('----------- LINTERS_IGNORE_DEFAULTS', linters_ignore_1.LINTERS_IGNORE_DEFAULTS);
    /**
     * ----------------------------------------------------------------
     * Frameworks assets generating
     * ----------------------------------------------------------------
     */
    /**
     * Creates .eslintignore
     *
     * The purpose of this is WebStorm bug
     * when you manually configure files to watch in the WebStorm settings
     */
    if (config.assets.framework.eslintignore) {
        const content = contentLintersIgnoreCommon.replaceAll('"', '');
        const targetName = '.eslintignore';
        (0, generate_file_1.generateFile)({
            content,
            targetPath: `${outputLibFrameworks}/${targetName}`,
            tryCatchOptions: { errMessageTitle: `${targetName} generating` },
        });
    }
    /**
     * Creates .prettierignore
     *
     * The purpose of this is to automate the creation of core files
     */
    if (config.assets.framework.prettierignore) {
        const content = contentLintersIgnoreCommon.replaceAll('./', '');
        const targetName = '.prettierignore';
        (0, generate_file_1.generateFile)({
            content,
            targetPath: `${outputLibFrameworks}/${targetName}`,
            tryCatchOptions: { errMessageTitle: `${targetName} generating` },
        });
    }
    /**
     * ----------------------------------------------------------------
     * Web assets generating
     * ----------------------------------------------------------------
     */
    /**
     * Creates LICENCE
     */
    if (config.assets.license) {
        const targetName = 'LICENCE';
        (0, generate_file_1.generateFile)({
            content: (0, licence_1.generateLicense)({
                author: config.tokensMain.author,
                url: config.tokensMain.authorUrl,
                year: String(new Date().getFullYear()),
            }),
            targetPath: `${outputLib}/${targetName}`,
            tryCatchOptions: { errMessageTitle: `${targetName} generating` },
        });
    }
    /**
     * Creates MANIFEST
     */
    if (config.assets.manifest) {
        const targetName = names.files.manifestPublic;
        const manifest = (0, manifest_1.generateManifest)({
            background_color: config.tokensMain.appPlaceholderBackgroundColor,
            display: 'standalone',
            lang: config.tokensMain.language,
            name: config.tokensMain.title,
            short_name: config.tokensMain.name,
            start_url: config.tokensMain.startUrl,
            theme_color: config.tokensMain.themeColor,
        });
        (0, generate_file_1.generateFile)({
            content: JSON.stringify(manifest, null, 2),
            targetPath: `${outputLib}/${targetName}`,
            tryCatchOptions: { errMessageTitle: `${targetName} generating` },
        });
    }
    /**
     * robots
     */
    if (config.assets.robots) {
        const targetName = 'robots.txt';
        (0, generate_file_1.generateFile)({
            content: robots_1.Index,
            targetPath: `${outputLib}/${targetName}`,
            tryCatchOptions: { errMessageTitle: `${targetName} generating` },
        });
    }
    /**
     * search.xml
     */
    if (config.assets.searchXml) {
        const targetName = 'search.xml';
        (0, generate_file_1.generateFile)({
            content: (0, search_xml_1.generateSearchXml)({
                name: config.tokensMain.name,
                siteUrl: config.tokensMain.siteUrl,
            }),
            targetPath: `${outputLib}/${targetName}`,
            tryCatchOptions: { errMessageTitle: `${targetName} generating` },
        });
    }
};
exports.generateWebAndFrameworksSecondaryAssets = generateWebAndFrameworksSecondaryAssets;
