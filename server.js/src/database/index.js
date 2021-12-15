'use strict';

const config = require("../config/").dbConfig;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    useUTC: config.dialectOptions.useUTC, //for reading from database
    dateStrings: config.dialectOptions.dateStrings,
    typeCast: config.dialectOptions.typeCast
  },
  timezone: config.timezone //for writing to database
});

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const dir = path.join(__dirname, "../app/models");
const db = {};

fs
  .readdirSync(dir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(dir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ROLES = ["user", "admin"];

module.exports = db;