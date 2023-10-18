/**
 * Extended console error message
 */
export const consoleError = (message: string) => {
  if (typeof message === 'string' && message.length) {
    // eslint-disable-next-line no-console -- controlled rule cancellation
    console.error(message);
  }
};

/**
 * Extended console info message
 */
export const consoleInfo = (message: string) => {
  if (typeof message === 'string' && message.length) {
    // eslint-disable-next-line no-console -- controlled rule cancellation
    console.info(message);
  }
};
