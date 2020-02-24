const Role = require("../models/role.model");
const controller = {};

controller.getAll = function(req, res, next) {
  Role.findAll()
    .then(Roles => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ success: Roles });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.status(404).json({ error: "Express" });
    });
};

controller.getOne = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Role.findByPk(id)
    .then(Roles => {
      res.status(200).json({ data: Roles });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.add = function(req, res) {
  let body = req.body;
  console.log(body);
  Role.create(body)
    .then(() =>
      Role.findOrCreate({
        where: { email: body.email }
      })
    )
    .then(([Role, created]) => {
      console.log(
        Role.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: Role, created });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (!id) res.status(400).json({ error: "id not provided" });
  Role.update(body, { where: { id: id } })
    .then(response => {
      if (response[0] == 0) {
        res.status(200).json({ data: "Role not found" });
      } else {
        res.status(200).json({ data: "Role updated " + response });
      }
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.delete = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Role.destroy({ where: { id: id } })
    .then(response => {
      console.log(response);
      if (response == 0) {
        res.status(404).json({ data: "Role not found" });
      } else {
        res.status(200).json({ data: "Role Deleted " + response });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

module.exports = controller;
