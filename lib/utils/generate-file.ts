import fs from 'fs';

import { ensureFileDirectoryExists } from './ensure-directory-exists';
import {
  TTryCatchWrapperOptions,
  tryCatchWrapper, 
} from './try-catch-wrapper';
import { unlinkFile } from './unlink-file';


type TGenerateFile = {
  content: string;
  noEmptyLineStart?: boolean;
  targetPath: string;
};

export const generateFileFn = (props: TGenerateFile) => {

  const {
    content,
    noEmptyLineStart = true,
    targetPath,
  } = props;

  unlinkFile({ file: targetPath });

  let c = content;

  if (noEmptyLineStart && c.startsWith('\n')) {
    c = c.replace('\n', '');
  }

  ensureFileDirectoryExists({ pathAbs: targetPath });
  fs.writeFileSync(targetPath, c, 'utf8');
};

/**
 * Generates file
 */
export const generateFile = (props: TGenerateFile & TTryCatchWrapperOptions<void>): void => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => generateFileFn(rest),
    ...tryCatchOptions,
  });
};
