/**
 * Modules that run some code to configure or set up the testing framework
 * after the test framework has been installed in the environment.
 * More: https://stackoverflow.com/questions/58080435/when-should-i-use-setupfiles-rather-than-setupfilesafterenv
 *
 * Here you can mock something globally
 */

/* eslint-disable import/no-extraneous-dependencies -- -- we don't need these libs in project "dependencies" */
import { config } from 'dotenv';

config({ path: '.env.test' });

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

afterAll(() => {
  jest.resetAllMocks();
  jest.useRealTimers();
});

/* eslint-enable import/no-extraneous-dependencies */
