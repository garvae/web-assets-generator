import fs from 'fs';
import path from 'path';

import {
  TTryCatchWrapperOptions,
  tryCatchWrapper, 
} from './try-catch-wrapper';


type TEnsureDirectoryExistence = {

  isFile: boolean;

  /**
   * absolute path to the file whose directory you want to check for existence
   */
  pathAbs: string;
};


const ensureDirectoryExistsFn = (props: TEnsureDirectoryExistence) => {

  const {
    isFile,
    pathAbs,
  } = props;

  if (!isFile) {
    if (!fs.existsSync(pathAbs)) {
      fs.mkdirSync(pathAbs, { recursive: true });
    }

    return;
  }


  const dirname = path.dirname(pathAbs);

  if (fs.existsSync(dirname)) {
    return;
  }

  ensureDirectoryExistsFn({
    ...props,
    pathAbs: dirname,
  });

  fs.mkdirSync(dirname);
};


/**
 * Checks that the destination directory of the file exists.
 * Useful when using fs.CopyFileSync
 */
export const ensureFileDirectoryExists = (props: Omit<TEnsureDirectoryExistence, 'isFile'> & TTryCatchWrapperOptions<void>): void => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => ensureDirectoryExistsFn({
      ...rest,
      isFile: true,
    }),
    ...tryCatchOptions,
  });
};


/**
 * Checks that the directory exists.
 */
export const ensureDirectoryExists = (props: Omit<TEnsureDirectoryExistence, 'isFile'> & TTryCatchWrapperOptions<void>): void => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => ensureDirectoryExistsFn({
      ...rest,
      isFile: false,
    }),
    ...tryCatchOptions,
  });
};
