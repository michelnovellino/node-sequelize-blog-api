const sequelize = require("sequelize");
const Sequelize = require("./db");
const Entry = require("./entries.model");

const Attachment = Sequelize.define(
  "attachments",
  {
    // attributes
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
  }
);
Attachment.belongsTo(Entry);
module.exports = Attachment;
