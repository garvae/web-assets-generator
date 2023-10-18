/**
 * File where the favicon markups are stored
 */
import { TWagCtx } from '../../../types';


export type TRealfaviconConfig = {
  design: {
    androidChrome: {
      assets: {
        legacyIcon: boolean,
        lowResolutionIcons: boolean,
      },
      manifest: {
        declared: boolean,
        display: string,
        name: string,
        onConflict: string,
        orientation: string,
      },
      pictureAspect: string,
      themeColor: string,
    },
    desktopBrowser: { design: string,
    },
    ios: {
      appName: string,
      assets: {
        declareOnlyDefaultIcon: boolean,
        ios6AndPriorIcons: boolean,
        ios7AndLaterIcons: boolean,
        precomposedIcons: boolean,
      },
      pictureAspect: string,
    },
    safariPinnedTab: {
      pictureAspect: string,
      themeColor: string,
    },
    windows: {
      appName: string,
      assets: {
        windows10Ie11EdgeTiles: {
          big: boolean,
          medium: boolean,
          rectangle: boolean,
          small: boolean,
        },
        windows80Ie10Tile: boolean,
      },
      backgroundColor: string,
      onConflict: string,
      pictureAspect: string,
    },
  },
  dest: string,
  iconsPath: string,
  masterPicture: string,
  settings: {
    compression: number,
    errorOnImageTooSmall: boolean,
    htmlCodeFile: boolean,
    readmeFile: boolean,
    scalingAlgorithm: string,
    usePathAsIs: boolean,
  },
};

export const generateRealfaviconConfig = (ctx: TWagCtx): TRealfaviconConfig => {

  const { config } = ctx;

  const {
    output,
    override,
  } = ctx.plugins.realfavicon.paths;

  return {
    design: {
      androidChrome: {
        assets: {
          legacyIcon: true,
          lowResolutionIcons: true,
        },
        manifest: {
          declared: true,
          display: 'standalone',
          name: config.tokensMain.name,
          onConflict: 'override',
          orientation: 'notSet',
        },
        pictureAspect: 'noChange',
        themeColor: config.tokensMain.themeColor,
      },
      desktopBrowser: { design: 'raw' },
      ios: {
        appName: config.tokensMain.name,
        assets: {
          declareOnlyDefaultIcon: true,
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
        },
        pictureAspect: 'noChange',
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: config.tokensMain.themeColor,
      },
      windows: {
        appName: config.tokensMain.name,
        assets: {
          windows10Ie11EdgeTiles: {
            big: true,
            medium: true,
            rectangle: true,
            small: true,
          },
          windows80Ie10Tile: true,
        },
        backgroundColor: config.tokensMain.themeColor,
        onConflict: 'override',
        pictureAspect: 'noChange',
      },
    },
    dest: output,
    iconsPath: override,
    masterPicture: config.assets.favicon.input,
    settings: {
      compression: 1,
      errorOnImageTooSmall: false,
      htmlCodeFile: true,
      readmeFile: false,
      scalingAlgorithm: 'Mitchell',
      usePathAsIs: false,
    },
  };
};


