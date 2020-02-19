const express = require("express");
const router = express.Router();
const Sequelize = require("../models/db");

/* GET home page. a*/
router.get("/", function(req, res, next) {
  Sequelize.authenticate()
    .then(() => {
      console.log("Caaaonnection has been established successfully.");
      res.json({ success: "Express" });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.json({ error: "Express" });
    });
});


module.exports = router;
