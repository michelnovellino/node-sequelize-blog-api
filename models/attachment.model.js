const sequelize = require("sequelize");
const Sequelize = require("./db");
 
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
    underscored: true
  }
);
/* Attachment.sync({ force: false }).then(act => {}); */ 
module.exports = Attachment;
