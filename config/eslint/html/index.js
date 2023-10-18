const { rulesHtml } = require('./rules');

const overridesHtml = {
  files: [ '*.html' ],
  parser: '@html-eslint/parser',
  extends: [ 'plugin:@html-eslint/recommended' ],
  plugins: [ 'html', '@html-eslint' ],
  rules: rulesHtml,
};

const overridesHtmlIndex = {
  ...overridesHtml,
  files: [ 'public/index.html' ],
  rules: {
    ...overridesHtml.rules,
    'max-len': 'off',
  },
};

module.exports = {
  overridesHtml,
  overridesHtmlIndex,
};
