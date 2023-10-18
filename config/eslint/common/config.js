const { envCommonTsJs } = require('./env');
const { settingsCommonTsJs } = require('./settings');


const configCommonTsJs = {
  env: envCommonTsJs,
  settings: settingsCommonTsJs,
};

module.exports = { configCommonTsJs };
