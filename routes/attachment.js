var express = require("express");
var router = express.Router();
controller = require("../controllers/attachment.controller");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/attachments' })
/* GET users listing. */
router.get("/", controller.getAll);
router.post("/test", upload.single("image"), controller.test);
router.get("/:id", controller.getOne);
router.post("/", controller.add);
router.put("/:id", controller.edit);
router.delete("/:id", controller.delete);
module.exports = router;
