#!/usr/bin/env node

import cp from 'cp-r';
import tempdir from 'tempdir';
import { resolve } from 'path';
import { spawn } from 'child_process';
import { writeFile } from 'fs-promise';

const target = process.argv[2];
if (!target) {
  console.error('A "target" URL must be specified!');
  process.exit(1);
}

// simply log unhandled rejections, like Chrome does
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled promise rejection:\n' + err.stack);
  process.exit(1);
});


(async () => {
  const dirname = await tempdir();

  const deploy = resolve(__dirname, '..', 'deploy');
  await cp(deploy, dirname);

  const config = { target };
  await writeFile(resolve(dirname, 'config.json'), JSON.stringify(config, null, 2));

  await new Promise((resolve, reject) => {
    const child = spawn('now', [], { stdio: 'inherit', cwd: dirname });
    child.on('close', (code, signal) => {
      if (code !== 0) {
        reject(new Error('now exited with code: ' + code));
      } else {
        resolve();
      }
    });
  });
})();
