const rulesTypeScript = {

  /* --- TypeScript-eslint rules --- */
  '@typescript-eslint/ban-ts-comment': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-shadow': [ 'error', { ignoreTypeValueShadow: true } ],
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  'typescript-sort-keys/interface': 'error',
  'typescript-sort-keys/string-enum': 'error',
  '@typescript-eslint/naming-convention': [
    2,
    {
      selector: 'variable',
      format: [
        'camelCase',
        'UPPER_CASE',
        'PascalCase',
      ],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'function',
      format: [ 'PascalCase', 'camelCase' ],
    },
    {
      selector: 'interface',
      format: [ 'PascalCase' ],
      trailingUnderscore: 'allow',
      custom: {
        regex: '^I[A-Z]',
        match: true,
      },
    },
    {
      selector: 'typeLike',
      format: [ 'PascalCase' ],
    },
    {
      selector: 'typeAlias',
      format: [ 'PascalCase' ],
      custom: {
        regex: '^T[A-Z]',
        match: true,
      },
    },
  ],

  'jsdoc/no-types': 0,
  'jsdoc/require-returns': 0,
  'jsdoc/require-param': 0,
};


module.exports = { rulesTypeScript };
