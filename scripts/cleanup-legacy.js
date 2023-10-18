/**
 * @description Cleanup legacy files
 */

const fs = require("fs");
const path = require("path");


const ROOT = process.cwd()
const PATH_LEGACY = path.resolve(ROOT, 'dist')

if (fs.existsSync(PATH_LEGACY)){
  fs.rmSync(PATH_LEGACY, { recursive: true })
}
