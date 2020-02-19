const sequelize = require("sequelize");
const Sequelize = require("./db");
const Categories = Sequelize.define(
  "categories",
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

module.exports = Categories;
