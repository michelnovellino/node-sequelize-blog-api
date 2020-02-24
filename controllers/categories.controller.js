const Category = require("../models/categories.model");
const controller = {};

controller.getAll = function(req, res, next) {
  Category.findAll()
    .then(categories => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ success: categories });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.status(404).json({ error: "Express" });
    });
};

controller.getOne = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Category.findByPk(id)
    .then(categories => {
      res.status(200).json({ data: categories });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.add = function(req, res) {
  let body = req.body;
  console.log(body);
  Category.create(body)
    .then(() =>
      Category.findOrCreate({
        where: { name: body.name }
      })
    )
    .then(([Category, created]) => {
      console.log(
        Category.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: Category, created });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (!id) res.status(400).json({ error: "id not provided" });
  Category.update(body, { where: { id: id } })
    .then(response => {
      if (response[0] == 0) {
        res.status(200).json({ data: "Category not found" });
      } else {
        res.status(200).json({ data: "Category updated " + response });
      }
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.delete = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Category.destroy({ where: { id: id } })
    .then(response => {
      console.log(response);
      if (response == 0) {
        res.status(404).json({ data: "Category not found" });
      } else {
        res.status(200).json({ data: "Category Deleted " + response });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
module.exports = controller;
