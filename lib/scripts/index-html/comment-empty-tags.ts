import fs from 'fs';

import { TWagCtx } from '../../types';
import { generateFile } from '../../utils/generate-file';
import { unlinkFile } from '../../utils/unlink-file';
import {
  LINES_SEPARATOR,
  LINES_SEPARATOR_REGEXP,
} from '../../vars';

import { generateTemplate } from './html-template/template';

const REG_EXP_META = /<meta.*/gm;
const REG_EXP_LINK = /<link.*/gm;

const REG_EXPS_TO_CHECK = [ REG_EXP_META, REG_EXP_LINK ];

const TAG_TITLE = '<title></title>';

const ATTRS = [
  'content',
  'title',
  'href',
];

const QUOTES = [ '\'', '"' ];

const CONTENT_TO_CHECK = QUOTES.flatMap(q => ATTRS.map(a => `${a}=${q}${q}`));

const MESSAGE_INCOMPLETE_TAG = 'The following tag contains incomplete content. Please check this tag before uncommenting it.';

/**
 * Finds and comments meta tags with empty content
 */
export const commentEmptyTags = (ctx: TWagCtx) => {

  const indexHtmlPath = ctx.paths.indexHtml;

  const htmlRaw = fs.existsSync(indexHtmlPath) ? fs.readFileSync(indexHtmlPath, 'utf-8') : generateTemplate({
    faviconMarkups: '',
    preLoader: ctx.config.assets.indexHtml.preLoader, 
  });

  const html = htmlRaw
    .split(LINES_SEPARATOR_REGEXP)
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
    .join(LINES_SEPARATOR);

  unlinkFile({ file: indexHtmlPath });

  generateFile({
    content: html,
    targetPath: indexHtmlPath,
    tryCatchOptions: { errMessageTitle: `commentEmptyTags. An error occurred while generating ${indexHtmlPath}` },
  });
};
