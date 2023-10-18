/* eslint-disable @typescript-eslint/naming-convention -- it's possible here to name types like internal */

/**
 * Deep make all properties in T Partial
 */
export type DeepPartial<T> = {
  [K in keyof T]: DeepPartial<T[K]> | undefined;
};

/* eslint-enable @typescript-eslint/naming-convention */
