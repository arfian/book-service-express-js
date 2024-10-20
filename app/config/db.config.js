const { Sequelize, DataTypes } = require('sequelize');
const env = require("dotenv").config().parsed;

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "postgres",
  }
);

module.exports = {
  sequelize,
  DataTypes
};