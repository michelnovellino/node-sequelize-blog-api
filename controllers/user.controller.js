const User = require("../models/user.model");
const controller = {};

controller.getAll = function(req, res, next) {
  User.findAll()
    .then(Users => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ data: Users });
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
    .then(Users => {
      res.status(200).json({ data: Users });
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
    .then(([User, created]) => {
      console.log(
        User.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: User, created });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (!id) res.status(400).json({ error: "id not provided" });
  User.update(body, { where: { id: id } })
    .then(response => {
      if (response[0] == 0) {
        res.status(200).json({ data: "User not found" });
      } else {
        res.status(200).json({ data: "User updated " + response });
      }
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.delete = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  User.destroy({ where: { id: id } })
    .then(response => {
      console.log(response);
      if (response == 0) {
        res.status(404).json({ data: "User not found" });
      } else {
        res.status(200).json({ data: "User Deleted " + response });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
module.exports = controller;
