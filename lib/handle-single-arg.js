const promisify = require('util-promisify');
const fs = require("fs");
const path = require("path");
const stat = promisify(fs.stat);
const {
  FILE,
  FILES,
  DIRECTORY,
} = require('./constants');
const server = require("./server");

const handleSingleArg = (argumentsPassed) => {
  const sourcepath = path.resolve(argumentsPassed[0]);
  stat(sourcepath)
    .then((stats) => {
      console.log(stats.isDirectory());
      if (stats.isFile()) {
        server({
          type: FILE,
          source: sourcepath,
        });
      }
      
      if (stats.isDirectory()) {
        server({
          type: DIRECTORY,
          source: argumentsPassed,
        })
      }
    })
    .catch((err) =>{
      console.log(err);
    });   
}

module.exports = handleSingleArg;