#! /usr/bin/env node
import fs from 'fs';

import { pathResolve } from './utils/path';
import { isStringAndNotEmpty } from './utils/string';
import { throwError } from './utils/throw-error';
import { WAG } from './wag';


/**
 * Config file name
 */
const VAR_APP_CONFIG_FILE_NAME_DEFAULT = 'wag.config.json';

type TShowErrorNotFound = {
  passed?: boolean;
};

/**
 * Show wag-runner error when some problems with provided config were found
 */
const getErrorNotFound = (props?: TShowErrorNotFound) => {

  const { passed } = props ?? {};

  let message = `Please specify valid path to the configuration file "${VAR_APP_CONFIG_FILE_NAME_DEFAULT}" in the CLI command`;

  if (!passed) {
    message = `${message}, or create the configuration file "${VAR_APP_CONFIG_FILE_NAME_DEFAULT}" in the directory where the CLI command was run.`;
  }

  return message;
};

/**
 * WEB-assets-generator runner
 */
(() => {

  const VAR_APP_ROOT_USER = process.cwd();
  const isDev = process.env.DEV === 'true';

  if (!isStringAndNotEmpty(VAR_APP_ROOT_USER)) {
    throwError('A critical error occured while app running');
    return;
  }

  /**
   * CLI arguments
   */
  const ARGS = process.argv.slice(2);

  /**
   * Default WAG config path
   */
  const WAG_CONFIG_FILE_PATH_DEFAULT = pathResolve(VAR_APP_ROOT_USER, VAR_APP_CONFIG_FILE_NAME_DEFAULT);


  if (isDev || ARGS.length < 1) {
    if (!fs.existsSync(WAG_CONFIG_FILE_PATH_DEFAULT)) {
      throwError(getErrorNotFound());
    }

    WAG({
      configPath: WAG_CONFIG_FILE_PATH_DEFAULT,
      rootUser: VAR_APP_ROOT_USER,
    });
    return;
  }

  if (ARGS.length > 1) {
    throwError('Only 1 argument expected');
  }

  const configFilePassed = ARGS[0];

  if (configFilePassed && fs.existsSync(configFilePassed)) {
    WAG({
      configPath: `${VAR_APP_ROOT_USER}/${configFilePassed}`,
      rootUser: VAR_APP_ROOT_USER,
    });
    return;
  }

  throwError(getErrorNotFound({ passed: true }));
})();
