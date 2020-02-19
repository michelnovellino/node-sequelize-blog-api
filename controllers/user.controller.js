const User = require("../models/user.model");
const controller = {};

controller.getAll = function(req, res, next) {
  User.findAll()
    .then(users => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ success: users });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.status(404).json({ error: "Express" });
    });
};

controller.getOne = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  User.findByPk(id)
    .then(users => {
      res.status(200).json({ data: users });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.add = function(req, res) {
  let body = req.body;
  console.log(body);
  User.create(body)
    .then(() =>
      User.findOrCreate({
        where: { email: body.email }
      })
    )
    .then(([user, created]) => {
      console.log(
        user.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: user, created });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  User.findByPk(id)
    .then(users => {
      res.status(200).json({ data: users });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
module.exports = controller;
