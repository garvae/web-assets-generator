import fs from 'fs';
import path from 'path';

import { APP_CONFIG_DEFAULTS } from '../defaults/config';
import { TConfigApp } from '../types/config';
import { consoleError } from '../utils/console';
import { deepMergeSafe } from '../utils/deep-merge-safe';
import { ensureDirectoryExists } from '../utils/ensure-directory-exists';
import { pathResolve } from '../utils/path';
import {
  isStringAndNotEmpty,
  getColorHexaOrEmptyStr,
} from '../utils/string';
import { throwError } from '../utils/throw-error';


const errorPathNotExists = (p: string) => consoleError(`The path ${p} doesn't exists`);

/**
 * Resolves a path from a user root
 */
const getPathAbsFromUserRoot = (p: string | undefined, rootUser: string): string => {
  let pathResolved = p;

  if (isStringAndNotEmpty(pathResolved)) {
    if (path.isAbsolute(pathResolved)) {
      if (fs.existsSync(pathResolved)) {
        return pathResolved;
      }

      errorPathNotExists(pathResolved);
      return '';
    }

    pathResolved = pathResolve(rootUser, pathResolved);

    if (fs.existsSync(pathResolved)) {
      return pathResolved;
    }

    errorPathNotExists(pathResolved);
  }

  return '';
};

type TMapConfig = {
  configPath: string;
  errBase: string;
  rootUser: string;
};

/**
 * Mapping config
 */
export const mapConfig = (props: TMapConfig): TConfigApp | undefined => {

  const {
    configPath,
    errBase,
    rootUser,
  } = props;

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  if (!config) {
    throwError(errBase);
    return;
  }

  if (!Object.keys(config).length) {
    throwError(`${errBase}: config is empty`);
    return;
  }

  const configMapped = deepMergeSafe({
    attachable: [ config ],
    original: APP_CONFIG_DEFAULTS,
  }) as TConfigApp;

  const resolver = (p: string) => getPathAbsFromUserRoot(p, rootUser);

  const outputDirConfig = configMapped.outputDir;

  const outputDir = path.isAbsolute(outputDirConfig) ? outputDirConfig : pathResolve(rootUser, configMapped.outputDir);

  ensureDirectoryExists({ pathAbs: outputDir });

  const { tokensMeta } = configMapped.assets.indexHtml;

  return {
    ...configMapped,
    assets: {
      ...configMapped.assets,
      favicon: {
        ...configMapped.assets.favicon,
        input: resolver(configMapped.assets.favicon.input),
      },
      indexHtml: {
        ...configMapped.assets.indexHtml,
        metaCoverSocials: resolver(configMapped.assets.indexHtml.metaCoverSocials),
        tokensMeta: {
          ...tokensMeta,
          msapplicationNavbuttonColor: getColorHexaOrEmptyStr(tokensMeta.msapplicationNavbuttonColor),
          msapplicationTileColor: getColorHexaOrEmptyStr(tokensMeta.msapplicationTileColor),
          themeColor: getColorHexaOrEmptyStr(tokensMeta.themeColor),
        },
      },
    },
    outputDir,
    tokensMain: {
      ...configMapped.tokensMain,
      appPlaceholderBackgroundColor: getColorHexaOrEmptyStr(configMapped.tokensMain.appPlaceholderBackgroundColor),
      msapplicationTileColor: getColorHexaOrEmptyStr(configMapped.tokensMain.msapplicationTileColor),
      themeColor: getColorHexaOrEmptyStr(configMapped.tokensMain.themeColor),
    },
  };
};
