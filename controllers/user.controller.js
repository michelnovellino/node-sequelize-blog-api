const User = require("../models/user.model");
const controller = {};

controller.getAll = function(req, res, next) {
  User.findAll()
    .then(users => {
      console.log("Connection has been established successfully.");
      res.json({ success: users });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.json({ error: "Express" });
    });
};
module.exports = controller;
