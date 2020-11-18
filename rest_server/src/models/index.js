// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const MarketplaceItem = require('./marketplace_item');
const User = require('./user');
const Blob = require('./blob');
const dotnev = require('dotenv');

dotnev.config();

const DATABASE = process.env.DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
});

// TODO: ensure connection succeeds
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

const models = {
  MarketplaceItem: new MarketplaceItem(sequelize, DataTypes),
  User: new User(sequelize, DataTypes),
  Blob: new Blob(sequelize, DataTypes),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;
