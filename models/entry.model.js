const sequelize = require("sequelize");
const Sequelize = require("./db");
const User = require("./user.model");
const Category = require("./categories.model");
const Tag = require("./tag.model");
const TagRelations = require("./tag_relations.model");
const Entries = Sequelize.define(
  "entries",
  {
    // attributes
    title: {
      type: sequelize.STRING,
      allowNull: false
    },
    content: {
      type: sequelize.STRING
      // allowNull defaults to true
    }
  },
  {
    // options
    underscored: true,
  }
);

Entries.belongsTo(User);
Entries.belongsTo(Category);
/* TagRelations.hasMany(Entries); */
/* Entries.belongsToMany(Tag, { through: TagRelations });
Tag.belongsToMany(Entries, { through: TagRelations }); */
/* TagRelations.belongsTo(Entries);
Entries.belongsToMany(TagRelations, {through: 'tag_relations', foreignKey: 'tag_id', as: 'tags'})
 */
/*  Entries.sync({ force: false }).then(act => {
});  */

module.exports = { Entries, TagRelations };
