var express = require("express");
var router = express.Router();
controller = require("../controllers/attachment.controller");
var { uploadOne } = require("../utils/images.util");
/* GET users listing. */
router.get("/", controller.getAll);
router.post("/test", uploadOne, controller.test);
router.get("/:id", controller.getOne);
router.post("/", controller.add);
router.put("/:id", controller.edit);
router.delete("/:id", controller.delete);
module.exports = router;
