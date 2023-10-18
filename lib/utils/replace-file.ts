import { generateFile } from './generate-file';
import {
  TTryCatchWrapperOptions,
  tryCatchWrapper, 
} from './try-catch-wrapper';
import { unlinkFile } from './unlink-file';


type TReplaceFile = {
  content: string;
  file: string;
};

export const replaceFileFn = (props: TReplaceFile) => {

  const {
    content,
    file,
  } = props;

  unlinkFile({ file });

  generateFile({
    content,
    targetPath: file,
  });
};


/**
 * Runs files generators
 */
export const replaceFile = (props: TReplaceFile & TTryCatchWrapperOptions<void>): void => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => replaceFileFn(rest),
    ...tryCatchOptions,
  });
};
