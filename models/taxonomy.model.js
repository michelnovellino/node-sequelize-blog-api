const sequelize = require("sequelize");
const Sequelize = require("./db");
const Entry = require("./entry.model");
const Tag = require("./tag.model");
const Taxonomy = Sequelize.define(
  "entries_taxonomy",
  {
    entry_id: {
      type: sequelize.INTEGER,
      references: { model: "entries", key: "id" },
      allowNull: false
    },
    tag_id: {
      type: sequelize.INTEGER,
      references: { model: "tags", key: "id" },
      allowNull: false
    }
  },
  {
    // options
    underscored: true
  }
);

/* Taxonomy.hasMany(Entry);
Taxonomy.hasMany(Tag); */
module.exports = Taxonomy;
