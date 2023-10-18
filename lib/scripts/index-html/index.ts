import path from 'path';

import { TWagCtx } from '../../types';
import { generateFile } from '../../utils/generate-file';

import {
  generateTemplate,
  TGenerateTemplate, 
} from './html-template/template';

type TGenerateHtmlIndex = Pick<TGenerateTemplate, 'faviconMarkups'> & {
  ctx: TWagCtx;
};

/**
 * Generates index.html main template
 */
export const generateHtmlIndex = (props: TGenerateHtmlIndex) => {

  const {
    ctx,
    faviconMarkups,
  } = props;

  const {
    config,
    indexHtml,
    names,
    paths,
  } = ctx;

  const INDEX_HTML_PATH = path.resolve(paths.outputLib, names.files.indexHtml);

  const tokens = {
    ...config.assets.indexHtml.tokensMeta,
    preLoaderText: indexHtml.preLoader.text,
  };

  let indexHtmlRaw = generateTemplate({
    faviconMarkups,
    preLoader: config.assets.indexHtml.preLoader, 
  });

  Object
    .entries(tokens)
    .forEach(([ key, value ]) => {
      indexHtmlRaw = indexHtmlRaw.replaceAll(`{{tokens.${key}}}`, value);
    });

  generateFile({
    content: indexHtmlRaw,
    targetPath: INDEX_HTML_PATH,
    tryCatchOptions: { errMessageTitle: 'An error occurred while generating html index template temp file' },
  });
};

