const sequelize = require("sequelize");
const Sequelize = require("./db");
const Category = Sequelize.define(
  "categories",
  {
    // attributes
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    // options
    underscored: true
  }
);
/* 
Category.sync({ force: false }).then(async act => {
  let exist = await Category.findOne({ where: { name: "uncategorized" } });
  if (!exist) {
    Category.create({ name: "uncategorized" })
      .then(category => {
        console.log("created >>>,", { data: category });
      })
      .catch(err => {
        console.error({ error: err });
      });
  } 
});
*/
module.exports = Category;
