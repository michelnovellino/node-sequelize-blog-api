const sequelize = require("sequelize");
const Sequelize = require("./db");
const User = require("./user.model");
const Categories = require("./categories.model");
const Taxonomy = require("./entry.taxonomy.model");
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
    underscored: true
  }
);

/* Entries.belongsTo(User);
Entries.belongsTo(Categories); */
/* Entries.sync({ force: false }).then(act => {});
Taxonomy.sync({ force: false }).then(act => {}); */
module.exports = { Entries, Taxonomy };
