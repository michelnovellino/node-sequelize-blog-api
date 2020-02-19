const sequelize = require("sequelize");
const Sequelize = require("./db");
const Entry = require("./entries.model");
const Tag = require("../models/tag.model");
const Taxonomy = Sequelize.define(
  "entries_taxonomy",
  {},
  {
    // options
    underscored: true
  }
);

Taxonomy.belongsTo(Entry);
Taxonomy.belongsTo(Tag);

module.exports = Taxonomy;
