"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentEmptyTags = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const generate_file_1 = require("../../utils/generate-file");
const unlink_file_1 = require("../../utils/unlink-file");
const vars_1 = require("../../vars");
const template_1 = require("./html-template/template");
const REG_EXP_META = /<meta.*/gm;
const REG_EXP_LINK = /<link.*/gm;
const REG_EXPS_TO_CHECK = [REG_EXP_META, REG_EXP_LINK];
const TAG_TITLE = '<title></title>';
const ATTRS = [
    'content',
    'title',
    'href',
];
const QUOTES = ['\'', '"'];
const CONTENT_TO_CHECK = QUOTES.flatMap(q => ATTRS.map(a => `${a}=${q}${q}`));
const MESSAGE_INCOMPLETE_TAG = 'The following tag contains incomplete content. Please check this tag before uncommenting it.';
/**
 * Finds and comments meta tags with empty content
 */
const commentEmptyTags = (ctx) => {
    const indexHtmlPath = ctx.paths.indexHtml;
    const htmlRaw = fs_1.default.existsSync(indexHtmlPath) ? fs_1.default.readFileSync(indexHtmlPath, 'utf-8') : (0, template_1.generateTemplate)({
        faviconMarkups: '',
        preLoader: ctx.config.assets.indexHtml.preLoader,
    });
    const html = htmlRaw
        .split(vars_1.LINES_SEPARATOR_REGEXP)
        .map(line => {
        const lineTrimmed = line.trim();
        const isCommented = lineTrimmed.startsWith('<!--');
        const isInvalidTagTitle = lineTrimmed.includes(TAG_TITLE);
        const isInvalidTag = REG_EXPS_TO_CHECK.find(r => r.test(lineTrimmed)) && CONTENT_TO_CHECK.find(c => lineTrimmed.includes(c));
        if (!isCommented && (isInvalidTagTitle || isInvalidTag)) {
            return `<!-- ${MESSAGE_INCOMPLETE_TAG} -->\n<!-- ${lineTrimmed} -->`;
        }
        return line;
    })
        .join(vars_1.LINES_SEPARATOR);
    (0, unlink_file_1.unlinkFile)({ file: indexHtmlPath });
    (0, generate_file_1.generateFile)({
        content: html,
        targetPath: indexHtmlPath,
        tryCatchOptions: { errMessageTitle: `commentEmptyTags. An error occurred while generating ${indexHtmlPath}` },
    });
};
exports.commentEmptyTags = commentEmptyTags;
