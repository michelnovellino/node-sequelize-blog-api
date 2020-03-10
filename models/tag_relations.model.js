const sequelize = require("sequelize");
const Sequelize = require("./db");
const TagRelations = Sequelize.define(
  "tag_relations",
  {
    entry_id: {
      type: sequelize.INTEGER,
      references: { model: "entries", key: "id" },
      allowNull: false
    },
    tag_id: {
      type: sequelize.INTEGER,
      references: { model: "tag", key: "id" },
      allowNull: false
    }
  },
  {
    // options
    underscored: true
  }
);

/* TagRelations.hasMany(Entry);
TagRelations.hasMany(Tag); */
module.exports = TagRelations;
