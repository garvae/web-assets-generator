"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMergeSafe = void 0;
/**
 * Deep merge of one or more objects with the original object.
 * Fields of added objects can only be merged if they are of the same type as the corresponding field of the original object.
 */
const deepMergeSafe = (props) => {
    const { attachable: attachableArr, original: originalObj, } = props;
    /**
     * Deep merge two objects
     */
    const mergeObj = (original, attachable) => {
        Object
            .entries(attachable)
            .forEach(([attachableKey, attachableValue]) => {
            const originalValue = original[attachableKey];
            const originalValueType = typeof originalValue;
            /**
             * Fields of added objects can only be merged
             * if they are of the same type as the corresponding field of the original object.
             */
            if (originalValue !== undefined && typeof attachableValue === originalValueType && attachableValue !== null) {
                /**
                 * If the attachable value is a simple object, then we run the main function on that object.
                 */
                if (originalValueType === 'object') {
                    original[attachableKey] = (0, exports.deepMergeSafe)({
                        attachable: [attachableValue],
                        original: original[attachableKey],
                    });
                    return;
                }
                /**
                 * Otherwise, if the value is Array, then set duplicate of the attachable value as a new value
                 */
                if (Array.isArray(attachableValue)) {
                    original[attachableKey] = Array.from(attachableValue);
                    return;
                }
                /**
                 * Otherwise, just set a new value
                 */
                original[attachableKey] = attachableValue;
            }
        });
    };
    /**
     * Create a clone of the original object
     */
    const clone = Object.assign({}, originalObj);
    /**
     * Loop through each attachable item
     */
    attachableArr.forEach(obj => mergeObj(clone, obj));
    return clone;
};
exports.deepMergeSafe = deepMergeSafe;
