var express = require("express");
var router = express.Router();
controller = require("../controllers/role.controller");
/* GET users listing. */
router.get("/", controller.getAll);

module.exports = router;
