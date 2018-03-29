const argv = require('minimist')(process.argv.slice(2));
const debug = require("debug")("qrf:tunnel");
const qrcode = require("./qrcode");
    
function tunnel(port, localurl) {
    console.log(argv);
    if(!argv.www) {
      debug(`App running at ${localurl}`);
      qrcode(localurl);
      return false;
    }
    
    var localtunnel = require('localtunnel');
    
    var tunnel = localtunnel(port, function(err, tunnel) {
        if (err) console.log(err);
        debug(`App running at ${tunnel.url}`);
        qrcode(tunnel.url);
    });
    
    tunnel.on('close', function() {
        console.log('www transfer is closed !!');
    });
    
}

module.exports = tunnel;
