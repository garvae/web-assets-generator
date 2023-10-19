/**
 * Web and frameworks assets generating
 */
import { LINTERS_IGNORE_DEFAULTS } from '../../defaults/linters-ignore';
import { TWagCtx } from '../../types';
import { generateFile } from '../../utils/generate-file';

import { generateLicense } from './web/licence';
import { generateManifest } from './web/manifest';
import { Index } from './web/robots';
import { generateSearchXml } from './web/search-xml';


export const generateWebAndFrameworksSecondaryAssets = (props: TWagCtx) => {

  const {
    config,
    names,
    paths,
  } = props;

  const { outputLib } = paths;
  const outputLibFrameworks = `${outputLib}/frameworks`;

  const contentLintersIgnoreCommon = LINTERS_IGNORE_DEFAULTS
    .join('\n')
    .replaceAll('\'', '');

  console.log('----------- contentLintersIgnoreCommon', contentLintersIgnoreCommon);
  console.log('----------- LINTERS_IGNORE_DEFAULTS', LINTERS_IGNORE_DEFAULTS);

  /**
   * ----------------------------------------------------------------
   * Frameworks assets generating
   * ----------------------------------------------------------------
   */

  /**
   * Creates .eslintignore
   *
   * The purpose of this is WebStorm bug
   * when you manually configure files to watch in the WebStorm settings
   */
  if (config.assets.framework.eslintignore) {
    const content = contentLintersIgnoreCommon.replaceAll('"', '');

    const targetName = '.eslintignore';

    generateFile({
      content,
      targetPath: `${outputLibFrameworks}/${targetName}`,
      tryCatchOptions: { errMessageTitle: `${targetName} generating` },
    });
  }

  /**
   * Creates .prettierignore
   *
   * The purpose of this is to automate the creation of core files
   */
  if (config.assets.framework.prettierignore) {
    const content = contentLintersIgnoreCommon.replaceAll('./', '');

    const targetName = '.prettierignore';

    generateFile({
      content,
      targetPath: `${outputLibFrameworks}/${targetName}`,
      tryCatchOptions: { errMessageTitle: `${targetName} generating` },
    });
  }

  /**
   * ----------------------------------------------------------------
   * Web assets generating
   * ----------------------------------------------------------------
   */


  /**
   * Creates LICENCE
   */
  if (config.assets.license) {
    const targetName = 'LICENCE';

    generateFile({
      content: generateLicense({
        author: config.tokensMain.author,
        url: config.tokensMain.authorUrl,
        year: String(new Date().getFullYear()),
      }),
      targetPath: `${outputLib}/${targetName}`,
      tryCatchOptions: { errMessageTitle: `${targetName} generating` },
    });
  }

  /**
   * Creates MANIFEST
   */
  if (config.assets.manifest) {
    const targetName = names.files.manifestPublic;

    const manifest = generateManifest({
      background_color: config.tokensMain.appPlaceholderBackgroundColor,
      display: 'standalone',
      lang: config.tokensMain.language,
      name: config.tokensMain.title,
      short_name: config.tokensMain.name,
      start_url: config.tokensMain.startUrl,
      theme_color: config.tokensMain.themeColor,
    });

    generateFile({
      content: JSON.stringify(manifest, null, 2),
      targetPath: `${outputLib}/${targetName}`,
      tryCatchOptions: { errMessageTitle: `${targetName} generating` },
    });
  }


  /**
   * robots
   */
  if (config.assets.robots) {
    const targetName = 'robots.txt';

    generateFile({
      content: Index,
      targetPath: `${outputLib}/${targetName}`,
      tryCatchOptions: { errMessageTitle: `${targetName} generating` },
    });
  }


  /**
   * search.xml
   */
  if (config.assets.searchXml) {
    const targetName = 'search.xml';

    generateFile({
      content: generateSearchXml({
        name: config.tokensMain.name,
        siteUrl: config.tokensMain.siteUrl,
      }),
      targetPath: `${outputLib}/${targetName}`,
      tryCatchOptions: { errMessageTitle: `${targetName} generating` },
    });
  }
};
