/**
 * Check that the object is a string, and it is not empty
 */
import { REGEXP_COLOR_HEXA } from '../vars';


export const isStringAndNotEmpty = (str?: unknown): str is string =>  typeof str === 'string' && !!str.length;


/**
 * Appends a string to another string
 */
export const addToString = (base: string, added: string) => {
  if (isStringAndNotEmpty(base)) {
    return `${base} ${added}`;
  }

  if (isStringAndNotEmpty(added)) {
    return added;
  }

  return '';
};


/**
 * Checks if a string is a HEXA color representation
 */
export const isColor = (str: string) => isStringAndNotEmpty(str) && REGEXP_COLOR_HEXA.test(str);

/**
 * Checks if a string is a HEXA color representation
 * and returns checked value or empty string if the value is not a HEXA color representation
 */
export const getColorHexaOrEmptyStr = (str: string) => isColor(str) ? str : '';
