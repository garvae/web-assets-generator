import { TConfigApp } from './types/config';


/**
 * App context
 */
export type TWagCtx = {

  /**
   * Main config
   */
  config: TConfigApp;

  faviconName: string;

  /**
   * Main index.html settings
   */
  indexHtml: {
    preLoader: {
      text: string;
    };
  };

  names: {
    files: {
      browserconfig: string;
      indexHtml: string;
      manifestPublic: string;
      metaCoverSocial: string;
    };
  };
  outputImgsExtensionPreferred: string;
  paths: {
    indexHtml: string;
    outputLib: string;
    outputLibAssets: string;
    outputLibAssetsImages: string;
    rootLib: string;
    rootUser: string;
  };
  plugins: {
    pwaag: {
      img: {
        extension: string;
        extensionRegExp: RegExp;
      };
      name: string;
      paths: {
        indexHtml: string;
        output: string;
        override: string;
        root: string;
      }
    };
    realfavicon: {
      img: {
        extensionsRegExp: RegExp[];
      };
      name: string;
      names: {
        files: {
          androidIconsFilenamesBase: string;
          androidIconsFilenamesRegExpSize: RegExp;
          browserconfig: string;
          indexHtml: string;
          manifest: string;
        };
      };
      paths: {
        config: string;
        indexHtml: string;
        output: string;
        outputDataFile: string;
        override: string;
        root: string;
      };
    };
  }
};
