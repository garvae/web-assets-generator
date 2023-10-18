import fs from 'fs';

import { TWagCtx } from '../../../types';
import { deleteDirRecursive } from '../../../utils/delete-dir-recursive';
import { readDirFiles } from '../../../utils/list-dir-files';
import { replaceFile } from '../../../utils/replace-file';


export const realFaviconCopyImages = (ctx: TWagCtx) => {

  const { realfavicon } = ctx.plugins;

  const { output } = realfavicon.paths;

  const generatedFilesList = readDirFiles({
    dirPath: output,
    tryCatchOptions: { throwErr: true },
  })
    ?.map(file => file.name);

  const imagesList = generatedFilesList?.filter(file => realfavicon.img.extensionsRegExp.find(re => re.test(file)));

  imagesList?.forEach(file => fs.copyFileSync(`${output}/${file}`, `${ctx.paths.outputLibAssetsImages}/${file}`));
};


export const realFaviconCopyBrowserConfig = (ctx: TWagCtx) => {

  const { realfavicon } = ctx.plugins;

  const { browserconfig } = realfavicon.names.files;

  fs.copyFileSync(`${realfavicon.paths.output}/${browserconfig}`, `${ctx.paths.outputLib}/${ctx.names.files.browserconfig}`);
};


export const realFaviconUpdatePublicManifest = (ctx: TWagCtx) => {

  const fileManifestPublicPath = `${ctx.paths.outputLib}/${ctx.names.files.manifestPublic}`;

  const { realfavicon } = ctx.plugins;

  const images = JSON.parse(fs.readFileSync(`${realfavicon.paths.output}/${realfavicon.names.files.manifest}`, 'utf-8')).icons;
  const manifestPublic = JSON.parse(fs.readFileSync(fileManifestPublicPath, 'utf-8'));

  const manifestUpdatedJson = {
    ...manifestPublic,
    icons: images,
  };

  const manifestUpdated = JSON.stringify(manifestUpdatedJson, null, 2);

  replaceFile({
    content: manifestUpdated,
    file: fileManifestPublicPath,
    tryCatchOptions: { throwErr: true },
  });
};


export const realFaviconCleanTemp = (ctx: TWagCtx) => {
  if (!fs.existsSync(ctx.plugins.realfavicon.paths.output)) {
    return;
  }

  deleteDirRecursive({
    directoryPathAbs: ctx.plugins.realfavicon.paths.output,
    tryCatchOptions: { errMessageTitle: 'realFaviconCleanTemp - deleteFolderRecursive' },
  });
};

