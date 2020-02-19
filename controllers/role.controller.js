const Role = require("../models/role.model");
const controller = {};

controller.getAll = function(req, res, next) {
  Role.findAll()
    .then(Roles => {
      console.log("Connection has been established successfully.");
      res.json({ success: Roles });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.json({ error: "Express" });
    });
};

module.exports = controller;
