const Attachment = require("../models/attachment.model");
const controller = {};

controller.getAll = function(req, res, next) {
  Attachment.findAll()
    .then(Attachments => {
      console.log("Connection has been established successfully.");
      res.status(200).json({ success: Attachments });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
      res.status(404).json({ error: "Express" });
    });
};

controller.getOne = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Attachment.findByPk(id)
    .then(Attachments => {
      res.status(200).json({ data: Attachments });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.add = function(req, res) {
  let body = req.body;
  console.log(body);
  Attachment.create(body)
    .then(() =>
      Attachment.findOrCreate({
        where: { email: body.email }
      })
    )
    .then(([Attachment, created]) => {
      console.log(
        Attachment.get({
          plain: true
        })
      );
      console.log(created);
      res.status(200).json({ data: Attachment, created });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
controller.edit = function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (!id) res.status(400).json({ error: "id not provided" });
  Attachment.update(body, { where: { id: id } })
    .then(response => {
      if (response[0] == 0) {
        res.status(200).json({ data: "Attachment not found" });
      } else {
        res.status(200).json({ data: "Attachment updated " + response });
      }
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};
controller.delete = function(req, res, next) {
  let id = req.params.id;
  if (!id) res.status(400).json({ error: "id not provided" });
  Attachment.destroy({ where: { id: id } })
    .then(response => {
      console.log(response);
      if (response == 0) {
        res.status(404).json({ data: "Attachment not found" });
      } else {
        res.status(200).json({ data: "Attachment Deleted " + response });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
module.exports = controller;
