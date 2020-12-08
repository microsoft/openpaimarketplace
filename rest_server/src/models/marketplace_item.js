// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const { Op } = require('sequelize');
const modelSyncHandler = require('./model_init_handler');

class MarketplaceItem {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define('MarketplaceItem', {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      type: DataTypes.STRING,
      dataType: DataTypes.STRING,
      dataUrl: DataTypes.STRING,
      categories: DataTypes.ARRAY(DataTypes.STRING),
      tags: DataTypes.ARRAY(DataTypes.STRING),
      summary: DataTypes.STRING,
      description: DataTypes.TEXT,
      protocol: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      useNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      starNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: DataTypes.ENUM('pending', 'approved', 'rejected'),
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  }

  associate(models) {
    this.orm.belongsToMany(models.User.orm, {
      through: 'StarRelation',
    });
    this.models = models;
  }

  async list(name, author, type, keyword) {
    const handler = modelSyncHandler(async (name, author, type, keyword) => {
      const filterStatement = {};
      if (name) {
        filterStatement.name = name;
      }
      if (author) {
        filterStatement.author = author;
      }
      if (type && type !== 'all') {
        filterStatement.type = type;
      }
      if (keyword && !['null', 'Null', 'NULL'].includes(keyword)) {
        filterStatement[Op.or] = [
          { name: { [Op.substring]: keyword } },
          { author: { [Op.substring]: keyword } },
          { summary: { [Op.substring]: keyword } },
        ];
      }
      const items = await this.orm.findAll({ where: filterStatement });
      return items;
    });

    return await handler(name, author, type, keyword, this.models);
  }

  async create(itemReq) {
    const handler = modelSyncHandler(async itemReq => {
      const item = await this.orm.create(itemReq);
      return item.id;
    });

    return await handler(itemReq, this.models);
  }

  async get(itemId) {
    const handler = modelSyncHandler(async itemId => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        return item;
      }
    });

    return await handler(itemId, this.models);
  }

  async update(itemId, newItemReq) {
    const handler = modelSyncHandler(async (itemId, newItemReq) => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        await item.update(newItemReq);

        return item;
      }
    });

    return await handler(itemId, newItemReq, this.models);
  }

  async updateDescription(itemId, description) {
    const handler = modelSyncHandler(async (itemId, description) => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        await item.update({ description: description });
        return item;
      }
    });

    return await handler(itemId, description, this.models);
  }

  async updateStatus(itemId, status) {
    const handler = modelSyncHandler(async (itemId, status) => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        await item.update({ status: status });
        return item;
      }
    });

    return await handler(itemId, status, this.models);
  }

  async updateSubmits(itemId) {
    const handler = modelSyncHandler(async itemId => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        await item.increment('submits');
        return item;
      }
    });

    return await handler(itemId, this.models);
  }

  async del(itemId) {
    const handler = modelSyncHandler(async itemId => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        return await item.destroy();
      }
    });

    return await handler(itemId, this.models);
  }

  async listStarUsers(itemId) {
    const handler = modelSyncHandler(async itemId => {
      const item = await this.orm.findOne({
        where: { id: itemId },
      });
      if (isNil(item)) {
        return null;
      } else {
        return await item.getUsers();
      }
    });

    return await handler(itemId, this.models);
  }
}

module.exports = MarketplaceItem;
