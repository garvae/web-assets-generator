/**
 * Generate and show console.error message
 *
 * @param props
 */
import { consoleError } from './console';
import {
  generateErrorMessage,
  TGenerateErrorMessage,
} from './generate-error-message';


export type TShowConsoleError = TGenerateErrorMessage & {

  /**
   * Whether logging should be used
   */
  noLogs?: boolean;
};

/**
 * Extended console.error
 *
 * @param props
 */
export const showConsoleError = (props: TShowConsoleError): void => {

  const {
    noLogs = true,
    ...rest
  } = props;

  if (!noLogs) {
    consoleError(generateErrorMessage(rest));
  }
};
