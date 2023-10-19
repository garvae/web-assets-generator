import path from 'path';


/**
 * Extended path.resolve
 */
export const pathResolve = (...paths: string[]) => path.normalize(path.resolve(...paths));
