import runSequence from 'gulp4-run-sequence';


/**
 * Gulp tasks runner
 */
export const gulpTaskRunner = async (task: unknown) => new Promise(resolve => runSequence(task, resolve));
