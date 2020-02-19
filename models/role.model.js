const sequelize = require("sequelize");
const Sequelize = require("../models/db");
const Role = Sequelize.define(
  "role",
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


/*  Sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
  .then(function() {
    Role.sync({ force: true }).then(function() {
      Role.create({
        name: "user"
      });
      Role.create({
        name: "admin"
      });
      Role.create({
        name: "super"
      });
    });
  });  */
module.exports = Role;
