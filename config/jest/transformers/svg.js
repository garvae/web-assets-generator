const path = require('path');

/**
 * Read my answer about this solution:
 * https://stackoverflow.com/questions/58603201/jest-cannot-load-svg-file/73321079#73321079
 *
 * This function build module.
 *
 * P.S.:
 * The string "module.exports.default = ${functionName};"
 * replaced with (by https://github.com/ChromeQ):
 * ```
 * module.exports.__esModule = true;
 * module.exports.default = '${pathname}';
 * ```
 *
 * Tuples props replaced with object props.
 * Object props is a more extensible solution than tuples when we have a lot of props
 *
 * @param {object} props - props for the modules builder
 * @param {string} props.functionName - Function name
 * @param {string} props.pathname - Path name
 * @param {string} props.filename - File name
 *
 * @function buildModule
 * @returns {string} string module
 */
const buildModule = props => {

  const {
    filename,
    functionName,
    pathname,
  } = props;

  return `
    const React = require('react');
    const ${functionName} = (props) => 
    {
        return React.createElement('svg', { 
        ...props, 
        'data-jest-file-name': '${pathname}',
        'data-jest-svg-name': '${filename}',
        'data-testid': '${filename}'
      });
    }
    module.exports.__esModule = true;
    module.exports.default = '${pathname}';
    module.exports.ReactComponent = ${functionName};
`;
};

/**
 * This function creates a function name
 *
 * @function createFunctionName
 * @param {string} base - base of the new function name
 * @returns {string} string module
 */
const createFunctionName = base => {
  const words = base.split(/\W+/);

  /* here I refactored the code a bit and replaced "substr" (Deprecated) with "substring" */
  return words.reduce((identifier, word) => identifier + word.substring(0, 1).toUpperCase() + word.substring(1), '');
};

/**
 * This function process incoming svg data
 *
 * @function processSvg
 * @param {string} contents - your svg. String like "<svg viewBox="..."><path d="..."/></svg>"
 * @param {string} filename - full path of your file
 * @returns {string} string module
 */
const processSvg = (contents, filename) => {
  const parts = path.parse(filename);
  if (parts.ext.toLowerCase() === '.svg') {
    const functionName = createFunctionName(parts.name);
    return buildModule({
      filename: parts.name,
      functionName,
      pathname: parts.base,
    });
  }

  return contents;
};

module.exports = { process: processSvg };
