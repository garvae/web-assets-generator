import { DeepPartial } from './utils';


type TConfigMeta = {
  appleMobileWebAppCapable: string;
  appleMobileWebAppStatusBarStyle: string;
  appleTouchFullscreen: string;
  applicationName: string;
  description: string;
  formatDetection: string;
  htmlLang: string;
  linkRelSearchTitle: string;
  maskIcon: string;
  mobileWebAppCapable: string;
  msapplicationNavbuttonColor: string;
  msapplicationStarturl: string;
  msapplicationTileColor: string;
  ogDescription: string;
  ogImageAlt: string;
  ogImageHeight: string;
  ogImageType: string;
  ogImageWidth: string;
  ogLocale: string;
  ogSiteName: string;
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  owner: string;
  replyTo: string;
  robots: string;
  themeColor: string;
  title: string;
  twitterAppIdGoogleplay: string;
  twitterAppIdIpad: string;
  twitterAppIdIphone: string;
  twitterAppNameGoogleplay: string;
  twitterAppNameIpad: string;
  twitterAppNameIphone: string;
  twitterAppUrlGoogleplay: string;
  twitterAppUrlIpad: string;
  twitterAppUrlIphone: string;
  twitterCard: string;
  twitterCreator: string;
  twitterCreatorId: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageAlt: string;
  twitterPlayer: string;
  twitterPlayerHeight: string;
  twitterPlayerStream: string;
  twitterPlayerWidth: string;
  twitterSite: string;
  twitterSiteId: string;
  twitterTitle: string;
  urlRSSFeed: string;
  viewport: string;
};

type TConfigAssetsFavicon = {
  input: string;
};

type TConfigAssetsIndexHtml = {
  metaCoverSocials: string;
  preLoader: boolean;
  tokensMeta: TConfigMeta;
};


type TConfigAssetsFramework = {
  eslintignore: boolean;
  prettierignore: boolean;
};

type TConfigAssets = {
  browserConfig: boolean;
  favicon: TConfigAssetsFavicon;
  framework: TConfigAssetsFramework;
  indexHtml: TConfigAssetsIndexHtml;
  license: boolean;
  manifest: boolean;
  robots: boolean;
  searchXml: boolean;
};

type TConfigTokensMain = {
  appPlaceholderBackgroundColor: string;
  author: string;
  authorAccountTwitter: string;
  authorEmail: string;
  authorUrl: string;
  description: string;
  language: string;
  languageOg: string;
  msapplicationTileColor: string;
  name: string;
  siteUrl: string;
  startUrl: string;
  themeColor: string;
  title: string;
};

export type TConfigApp = {
  assets: TConfigAssets;
  outputDir: string;
  tokensMain: TConfigTokensMain;
};

export type TConfigClient = DeepPartial<TConfigApp>;
