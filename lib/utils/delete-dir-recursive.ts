import fs from 'fs';

import {
  TTryCatchWrapperOptions,
  tryCatchWrapper,
} from './try-catch-wrapper';


type TDeleteDirRecursive = {
  directoryPathAbs: string;
};

/**
 * Removes a directory recursively
 */
export const deleteDirRecursive = (props: TDeleteDirRecursive & TTryCatchWrapperOptions<void>): void => {

  const {
    directoryPathAbs,
    tryCatchOptions,
  } = props;

  return tryCatchWrapper({
    fn: () => fs.rmSync(directoryPathAbs, { recursive: true }),
    ...tryCatchOptions,
  });
};
