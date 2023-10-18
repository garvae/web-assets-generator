import { PlainObject } from '../../types/global';


type TDeepMergeSafe = {
  attachable: PlainObject[];
  original: PlainObject;
};

/**
 * Deep merge of one or more objects with the original object.
 * Fields of added objects can only be merged if they are of the same type as the corresponding field of the original object.
 */
export const deepMergeSafe = (props: TDeepMergeSafe) => {

  const {
    attachable: attachableArr,
    original: originalObj,
  } = props;

  /**
   * Deep merge two objects
   */
  const mergeObj = (original: PlainObject, attachable: PlainObject): void => {
    Object
      .entries(attachable)
      .forEach(([ attachableKey, attachableValue ]) => {

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
            original[attachableKey] = deepMergeSafe({
              attachable: [ attachableValue as PlainObject ],
              original: original[attachableKey] as PlainObject,
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
  const clone = { ...originalObj };

  /**
   * Loop through each attachable item
   */
  attachableArr.forEach(obj => mergeObj(clone, obj));

  return clone;
};
