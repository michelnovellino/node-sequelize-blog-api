const multer = require("multer");
const uuid = require("uuid/v4");
var path = require("path");
let upload_folder = process.env.UPLOAD_FOLDER;
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, upload_folder);
  },
  filename: function(req, file, cb) {
    /*     console.log('add middleware >>>' ,file)
    console.log('add middleware >>>' ,req.files) */
    cb(null, uuid());
  }
});

const _instance = multer({
  storage,
  fileFilter: function(req, file, cb) {
    var filetypes = /jpeg|jpg/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 
    if (mimetype && extname) {
      return cb(null, true);
    }
    req.fileValidationError = "goes wrong on the mimetype";
    console.log("here ",req.fileValidationError)
    cb({
      error: "File upload only supports the following filetypes - " + filetypes
    });
  }
});
const uploadOne = function(req, res,next) {
  _instance.single("image")(req, res, function(err) {
    if (req.fileValidationError) {
      return res.end(req.fileValidationError);
    }
    next();
  });
};
module.exports = { uploadOne };
