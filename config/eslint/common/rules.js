const { LINE_LENGTH } = require('./variables');

const rulesCommon = {

  /* --- eslint config --- */
  'array-bracket-spacing': [ 'error', 'always' ],
  'array-callback-return': 'warn',
  'arrow-parens': [ 2, 'as-needed' ],
  'class-methods-use-this': 0,
  'max-len': 0,
  'comma-dangle': [ 'error', 'always-multiline' ],
  indent: [
    'warn',
    2,
    {
      ignoredNodes: [ 'JSXElement' ],
      SwitchCase: 1,
    },
  ],
  'linebreak-style': 'off',
  'max-classes-per-file': [ 'error', 100 ],
  'no-console': 'warn',
  'no-implicit-coercion': 'off',
  'no-multiple-empty-lines': [ 'error', {
    max: 2,
    maxBOF: 1,
    maxEOF: 10,
  } ],
  'no-plusplus': 0,
  'no-shadow': 'off',
  'no-underscore-dangle': 0,
  'object-curly-spacing': [ 'error', 'always' ],
  'padded-blocks': 0,
  'space-in-parens': [ 'error', 'never' ],
  'max-params': [ 'error', 2 ],
  'quote-props': [
    'error',
    'as-needed',
    { keywords: false },
  ],

  /* --- comments --- */
  'no-warning-comments': [ process.env.NODE_ENV === 'production' ? 'error' : 'warn', {
    terms: [ 'TODO', 'FIXME' ],
    location: 'anywhere',
  } ],
  'eslint-comments/require-description': [ 'error', { ignore: [ 'eslint-enable' ] } ],
  'eslint-comments/disable-enable-pair': [ 'error', { allowWholeFile: true } ],
  'eslint-comments/no-duplicate-disable': 'error',
  'eslint-comments/no-unlimited-disable': 'off',
  'eslint-comments/no-use': 'off',
  'spaced-comment': [
    'error',
    'always',
    {
      markers: [ '/' ],
      exceptions: [ '-' ],
      block: { balanced: true },
    },
  ],
  'lines-around-comment': [ 'error', { beforeBlockComment: true } ],
  'multiline-comment-style': 0,
  'write-good-comments/write-good-comments': 0,

  /* --- newline / wrapping --- */
  'array-bracket-newline': [ 'error', { minItems: 3 } ],
  'array-element-newline': [ 'error', { minItems: 3 } ],
  'function-paren-newline': [ 'error', { minItems: 4 } ],
  'newline-destructuring/newline': [ 'error', {
    items: 2,
    itemsWithRest: 2,
    maxLength: 20,
  } ],
  'newline-per-chained-call': [ 'error' ],
  'object-curly-newline': [ 'error', {
    ObjectExpression: {
      multiline: false,
      minProperties: 2,
    },
    ObjectPattern: {
      multiline: false,
      minProperties: 2,
    },
    ImportDeclaration: {
      multiline: false,
      minProperties: 2,
    },
    ExportDeclaration: {
      multiline: false,
      minProperties: 2,
    },
  } ],
  'object-property-newline': [ 'error', { allowMultiplePropertiesPerLine: false } ],
  'object-shorthand': 2,
  curly: 'error',

  /* --- unused detection --- */
  'no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [ 'warn', {
    vars: 'all',
    varsIgnorePattern: '^_',
    args: 'after-used',
    argsIgnorePattern: '^_',
  } ],

  /* --- sorting --- */
  'sort-destructure-keys/sort-destructure-keys': [ 2, { caseSensitive: true } ],
  'sort-keys-fix/sort-keys-fix': 'error',

  /* --- imports --- */
  'import/no-extraneous-dependencies': [ 'error', { devDependencies: [ '**/*.test.ts', '**/*.test.tsx' ] } ],
  'import/prefer-default-export': 'off',
  'import/no-anonymous-default-export': 'off',
  'import/namespace': 'error',
  'import/no-named-as-default': 'off',
  'import/export': 'error',
  'import/order': [ 'error', {
    alphabetize: {
      order: 'asc',
      caseInsensitive: true,
    },
    groups: [
      'builtin',
      'external',
      'internal',
      'parent',
      'sibling',
      'index',
    ],
    pathGroups: [
      {
        pattern: 'react*',
        group: 'external',
        position: 'before',
      },
      {
        pattern: '*',
        group: 'external',
        position: 'before',
      },
      {
        pattern: './*.[^scss]',
        group: 'index',
        position: 'before',
      },
      {
        pattern: './*.module.scss',
        group: 'index',
        position: 'after',
      },
    ],
    pathGroupsExcludedImportTypes: [ 'react' ],
    'newlines-between': 'always',
  } ],
  'modules-newlines/export-declaration-newline': 'warn',
  'modules-newlines/import-declaration-newline': 'warn',

  /* --- jsdoc --- */
  'jsdoc/tag-lines': [
    'warn',
    'any',
    { startLines: 1 },
  ],

  /* --- @getify --- */
  '@getify/proper-ternary/nested': 'error',
  '@getify/proper-ternary/parens': 0,
  '@getify/proper-ternary/where': [ 'error', {
    statement: true,
    property: false,
    argument: true,
    return: false,
    default: true,
    sub: true,
    assignment: false,
  } ],
  '@getify/proper-arrows/name': 'off',
  '@getify/proper-arrows/params': 'off' /* replaced with <'max-params': ['error', 1]>, */,
  '@getify/proper-arrows/return': [ 'error', {
    object: false,
    chained: false,
    sequence: true,
    trivial: true,
    ternary: 2,
  } ],
  '@getify/proper-arrows/this': 'off',
  '@getify/proper-arrows/where': 'off',

  /* --- no-unsanitized --- */
  'no-unsanitized/method': 'error',
  'no-unsanitized/property': 'error',

  /* --- destructuring --- */
  'destructuring/no-rename': 'off',
  'destructuring/in-params': [ 'error', { 'max-params': 1 } ],
  'destructuring/in-methods-params': 'off',

  /* --- prettier config --- */
  'prettier/prettier': [ 'error', {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: 'auto',
    endOfLine: 'auto',
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxSingleQuote: true,
    lineLength: LINE_LENGTH,
    printWidth: LINE_LENGTH,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    rangeEnd: 0,
    rangeStart: 0,
    requirePragma: false,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    vueIndentScriptAndStyle: false,
  } ],
};

module.exports = { rulesCommon };
