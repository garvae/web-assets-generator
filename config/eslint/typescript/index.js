const { configCommonTsJs } = require('../common/config');
const { extendsCommon } = require('../common/extends');
const { pluginsCommon } = require('../common/plugins');
const { rulesCommon } = require('../common/rules');

const { extendsTypeScript } = require('./extends');
const { pluginsTypeScript } = require('./plugins');
const { rulesTypeScript } = require('./rules');

const overridesTypeScript = {
  files: [ '*.ts', '*.tsx' ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: [ './tsconfig.eslint.json' ],
  },
  extends: [ ...extendsCommon, ...extendsTypeScript ],
  plugins: [ ...pluginsCommon, ...pluginsTypeScript ],
  rules: {
    ...rulesCommon,
    ...rulesTypeScript,
  },
  ...configCommonTsJs,
};

module.exports = { overridesTypeScript };
