const { ignore } = require('../../linters-ignore');
const {
  overridesHtml,
  overridesHtmlIndex,
} = require('../html');
const { overridesTypeScriptJest } = require('../jest');
const { pluginsJest } = require('../jest/plugins');
const { overridesMarkdown } = require('../markdown');
const { overridesTypeScript } = require('../typescript');

const { configCommonTsJs } = require('./config');
const { extendsCommon } = require('./extends');
const { pluginsCommon } = require('./plugins');
const { rulesCommon } = require('./rules');

const configMain = {
  ...configCommonTsJs,
  extends: extendsCommon,
  plugins: [ ...pluginsCommon, ...pluginsJest ],
  rules: rulesCommon,
  parser: '@babel/eslint-parser',
};

const overridesESLintConfigFiles = {
  ...configMain,
  files: [ 'config/eslint/**/*' ],
  rules: {
    ...configMain.rules,
    'sort-keys-fix/sort-keys-fix': 'off',
  },
};

const configESLint = {
  root: true,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    document: true,
    window: true,
  },
  ...configMain,
  overrides: [
    overridesTypeScriptJest,
    overridesESLintConfigFiles,
    overridesHtml,
    overridesHtmlIndex,
    overridesMarkdown,
    overridesTypeScript,
  ],
  ignorePatterns: ignore,
};


module.exports = { configESLint };
