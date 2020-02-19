const sequelize = require("sequelize");
const Sequelize = require("./db");
const User = require("./user.model");
const Categories = require("../models/categories.model");
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

Entries.belongsTo(User);
Entries.belongsTo(Categories);

module.exports = User;
