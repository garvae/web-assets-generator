import { isStringAndNotEmpty } from '../../../utils/string';

import { HTML_INDEX_TEMPLATE_PRE_LOADER } from './html-chunks/body/pre-loader';
import { HTML_INDEX_TEMPLATE_META_GLOBAL } from './html-chunks/meta/global';
import { HTML_INDEX_TEMPLATE_PER_PAGE } from './html-chunks/meta/per-page';


export type TGenerateTemplate = {
  faviconMarkups: string;
  preLoader: boolean;
};

/**
 * Main index.html template
 */
export const generateTemplate = (props: TGenerateTemplate) => {

  const {
    faviconMarkups,
    preLoader,
  } = props;

  let preLoaderContent: string = '';
  let faviconMarkupsContent: string = '';

  if (preLoader) {
    preLoaderContent = `<!-- pre-loader -->\n${HTML_INDEX_TEMPLATE_PRE_LOADER}`;
  }

  if (isStringAndNotEmpty(faviconMarkups)) {
    faviconMarkupsContent = `<!-- META FAVICON -->\n${faviconMarkups}`;
  }

  return `
<!DOCTYPE html>
<html lang="{{tokens.htmlLang}}">
    <!-- eslint-disable-next-line @html-eslint/require-title -- The <title> will be added from "html meta chunks" -->
    <head>
        <!-- META GLOBAL -->
        ${HTML_INDEX_TEMPLATE_META_GLOBAL}
        
        <!-- META FOR EACH SPECIFIC PAGE -->
        ${HTML_INDEX_TEMPLATE_PER_PAGE}
        
        ${faviconMarkupsContent}
    </head>
    <body>
        ${preLoaderContent}
    </body>
</html>
`;
};
