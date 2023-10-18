/**
 * Utility to generate an error and avoid warning messages from the IDE
 *
 * {@link https://stackoverflow.com/questions/47015693/how-to-fix-throw-of-exception-caught-locally Read more}
 */
import { generateErrorMessage } from './generate-error-message';


export const throwError = (err: unknown): void => {

  let m: string = 'Something went wrong';

  if (err) {
    m = generateErrorMessage({ err });
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal -- the message already formatted
  throw m;
};
