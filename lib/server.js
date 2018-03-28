const express = require('express');
const qrcode = require('qrcode-terminal');
const ip = require('ip');
const network = require('network');
const debug = require('debug')('server')
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
    network.get_private_ip(function(err, ip) {
      const url = `http://${ip || process.env.IP || ip.address()}:${PORT}`;
      debug(`App running on port ${url}!`);
      qrcode.generate(url, { small: true }, function (qrcode) {
        console.log(`scan code below with qrcode scanner app`);
        console.log(qrcode);
      });
    });
  });
}

module.exports = startServer;