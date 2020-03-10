const sequelize = require("sequelize");
const Sequelize = require("./db");
const { Entries } = require("./entry.model");
const Attachment = Sequelize.define(
  "attachments",
  {
    // attributes
    entry_id: {
      type: sequelize.INTEGER,
      references: { model: "entries", key: "id" },
      allowNull: false
    },
    image_uuid: {
      type: sequelize.STRING,
      allowNull: false
    },
    mime_type: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    // options
    underscored: true
  }
);
Entries.hasMany(Attachment);
/*  Attachment.sync({ force: false }).then(act => {});  */

module.exports = Attachment;
