import fs from 'fs';

import { TWagCtx } from '../types';
import { ensureFileDirectoryExists } from '../utils/ensure-directory-exists';
import { isStringAndNotEmpty } from '../utils/string';


/**
 * Copy meta-cover-socials.js
 */
export const checkMetaCoverSocials = (props: TWagCtx) => {

  const {
    config,
    names,
    paths,
  } = props;

  const { outputLib } = paths;

  if (config.assets.indexHtml.metaCoverSocials) {
    const fileInput = config.assets.indexHtml.metaCoverSocials;

    if (!isStringAndNotEmpty(fileInput)) {
      return;
    }

    const fileDest = `${outputLib}/assets/images/${names.files.metaCoverSocial}`;

    if (fs.existsSync(fileInput)) {
      ensureFileDirectoryExists({
        pathAbs: fileDest,
        tryCatchOptions: { errMessageTitle: 'Copy meta-cover-socials.js' },
      });

      fs.copyFileSync(fileInput, fileDest);
    }
  }
};
