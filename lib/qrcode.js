const qrcode = require('qrcode-terminal');

function getqrcode(url) {
    qrcode.generate(url, { small: true }, function (qrcode) {
      console.log(`scan code below with qrcode scanner app`);
      console.log(qrcode);
  });
};

module.exports = getqrcode;
