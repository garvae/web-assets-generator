/**
 * Runs array of generators if it's valid
 * Every generator should have a function called "generate" to process it
 */
import { isArrayAndNotEmpty } from './array';
import {
  TTryCatchWrapperOptions,
  tryCatchWrapper, 
} from './try-catch-wrapper';


type TRunGeneratorsFn = {
  generators: (() => void)[];
};

export const runGeneratorsFn = (props: TRunGeneratorsFn) => {

  const { generators } = props;

  if (isArrayAndNotEmpty(generators)) {
    generators.forEach(generator => {
      if (typeof generator === 'function') {
        generator();
      }
    });
  }
};

/**
 * Runs files generators
 */
export const runGenerators = (props: TRunGeneratorsFn & TTryCatchWrapperOptions<void>): void => {

  const {
    tryCatchOptions,
    ...rest
  } = props;

  return tryCatchWrapper({
    fn: () => runGeneratorsFn(rest),
    ...tryCatchOptions,
  });
};
