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

const checkFileType = (argument) => {
  return new Promise((resolve, reject) => {
    const sourcepath = path.resolve(argument);
    stat(sourcepath)
      .then((stats) => {
        if (stats.isFile() || stats.isDirectory()) {
          resolve();
        } else {
          reject(stats);
        }
      });
  })
};

const handleMultipleArg = (argumentsPassed) => {
  const promises = [];
  argumentsPassed.forEach(function(argument) {
    promises.push(checkFileType(argument));
  })
  Promise.all(promises)
    .then( () => {
      server({
        type: FILES,
        source: argumentsPassed,
      });
    })
    .catch((err) =>{
      console.log(err);
    }); 
}

module.exports = handleMultipleArg;