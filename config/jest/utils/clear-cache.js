/**
 * The util for jest cache removing
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const errMessage = 'Error in scripts/clear-cache-jest.js: ';

const deleteFolderRecursive = function (directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach(file => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};


try {
  deleteFolderRecursive(ROOT + '/cache');
} catch (err) {
  console.error(errMessage + err);
}

console.log('Tests cache cleaned');

