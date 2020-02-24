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
    underscored: true
  }
);
Role.sync({ force: false }).then(async act => {
  /*   let exist = await Role.findAll();
  console.log("EMPEZO ROLES");
  console.log("exist >>>>> ", exist.roles)
  if (!exist || exist.length <= 0) {
    await Role.create({
      name: "user"
    });
    await Role.create({
      name: "admin"
    });
    await Role.create({
      name: "super"
    });
  }
  console.log("TERMINO ROLES"); */
});

module.exports = Role;
