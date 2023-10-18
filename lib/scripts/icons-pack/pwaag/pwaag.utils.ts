import fs from 'fs';

import { TWagCtx } from '../../../types';
import { deleteDirRecursive } from '../../../utils/delete-dir-recursive';
import { generateFile } from '../../../utils/generate-file';
import { readDirFiles } from '../../../utils/list-dir-files';
import { ICONS_PACK_INDEX_HTML_BASE_TEMPLATE } from '../index-base';


export const generatePWAAGHtml = (ctx: TWagCtx) => {

  const { pwaag } = ctx.plugins;

  const { indexHtml } = pwaag.paths;

  generateFile({
    content: ICONS_PACK_INDEX_HTML_BASE_TEMPLATE,
    targetPath: indexHtml,
    tryCatchOptions: { errMessageTitle: 'generatePWAAGHtml. An error occurred while preparing files for the PWAAG plugin' },
  });
};


export const PWAAGCopyImages = (ctx: TWagCtx) => {

  const { pwaag } = ctx.plugins;

  const { output } = pwaag.paths;

  const generatedFilesList = readDirFiles({ dirPath: output })?.map(file => file.name);

  const imagesList = generatedFilesList?.filter(file => pwaag.img.extensionRegExp.test(file));

  imagesList?.forEach(file => fs.copyFileSync(`${output}/${file}`, `${ctx.paths.outputLibAssetsImages}/${file}`));
};


export const PWAAGCleanTemp = (ctx: TWagCtx) => {

  const { output } = ctx.plugins.pwaag.paths;

  if (!fs.existsSync(output)) {
    return;
  }

  deleteDirRecursive({
    directoryPathAbs: output,
    tryCatchOptions: { errMessageTitle: 'PWAAGCleanTemp - deleteFolderRecursive' },
  });
};
