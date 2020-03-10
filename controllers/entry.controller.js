const { Entries: Entry } = require("../models/entry.model");
const User = require("../models/user.model");
const Category = require("../models/categories.model");
const TagRelations = require("../models/tag_relations.model");
const Tag = require("../models/tag.model");

const controller = {};

controller.getAll = function(req, res, next) {
  Entry.findAll({
    include: [
      {
        model: User,
        attributes:{exclude:["password"]},
        required: true,
      },
      {
        model: Category,
        required: true
      },
    ],
  })
    .then(Entrys => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ data: Entrys });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.status(404).json({ error: "Express" });
    });
};

controller.getOne = function(req, res, next) {
  let id = req.params.id;

  if (!id) res.status(400).json({ error: "id not provided" });
  Entry.findByPk(id, {
    include: [
      {
        model: User,
        attributes:{exclude:["password"]},
        required: true
      },
      {
        model: Category,
        required: true
      }
    ]
  })
    .then(Entrys => {
      res.status(200).json({ data: Entrys });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.add = function(req, res) {
  let body = req.body;
  console.log(body);
  Entry.create(body)
    .then(() =>
      Entry.findOrCreate({
        where: { email: body.title }
      })
    )
    .then(([Entry, created]) => {
      console.log(
        Entry.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: Entry, created });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (!id) res.status(400).json({ error: "id not provided" });
  Entry.update(body, { where: { id: id } })
    .then(response => {
      if (response[0] == 0) {
        res.status(200).json({ data: "Entry not found" });
      } else {
        res.status(200).json({ data: "Entry updated " + response });
      }
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.delete = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Entry.destroy({ where: { id: id } })
    .then(response => {
      console.log(response);
      if (response == 0) {
        res.status(404).json({ data: "Entry not found" });
      } else {
        res.status(200).json({ data: "Entry Deleted " + response });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
module.exports = controller;
