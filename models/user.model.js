const sequelize = require("sequelize");
const Sequelize = require("../models/db");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");
const User = Sequelize.define(
  "user",
  {
    // attributes
    first_name: {
      type: sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: sequelize.STRING
      // allowNull defaults to true
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hash(value));
      }
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  },
  {
    // options
    underscored: true
  }
);

const hash = function(value) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(value, salt);
  return hash;
};
console.log(hash("aaaa") + "<<<<<");
User.belongsTo(Role);

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(act => {
  return User.create({
    first_name: "Michel",
    last_name: "Novellino",
    email: "myemailitsnotherelol@gmail.com",
    password: "astrasd",
    role_id: 1
  });
});

module.exports = User;
