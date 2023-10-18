import fs from 'fs';

import { TWagCtx } from '../../../types';
import { readDirFiles } from '../../../utils/list-dir-files';
import {
  LINES_SEPARATOR,
  LINES_SEPARATOR_REGEXP,
} from '../../../vars';
import { TRealfaviconConfig } from '../real-favicon/real-favicon.config';


const regAppleMobileWebAppTitle = /<meta name="apple-mobile-web-app-title".*/gm;
const regAppleTouchIcon = /<link rel="apple-touch-icon".*/gm;
const regAppleTouchStartupImage = /<link rel="apple-touch-startup-image".*/gm;
const regApplicationName = /<meta name="application-name".*/gm;
const regExpManifest = /<link rel="manifest".*/gm;
const regMsapplicationConfig = /<meta name="msapplication-config".*/gm;

const REG_EXPS_TO_REMOVE_REAL_FAVICON = [
  regAppleMobileWebAppTitle,
  regAppleTouchIcon,
  regAppleTouchStartupImage,
  regApplicationName,
  regExpManifest,
  regMsapplicationConfig,
];

const REG_EXP_APPLE_MOBILE_WEB_APP_CAPABLE = /<meta name="apple-mobile-web-app-capable".*/gm;

const REG_EXPS_TO_REMOVE_PWAAG = [ REG_EXP_APPLE_MOBILE_WEB_APP_CAPABLE ];

const REG_EXP_META = /<meta.*/gm;
const REG_EXP_LINK = /<link.*/gm;

const REG_EXPS_TO_PICK_PWAAG = [ REG_EXP_META, REG_EXP_LINK ];

type TGenerateFaviconMarkups = {
  configRealfavicon: TRealfaviconConfig;
  ctx: TWagCtx;
};

/**
 * Inject the favicon markups in the main HTML page.
 */
export const generateFaviconMarkups = (props: TGenerateFaviconMarkups) => {

  const {
    configRealfavicon,
    ctx,
  } = props;

  const {
    pwaag,
    realfavicon,
  } = ctx.plugins;

  const { androidIconsFilenamesBase } = realfavicon.names.files;

  const { override } = realfavicon.paths;

  const codeRaw: string | undefined = JSON.parse(fs.readFileSync(realfavicon.paths.outputDataFile, 'utf-8'))?.favicon?.html_code;

  const metaFromRealFavicon = codeRaw
    ?.split(LINES_SEPARATOR_REGEXP)
    ?.filter(line => !REG_EXPS_TO_REMOVE_REAL_FAVICON.find(re => re.test(line)))
    ?.join(LINES_SEPARATOR) ?? '';

  const realFaviconFilesList = readDirFiles({
    dirPath: realfavicon.paths.output,
    tryCatchOptions: { errMessageTitle: 'Error in "generateFaviconMarkups"' },
  });


  /**
   * Specifies the icon to be used for the home screen shortcut
   * on Android devices with a high-density display.
   */
  const androidChromeIcons = (Array.isArray(realFaviconFilesList) ? realFaviconFilesList : [])
    .filter(file => file.name.startsWith(androidIconsFilenamesBase))
    .map(file => {
      const size = realfavicon.names.files.androidIconsFilenamesRegExpSize.exec(file.name)?.[0];

      if (size) {
        return size;
      }

      return undefined;
    })
    .filter(Boolean)
    .map(iconSize => `<link rel="icon" type="image/png" sizes="${iconSize}" href="${override}/${androidIconsFilenamesBase}-${iconSize}.${ctx.outputImgsExtensionPreferred}">`)
    .join(LINES_SEPARATOR);

  /**
   * specifies the icon to be used in the browser tab and bookmarks
   */
  const faviconMain = `<link rel="icon" type="image/x-icon" href="${override}/${ctx.faviconName}">`;

  /**
   * Meta received from pwa-asset-generator
   */
  const pwaagMetaRaw = fs.readFileSync(pwaag.paths.indexHtml, 'utf-8');

  const pwaagMeta = pwaagMetaRaw
    .split(LINES_SEPARATOR)
    .filter(line => {
      const lineTrimmed = line.trim();
      const isValidToPick = REG_EXPS_TO_PICK_PWAAG.find(re => re.test(lineTrimmed));
      const isValidToSkip = REG_EXPS_TO_REMOVE_PWAAG.find(re => re.test(lineTrimmed));
      return isValidToPick && !isValidToSkip;
    })
    .join(LINES_SEPARATOR);

  return [
    faviconMain,
    metaFromRealFavicon,
    androidChromeIcons,
    pwaagMeta,
  ].join(LINES_SEPARATOR);
};



