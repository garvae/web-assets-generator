import child_process from 'child_process';


/**
 * Main CLI executor
 */
export const execute = (cmd: string, options?: child_process.ExecSyncOptionsWithBufferEncoding) => child_process.execSync(cmd, {
  stdio: 'inherit',
  ...(options ?? {}),
});
