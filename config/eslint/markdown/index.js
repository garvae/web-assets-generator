const { rulesMarkdown } = require('./rules');


const overridesMarkdown = {
  files: [ '*.md' ],
  parser: 'eslint-plugin-markdownlint/parser',
  extends: [ 'plugin:markdownlint/recommended' ],
  rules: rulesMarkdown,
};

module.exports = { overridesMarkdown };
