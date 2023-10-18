/**
 * Automated process:
 * - complete favicon bundle generating
 * - browserconfig.xml generating
 * - manifest.json updating
 * - site.webmanifest generating
 * - manifest / favicon meta tags generating
 *
 * @author Garvae
 */

import fs from 'fs';

import { TWagCtx } from '../../types';
import {
  consoleError,
  consoleInfo, 
} from '../../utils/console';
import { ensureDirectoryExists } from '../../utils/ensure-directory-exists';
import { execute } from '../../utils/execute';
import { generateFile } from '../../utils/generate-file';
import { isStringAndNotEmpty } from '../../utils/string';
import { generateHtmlIndex } from '../index-html';

import { generatePWAAGConfig } from './pwaag/pwaag.config';
import {
  generatePWAAGHtml,
  PWAAGCopyImages,
} from './pwaag/pwaag.utils';
import { generateRealfaviconConfig } from './real-favicon/real-favicon.config';
import {
  realFaviconCopyBrowserConfig,
  realFaviconUpdatePublicManifest,
  realFaviconCopyImages,
} from './real-favicon/real-favicon.utils';
import { generateFaviconMarkups } from './utils/generate-favicon-markups';


/**
 * Generating favicon bundle
 */
export const generateFaviconBundle = (ctx: TWagCtx) => {

  const { input: faviconInput } = ctx.config.assets.favicon;

  const output = ctx.paths.outputLib;

  const {
    pwaag,
    realfavicon,
  } = ctx.plugins;

  const realFaviconDataFile = realfavicon.paths.outputDataFile;
  const realFaviconOutput = realfavicon.paths.output;
  const realFaviconConfig = realfavicon.paths.config;

  if (!isStringAndNotEmpty(faviconInput)) {
    return;
  }

  const configRealfavicon = generateRealfaviconConfig(ctx);

  /**
   * Prepare
   */
  ensureDirectoryExists({ pathAbs: pwaag.paths.output });
  ensureDirectoryExists({ pathAbs: realfavicon.paths.output });

  /**
   * Prepare pwa-asset-generator plugin files
   */
  generatePWAAGHtml(ctx);

  /**
   * Run pwa-asset-generator
   */
  consoleInfo('The first asset generation tool has been launched. This may take a few seconds. Please wait...');
  execute(generatePWAAGConfig(ctx));
  consoleInfo('The first asset generation tool has been completed. Asset generation continues, please wait...');

  /**
   * Copy files generated with pwa-asset-generator plugin
   */
  PWAAGCopyImages(ctx);


  /**
   * Generate the icons. This task takes a few seconds to complete.
   * You should run it at least once to create the icons. Then,
   * you should run it whenever RealFaviconGenerator updates its
   * package (see the "COMMAND_CHECK_FOR_FAVICON_UPDATES" task below).
   */
  consoleInfo('The second asset generation tool has been launched. This may take a few seconds. Please wait...');
  generateFile({
    content: JSON.stringify(configRealfavicon),
    targetPath: realFaviconConfig,
    tryCatchOptions: { errMessageTitle: 'real-favicon. An error occurred while preparing config file for the real-favicon plugin' },
  });
  execute(`real-favicon generate ${realFaviconConfig} ${realFaviconDataFile} ${realFaviconOutput}`);
  consoleInfo('The second asset generation tool has been completed. Asset generation continues, please wait...');

  /**
   * Copy files generated with real-favicon plugin
   */
  realFaviconCopyBrowserConfig(ctx);
  realFaviconCopyImages(ctx);
  realFaviconUpdatePublicManifest(ctx);

  /**
   * Generate webmanifest
   */
  const fileManifest = ctx.names.files.manifestPublic;
  const fileWebmanifest = ctx.plugins.realfavicon.names.files.manifest;

  try {
    fs.copyFileSync(`${output}/${fileManifest}`, `${output}/${fileWebmanifest}`);
  } catch (err) {
    consoleError(`
      Error while generating ${fileWebmanifest}
      Error: ${JSON.stringify(err)}
    `);
  }

  /**
   * Inject favicon markups from pwa-asset-generator and real-favicon plugins
   */
  const faviconMarkups = generateFaviconMarkups({
    configRealfavicon,
    ctx,
  });

  /**
   * Generate main index.html file
   */
  generateHtmlIndex({
    ctx,
    faviconMarkups,
  });
};
