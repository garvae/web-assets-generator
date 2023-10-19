/**
 * Here is the config generator for the open-source images generator: https://github.com/elegantapp/pwa-asset-generator
 *
 * Read more:
 * - https://apple.co/3Uk3KNw
 * - https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons#ios-ipados/
 *
 *
 * P.S. -----------------------
 *
 * You can find the mostly complete list of images sizes for apple below.
 *
 * You can specify multiple images for different device resolutions.
 *
 * The icon that is the most appropriate size for the device is used.
 *
 * The purpose of using multiple sizes is saving resources on requests.
 *
 * But you don't have to specify all existing icon sizes.
 * According to Apple's documentation, the desired icon will be generated
 * on each device from the ones presented.
 * You can conditionally generate the largest icon and then for each device a suitable icon
 * will be generated on the device itself. But then you will transfer too large amounts of data.
 * Alternatively, you can only generate a few images by taking
 * only the largest sizes for each type of device (iPhone, iPad, etc.)
 */
import { TWagCtx } from '../../../types';
import { isStringAndNotEmpty } from '../../../utils/string';


export const generatePWAAGConfig = (ctx: TWagCtx) => {

  const {
    config,
    plugins,
  } = ctx;

  const { pwaag } = plugins;

  const PWA_ASSET_GENERATOR_COMMAND_OPTIONS = [
    '--mstile true',
    '--xhtml true',
    '--maskable false',
    '--log false',
  ];

  const themeColor = config.tokensMain.themeColor;
  const pathOverride = pwaag.paths.override;
  const index = pwaag.paths.indexHtml;
  const type = pwaag.img.extension;

  if (isStringAndNotEmpty(themeColor)) {
    PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--background ${themeColor}`);
  }

  if (isStringAndNotEmpty(pathOverride)) {
    PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--path-override "${pathOverride}"`);
  }

  if (isStringAndNotEmpty(index)) {
    PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--index "${index}"`);
  }

  if (isStringAndNotEmpty(type)) {
    PWA_ASSET_GENERATOR_COMMAND_OPTIONS.push(`--type ${type}`);
  }

  return `npx --yes pwa-asset-generator "${config.assets.favicon.input}" "${pwaag.paths.output}" ${PWA_ASSET_GENERATOR_COMMAND_OPTIONS.join(' ')}`;
};
