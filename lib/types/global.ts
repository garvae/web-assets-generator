/* eslint-disable @typescript-eslint/naming-convention -- it's possible here to name types like internal */

export type PlainObject<V = unknown, K extends string = string> = Record<K, V>;

/* eslint-enable @typescript-eslint/naming-convention */
