import path from 'path';

import { generateWebAndFrameworksSecondaryAssets } from './scripts/generators';
import { generateFaviconBundle } from './scripts/icons-pack';
import { commentEmptyTags } from './scripts/index-html/comment-empty-tags';
import { mapConfig } from './scripts/map-config';
import { checkMetaCoverSocials } from './scripts/meta-cover-socials';
import { TWagCtx } from './types';
import { deleteDirRecursive } from './utils/delete-dir-recursive';
import { execute } from './utils/execute';
import { pathResolve } from './utils/path';
import { isStringAndNotEmpty } from './utils/string';
import { throwError } from './utils/throw-error';


type TRunWAG = {
  configPath: string;
  rootUser: string;
};


/**
 * Main WEB-assets-generator function
 */
export const WAG = (props: TRunWAG) => {

  const {
    configPath,
    rootUser,
  } = props;

  if (isStringAndNotEmpty(configPath) && isStringAndNotEmpty(rootUser)) {
    const VAR_APP_USER_ROOT = pathResolve(rootUser, 'web-assets-generator');
    const VAR_APP_ROOT = pathResolve(path.dirname(__filename), '../');

    const VAR_APP_LIB_DIR = pathResolve(VAR_APP_ROOT, 'bin');
    const VAR_APP_LIB_DIR_SCRIPTS = pathResolve(VAR_APP_LIB_DIR, 'scripts');
    const VAR_APP_LIB_DIR_SCRIPTS_ICONS_PACK = pathResolve(VAR_APP_LIB_DIR_SCRIPTS, 'icons-pack');

    const VAR_APP_OUTPUT_PATH_ASSETS_RELATIVE = './assets';
    const VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE = `${VAR_APP_OUTPUT_PATH_ASSETS_RELATIVE}/images`;
    const VAR_APP_OUTPUT_PATH_ASSETS_ABSOLUTE = pathResolve(VAR_APP_USER_ROOT, VAR_APP_OUTPUT_PATH_ASSETS_RELATIVE);

    const VAR_APP_PLUGINS_TEMP = pathResolve(VAR_APP_USER_ROOT, 'temp');

    const VAR_APP_PLUGIN_PWAAG_NAME = 'pwaag';
    const VAR_APP_PLUGIN_PWAAG_IMAGES_EXTENSION = 'png';
    const VAR_APP_PLUGIN_PWAAG_DIR_ROOT = pathResolve(VAR_APP_LIB_DIR_SCRIPTS_ICONS_PACK, VAR_APP_PLUGIN_PWAAG_NAME);
    const VAR_APP_PLUGIN_PWAAG_DIR_OUTPUT = pathResolve(VAR_APP_PLUGINS_TEMP, VAR_APP_PLUGIN_PWAAG_NAME);

    const VAR_APP_PLUGIN_REALFAVICON_NAME = 'real-favicon';

    /**
     * A file with this name is generated by the real-favicon plugin
     */
    const VAR_APP_PLUGIN_REALFAVICON_HTML_INDEX = 'html_code.html';
    const VAR_APP_PLUGIN_REALFAVICON_IMAGES_EXTENSIONS = [
      'png',
      'svg',
      'ico',
    ];
    const VAR_APP_PLUGIN_REALFAVICON_DIR_ROOT = pathResolve(VAR_APP_LIB_DIR_SCRIPTS_ICONS_PACK, VAR_APP_PLUGIN_REALFAVICON_NAME);
    const VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT = pathResolve(VAR_APP_PLUGINS_TEMP, VAR_APP_PLUGIN_REALFAVICON_NAME);

    const VAR_APP_FILE_NAME_HTML_INDEX = 'index.html';

    /**
     * APP context base
     */
    const CTX_BASE: Omit<TWagCtx, 'config'> = {
      faviconName: 'favicon.ico',
      indexHtml: { preLoader: { text: 'Loading...' } },
      names: { files: {
        browserconfig: 'browserconfig.xml',
        indexHtml: VAR_APP_FILE_NAME_HTML_INDEX,
        manifestPublic: 'manifest.json',
        metaCoverSocial: 'meta-cover-socials.jpg',
      } },
      outputImgsExtensionPreferred: 'png',
      paths: {
        indexHtml: pathResolve(VAR_APP_USER_ROOT, VAR_APP_FILE_NAME_HTML_INDEX),
        outputLib: VAR_APP_USER_ROOT,
        outputLibAssets: VAR_APP_OUTPUT_PATH_ASSETS_ABSOLUTE,
        outputLibAssetsImages: pathResolve(VAR_APP_USER_ROOT, VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE),
        rootLib: VAR_APP_ROOT,
        rootUser,
      },
      plugins: {
        pwaag: {
          img: {
            extension: VAR_APP_PLUGIN_PWAAG_IMAGES_EXTENSION,
            extensionRegExp: new RegExp(`.${VAR_APP_PLUGIN_PWAAG_IMAGES_EXTENSION}$`),
          },
          name: VAR_APP_PLUGIN_PWAAG_NAME,
          paths: {
            indexHtml: pathResolve(VAR_APP_PLUGIN_PWAAG_DIR_OUTPUT, 'index.html'),
            output: VAR_APP_PLUGIN_PWAAG_DIR_OUTPUT,
            override: VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE,
            root: VAR_APP_PLUGIN_PWAAG_DIR_ROOT,
          },
        },
        realfavicon: {
          img: { extensionsRegExp: VAR_APP_PLUGIN_REALFAVICON_IMAGES_EXTENSIONS.map(re => new RegExp(`.${re}$`)) },
          name: VAR_APP_PLUGIN_REALFAVICON_NAME,
          names: { files: {
            androidIconsFilenamesBase: 'android-chrome',
            androidIconsFilenamesRegExpSize: /\d+x\d+/g,
            browserconfig: 'browserconfig.xml',
            indexHtml: VAR_APP_PLUGIN_REALFAVICON_HTML_INDEX,
            manifest: 'site.webmanifest',
          } },
          paths: {
            config: pathResolve(VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT, 'config.json'),
            indexHtml: pathResolve(VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT, VAR_APP_PLUGIN_REALFAVICON_HTML_INDEX),
            output: VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT,
            outputDataFile: pathResolve(VAR_APP_PLUGIN_REALFAVICON_DIR_OUTPUT, 'data.json'),
            override: VAR_APP_OUTPUT_PATH_ASSETS_IMAGES_RELATIVE,
            root: VAR_APP_PLUGIN_REALFAVICON_DIR_ROOT,
          },
        },
      },
    };

    const errBase = `Something went wrong while reading ${configPath}`;

    /**
     * ----------------------------------------------------------------
     * Mapping config
     * ----------------------------------------------------------------
     */
    const configMapped = mapConfig({
      configPath,
      errBase,
      rootUser: CTX_BASE.paths.rootUser,
    });

    if (!configMapped) {
      throwError(errBase);
      return;
    }

    /**
     * APP context
     */
    const CTX: TWagCtx = {
      ...CTX_BASE,
      config: configMapped,
    };

    const cleanup = () => {
      deleteDirRecursive({
        directoryPathAbs: CTX.paths.outputLib,
        tryCatchOptions: {
          errMessageTitle: 'Removing old generated files',
          throwErr: false,
        },
      });
    };

    try {

      /**
       * ----------------------------------------------------------------
       * Old files removing
       * ----------------------------------------------------------------
       */
      cleanup();

      /**
       * Web and frameworks assets generating
       */
      generateWebAndFrameworksSecondaryAssets(CTX);

      /**
       * Copy meta-cover-socials.js
       */
      checkMetaCoverSocials(CTX);

      /**
       * Generating favicon bundle
       */
      generateFaviconBundle(CTX);

      /**
       * Finds and comments meta tags with empty content
       */
      commentEmptyTags(CTX);

      /**
       * Clean temp
       */
      deleteDirRecursive({ directoryPathAbs: VAR_APP_PLUGINS_TEMP });

      /**
       * Format public dir using prettier
       */
      execute(`npx prettier ${CTX.paths.outputLib} --write`);
    } catch (err) {
      cleanup();
      throwError(err);
    }
  }
};
