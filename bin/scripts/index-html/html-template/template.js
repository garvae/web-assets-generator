"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = void 0;
const string_1 = require("../../../utils/string");
const pre_loader_1 = require("./html-chunks/body/pre-loader");
const global_1 = require("./html-chunks/meta/global");
const per_page_1 = require("./html-chunks/meta/per-page");
/**
 * Main index.html template
 */
const generateTemplate = (props) => {
    const { faviconMarkups, preLoader, } = props;
    let preLoaderContent = '';
    let faviconMarkupsContent = '';
    if (preLoader) {
        preLoaderContent = `<!-- pre-loader -->\n${pre_loader_1.HTML_INDEX_TEMPLATE_PRE_LOADER}`;
    }
    if ((0, string_1.isStringAndNotEmpty)(faviconMarkups)) {
        faviconMarkupsContent = `<!-- META FAVICON -->\n${faviconMarkups}`;
    }
    return `
<!DOCTYPE html>
<html lang="{{tokens.htmlLang}}">
    <!-- eslint-disable-next-line @html-eslint/require-title -- The <title> will be added from "html meta chunks" -->
    <head>
        <!-- META GLOBAL -->
        ${global_1.HTML_INDEX_TEMPLATE_META_GLOBAL}
        
        <!-- META FOR EACH SPECIFIC PAGE -->
        ${per_page_1.HTML_INDEX_TEMPLATE_PER_PAGE}
        
        ${faviconMarkupsContent}
    </head>
    <body>
        ${preLoaderContent}
    </body>
</html>
`;
};
exports.generateTemplate = generateTemplate;
