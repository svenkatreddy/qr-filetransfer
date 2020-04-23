const multer = require('multer');
let path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,path.join(__dirname+'/uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
    storage: storage 
});

module.exports = upload