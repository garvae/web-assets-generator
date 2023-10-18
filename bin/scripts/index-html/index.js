"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtmlIndex = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const generate_file_1 = require("../../utils/generate-file");
const template_1 = require("./html-template/template");
/**
 * Generates index.html main template
 */
const generateHtmlIndex = (props) => {
    const { ctx, faviconMarkups, } = props;
    const { config, indexHtml, names, paths, } = ctx;
    const INDEX_HTML_PATH = path_1.default.resolve(paths.outputLib, names.files.indexHtml);
    const tokens = Object.assign(Object.assign({}, config.assets.indexHtml.tokensMeta), { preLoaderText: indexHtml.preLoader.text });
    let indexHtmlRaw = (0, template_1.generateTemplate)({
        faviconMarkups,
        preLoader: config.assets.indexHtml.preLoader,
    });
    Object
        .entries(tokens)
        .forEach(([key, value]) => {
        indexHtmlRaw = indexHtmlRaw.replaceAll(`{{tokens.${key}}}`, value);
    });
    (0, generate_file_1.generateFile)({
        content: indexHtmlRaw,
        targetPath: INDEX_HTML_PATH,
        tryCatchOptions: { errMessageTitle: 'An error occurred while generating html index template temp file' },
    });
};
exports.generateHtmlIndex = generateHtmlIndex;
