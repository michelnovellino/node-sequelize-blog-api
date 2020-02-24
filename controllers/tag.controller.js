const Tag = require("../models/tag.model");
const controller = {};

controller.getAll = function(req, res, next) {
  Tag.findAll()
    .then(Tags => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ success: Tags });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.status(404).json({ error: "Express" });
    });
};

controller.getOne = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Tag.findByPk(id)
    .then(Tags => {
      res.status(200).json({ data: Tags });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.add = function(req, res) {
  let body = req.body;
  console.log(body);
  Tag.create(body)
    .then(() =>
      Tag.findOrCreate({
        where: { email: body.email }
      })
    )
    .then(([Tag, created]) => {
      console.log(
        Tag.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: Tag, created });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (!id) res.status(400).json({ error: "id not provided" });
  Tag.update(body, { where: { id: id } })
    .then(response => {
      if (response[0] == 0) {
        res.status(200).json({ data: "Tag not found" });
      } else {
        res.status(200).json({ data: "Tag updated " + response });
      }
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.delete = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Tag.destroy({ where: { id: id } })
    .then(response => {
      console.log(response);
      if (response == 0) {
        res.status(404).json({ data: "Tag not found" });
      } else {
        res.status(200).json({ data: "Tag Deleted " + response });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
module.exports = controller;
