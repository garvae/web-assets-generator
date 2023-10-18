import fs from 'fs';

import {
  TTryCatchWrapperOptions,
  tryCatchWrapper, 
} from './try-catch-wrapper';


type TUnlinkFile = {
  file: string;
};


const unlinkFileFn = (props: TUnlinkFile) => {

  const { file } = props;

  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
};

/**
 * Safe file unlink
 */
export const unlinkFile = (props: TUnlinkFile & TTryCatchWrapperOptions<void>): void => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => unlinkFileFn(rest),
    ...tryCatchOptions,
  });
};
