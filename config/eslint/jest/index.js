const { configCommonTsJs } = require('../common/config');
const { overridesTypeScript } = require('../typescript');

const { extendsJest } = require('./extends');
const { pluginsJest } = require('./plugins');
const { rulesJest } = require('./rules');

const overridesTypeScriptJest = {
  ...overridesTypeScript,
  files: [ '*.test.*', '*.spec.*' ],
  extends: [ ...overridesTypeScript.extends, ...extendsJest ],
  plugins: [ ...overridesTypeScript.plugins, ...pluginsJest ],
  rules: {
    ...overridesTypeScript.rules,
    ...rulesJest,
  },
  ...configCommonTsJs,
};

module.exports = { overridesTypeScriptJest };
