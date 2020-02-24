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
    },
    role_id: {
      type: sequelize.INTEGER,
      references: { model: "roles", key: "id" }
    }
  },
  {
    // options
    underscored: true
  }
);
User.hasOne(Role);
const hash = function(value) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(value, salt);
  return hash;
};

User.belongsTo(Role, { onDelete: "restrict" });

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: false }).then(async act => {
/*   let exist = await User.findOne({
    where: { email: "myemailitsnotherelol@gmail.com" }
  });
  if (!exist) {
    await User.create({
      first_name: "Test",
      last_name: "TestLastName",
      email: "myemailitsnotherelol@gmail.com",
      password: "astrasd",
      role_id: 2
    });
  }
  console.log( "TERMINO USERS")
 */
});

module.exports = User;
