const express = require('express');
const qrcode = require('qrcode-terminal');
const ip = require('ip');
// var zip = require('express-zip');
const zip = require('express-easy-zip');
const app = express();
const {
  FILE,
  FILES,
  DIRECTORY,
} = require('./constants');
const PORT = process.env.PORT || 7030;

function startServer({ type, source }) {
  
  app.use(zip());
  
  if (type === FILE) {
    app.get('/', (req, res) => {
      res.sendFile(source);
      console.log(`Sent file: ${source}`);
    });
  }
  
  if (type === FILES || type === DIRECTORY) {
    const files = [];
    source.forEach(function(item){
      files.push({
        path: item,
        name: item,
      })
    })
    app.get('/', (req, res) => {
      res.zip({ 
        files:files
      });
    });
  }
   
  app.listen(PORT, () => {
    const url = `http://${process.env.IP || ip.address()}:${PORT}`;
    console.log(`Example app listening on port ${url}!`);
    qrcode.generate(url, {small: true}, function (qrcode) {
      console.log(qrcode);
    });
  });
}

module.exports = startServer;