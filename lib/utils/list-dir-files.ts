/**
 * Get List of all files in a directory
 */
import fs, { Dirent } from 'fs';

import {
  TTryCatchWrapperOptions,
  tryCatchWrapper,
} from './try-catch-wrapper';


type TReadDirFiles = {
  dirPath: string;
};

type TReadDirFilesReturn = Dirent[] | void;

export const readDirFilesFn = (props: TReadDirFiles) => {

  const { dirPath } = props;

  return fs.readdirSync(dirPath, { withFileTypes: true });
};


/**
 * Runs files generators
 */
export const readDirFiles = (props: TReadDirFiles & TTryCatchWrapperOptions<TReadDirFilesReturn>): TReadDirFilesReturn => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => readDirFilesFn(rest),
    ...tryCatchOptions,
  });
};
