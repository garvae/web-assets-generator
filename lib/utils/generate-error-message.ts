export type TGenerateErrorMessage = {

  /**
   * any error type
   */
  err: unknown;

  /**
   * error title
   */
  errMessageTitle?: string;
};

/**
 * Generates an error message using the given parameters
 */
export const generateErrorMessage = (props: TGenerateErrorMessage) => {

  const {
    err: errProp,
    errMessageTitle,
  } = props;

  let err = errProp;

  try {
    if (errProp) {
      if (errProp instanceof Error) {
        err = errProp.stack;
      } else if (typeof errProp === 'object') {
        err = JSON.stringify(errProp);
      } else if (typeof errProp !== 'string') {
        err = String(errProp);
      }
    }

    if (typeof err === 'string') {
      const description = err.length && err !== '{}' ? err : undefined;

      let message: string | undefined = undefined;

      if (description) {
        if (errMessageTitle) {
          message = `${errMessageTitle}\n${description}`;
        } else {
          message = description;
        }
      }

      if (typeof message === 'string' && message.length) {
        return message;
      }
    }

    return '';
  } catch {

    /* no logs here */

    return '';
  }
};
