const { rulesCommon } = require('../common/rules');
const { LINE_LENGTH } = require('../common/variables');

const rulesHtml = {
  ...rulesCommon,

  /**
   * The reason of disabling this rule is some kind of bug in the "eslint-plugin-html" library.
   * It breaks the ESLint parser when this rule is enabled
   */
  'spaced-comment': [ 'off' ],
  'max-len': [ 'error', { code: LINE_LENGTH } ],

  /**
   * The reason for disabling this rule is that sometimes we want to use HTML template builders like Gulp.
   * and break the HTML code into smaller chunks that we can reuse across multiple HTML files.
   * or to simplify HTML development.
   * Such HTML-chunks do not need to contain the document type in each file.
   * We can't disable this rule at the top of our HTML-chunks because this rule will only be disabled
   * after the first line, but not on the first line.
   *
   * Today we do not need to add a doctype, because modern browsers can parse html files without it.
   */
  '@html-eslint/require-doctype': [ 'off' ],
};

module.exports = { rulesHtml };
