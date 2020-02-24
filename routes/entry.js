var express = require("express");
var router = express.Router();
controller = require("../controllers/entry.controller");
/* GET users listing. */
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.add);
router.put("/:id", controller.edit);
router.delete("/:id", controller.delete);
module.exports = router;
