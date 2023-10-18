/* eslint-disable import/no-extraneous-dependencies,
  global-require -- we don't need "jest" in project
  "dependencies" and also we can use "require" in this line */
const settingsCommonTsJs = { jest: { version: require('jest/package.json').version } };

module.exports = { settingsCommonTsJs };

/* eslint-enable import/no-extraneous-dependencies, global-require */
