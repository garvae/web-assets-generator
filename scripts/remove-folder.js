const fs = require("fs");

const deleteFolderRecursive = path => {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(file => {
      const curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
};

const ARGS = process.argv.slice(2)
const folder = ARGS?.[0]

if (typeof folder === "string" && folder.length && fs.existsSync(folder)){
  deleteFolderRecursive(folder)
}
