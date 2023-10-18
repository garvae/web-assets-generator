/**
 * Mapped project dirs aliases
 *
 * @example result: ["^api/(.*)", "<rootDir>/src/api/$1",]
 *
 * @type {string[][]}
 */

const config = {

  /* Stop running tests after `n` failures */
  bail: 1,

  /* The directory where Jest should store its cached dependency information */
  cacheDirectory: './cache/jest',

  /* Automatically clear mock calls, instances, contexts and results before every test */
  clearMocks: true,

  /* Indicates whether the coverage information should be collected while executing the test */
  collectCoverage: false,

  /* Path where to collect coverage from */
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/__IGNORE__/',
    '!<rootDir>/cache/',
    '!<rootDir>/config/',
    '!<rootDir>/dist/',
    '!<rootDir>/bin/',
    '!<rootDir>/docs/',
    '!<rootDir>/node_modules/',
    '!<rootDir>/output/',
    '!<rootDir>/reports/',
    '!<rootDir>/src/**/*.d.{js,jsx,ts,tsx}',
    '!<rootDir>/temp/',
  ],

  /* The directory where Jest should output its coverage files */
  coverageDirectory: 'coverage',

  /* An array of regexp pattern strings used to skip coverage collection */
  coveragePathIgnorePatterns: [ '/node_modules/' ],

  /* Indicates which provider should be used to instrument code for coverage */
  coverageProvider: 'v8',

  /* A list of reporter names that Jest uses when writing coverage reports */
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
  ],

  /* Make calling deprecated APIs throw helpful error messages */
  errorOnDeprecated: true,

  /**
   * The default configuration for fake timers
   *
   *
   * Here is a bug: https://github.com/facebook/jest/pull/13137#event-7187998379
   * Workaround: add this to "setupFiles"
   */
  /* fakeTimers: { 'enableGlobally': true }, */

  /* A set of global variables that need to be available in all test environments */
  globals: { __DEV__: true /* , 'ts-jest': { tsconfig: '<rootDir>/tsconfig.test.json' }, */ },

  /* The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers. */
  maxWorkers: '50%',

  /* An array of directory names to be searched recursively up from the requiring module's location */
  moduleDirectories: [ 'node_modules', 'lib' ],

  /* An array of file extensions your modules use */
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],

  /* aliases */
  moduleNameMapper: { '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub' },

  /**
   * Use this configuration option to add reporters to Jest.
   * It must be a list of reporter names, additional options can be passed to a reporter using the tuple form
   */
  reporters: [ [ 'default', { silent: false } ], [ './node_modules/jest-html-reporter', {
    outputPath: './reports/jest-report.html',
    pageTitle: 'Test Report',
  } ] ],

  /* Automatically reset mock state before every test */
  resetMocks: true,

  /* The toc directory that Jest should scan for tests and modules within */
  rootDir: './',

  /* A list of paths to directories that Jest should use to search for files in */
  roots: [ '<rootDir>/lib' ],

  /**
   * The paths to modules that run some code to configure or set up the testing environment before the test framework
   * is installed in the environment. More:
   * https://stackoverflow.com/questions/58080435/when-should-i-use-setupfiles-rather-than-setupfilesafterenv
   */
  setupFiles: [ '<rootDir>/config/jest/configs/setup-each-test.ts' ],

  /**
   * A list of paths to modules that run some code to configure or set up the testing framework after the test
   * framework has been installed in the environment. More:
   * https://stackoverflow.com/questions/58080435/when-should-i-use-setupfiles-rather-than-setupfilesafterenv
   */
  setupFilesAfterEnv: [ '<rootDir>/config/jest/configs/setup-all-tests.tsx' ],

  /* The number of seconds after which a test is considered as slow and reported as such in the results. */
  slowTestThreshold: 10,

  /* The test environment that will be used for testing */
  testEnvironment: 'node',

  /* Options that will be passed to the testEnvironment */
  testEnvironmentOptions: {},

  /* The glob patterns Jest uses to detect test files */
  testMatch: [ '**/?(*.)+(spec|test).[tj]s?(x)' ],

  /* An array of regexp pattern strings that are matched against all test paths, matched tests are skipped */
  testPathIgnorePatterns: [ '\\\\node_modules\\\\', '__IGNORE__' ],

  /**
   * babel-jest is automatically installed when installing Jest and will automatically transform files
   * if a babel configuration exists in your project. To avoid this behavior,
   * you can explicitly reset the transform configuration option: 'transform: {}'
   */
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|md)$': 'jest-transform-stub',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.svg$': `<rootDir>/config/jest/transformers/svg.js`,
  },

  /* Indicates whether each individual test should be reported during the run */
  verbose: true,
};

module.exports = config;
