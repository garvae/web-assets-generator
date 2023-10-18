/**
 * @description Clone lib assets to the compiled dir
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd()
const PATH_SOURCE = path.resolve(ROOT, 'lib')
const PATH_DIST = path.resolve(ROOT, 'bin')

/**
 * Clone lib dir
 */
fs.cpSync(PATH_SOURCE, PATH_DIST, { recursive: true });


/**
 * Recursive function to get files
 *
 * @param {string} dir - dir abs path
 * @param {string[]} files - files list
 *
 * @returns {string[]} files - files list
 */
const getFiles = (dir, files = []) => {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
};


/**
 * List dist dir files
 */
const files = getFiles(PATH_DIST)


/**
 * Clean dist dir
 */
files.forEach(file => {
  if (file.endsWith('.ts')){
    fs.unlinkSync(file);
  }
})
