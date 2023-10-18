/**
 * Simple object check.
 */
export const isObject = (item: unknown): item is object => !!item && typeof item === 'object' && !Array.isArray(item);
