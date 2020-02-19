const sequelize = require("sequelize");
const Sequelize = require("../models/db");
const Tags = Sequelize.define(
  "tags",
  {
    // attributes
    name: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    // options
  }
);

module.exports = Tags;
