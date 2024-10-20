const { sequelize, DataTypes } = require("../../config/db.config");

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
});

module.exports = Book;