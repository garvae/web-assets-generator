"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorHexaOrEmptyStr = exports.isColor = exports.addToString = exports.isStringAndNotEmpty = void 0;
/**
 * Check that the object is a string, and it is not empty
 */
const vars_1 = require("../vars");
const isStringAndNotEmpty = (str) => typeof str === 'string' && !!str.length;
exports.isStringAndNotEmpty = isStringAndNotEmpty;
/**
 * Appends a string to another string
 */
const addToString = (base, added) => {
    if ((0, exports.isStringAndNotEmpty)(base)) {
        return `${base} ${added}`;
    }
    if ((0, exports.isStringAndNotEmpty)(added)) {
        return added;
    }
    return '';
};
exports.addToString = addToString;
/**
 * Checks if a string is a HEXA color representation
 */
const isColor = (str) => (0, exports.isStringAndNotEmpty)(str) && vars_1.REGEXP_COLOR_HEXA.test(str);
exports.isColor = isColor;
/**
 * Checks if a string is a HEXA color representation
 * and returns checked value or empty string if the value is not a HEXA color representation
 */
const getColorHexaOrEmptyStr = (str) => (0, exports.isColor)(str) ? str : '';
exports.getColorHexaOrEmptyStr = getColorHexaOrEmptyStr;
