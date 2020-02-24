const sequelize = require("sequelize");
const Sequelize = require("../models/db");
const Category = require("../models/categories.model");
const Tags = Sequelize.define(
  "tags",
  {
    // attributes
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    category_id: {
      type: sequelize.INTEGER,
      references: { model: "categories", key: "id" },
      allowNull: true
    }
  },
  {
    // options
    underscored: true
  }
);
Tags.belongsTo(Category, { onDelete: "restrict" });

Tags.sync({ force: false }).then(async act => {
  let exist = await Tags.findAll();

  if (!exist || exist.length <= 0) {
    await Tags.create({ name: "javascript", category_id: 1 });
    await Tags.create({ name: "php", category_id: 1 });
    await Tags.create({ name: "dart", category_id: 1 });
  }
  console.log( "TERMINO TAGS")
});
module.exports = Tags;
