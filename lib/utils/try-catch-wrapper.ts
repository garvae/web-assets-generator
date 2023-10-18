import {
  showConsoleError,
  TShowConsoleError, 
} from './show-console-error';
import { throwError } from './throw-error';


type TTryCatchWrapper<T> = Pick<TShowConsoleError, 'noLogs' | 'errMessageTitle'> & {
  fn: () => T;
  onError?: () => void;
  throwErr?: boolean;
};

export type TTryCatchWrapperOptions<T> = Partial<{
  tryCatchOptions: Omit<TTryCatchWrapper<T>, 'fn'>;
}>;


/**
 * Try-Catch wrapper with auto-log
 */
export const tryCatchWrapper = <T>(props: TTryCatchWrapper<T>): T | undefined => {

  const {
    errMessageTitle,
    fn,
    noLogs,
    onError,
    throwErr = true,
  } = props;

  try {
    if (typeof fn === 'function') {
      return fn();
    }

    throwError('Error in "tryCatchWrapper": provided "fn" is not a function');
  } catch (err) {
    if (throwErr) {
      throw err;
    }

    showConsoleError({
      err,
      errMessageTitle,
      noLogs,
    });

    if (typeof onError === 'function') {
      onError();
    }
  }
};
