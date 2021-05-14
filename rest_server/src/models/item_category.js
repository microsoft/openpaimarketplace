// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const modelSyncHandler = require('./model_init_handler');

class ItemCategory {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define('ItemCategory', {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      extras: DataTypes.TEXT,
    });
  }

  associate(models) {
    this.orm.belongsToMany(models.User.orm, {
      through: 'StarRelation',
    });
    this.models = models;
  }

  async list() {
    const handler = modelSyncHandler(async () => {
      const Categories = await this.orm.findAll();
      return Categories;
    });

    return await handler(this.models);
  }

  async create(categoryReq) {
    const handler = modelSyncHandler(async categoryReq => {
      const category = await this.orm.create(categoryReq);
      return category.id;
    });

    return await handler(categoryReq, this.models);
  }

  async get(categoryId) {
    const handler = modelSyncHandler(async categoryId => {
      const category = await this.orm.findOne({
        where: { id: categoryId },
      });
      if (isNil(category)) {
        return null;
      } else {
        return category;
      }
    });

    return await handler(categoryId, this.models);
  }

  async update(categoryId, newCategoryReq) {
    const handler = modelSyncHandler(async (categoryId, newCategoryReq) => {
      const category = await this.orm.findOne({
        where: { id: categoryId },
      });
      if (isNil(category)) {
        return null;
      } else {
        await category.update(newCategoryReq);
        return category;
      }
    });

    return await handler(categoryId, newCategoryReq, this.models);
  }

  async del(categoryId) {
    const handler = modelSyncHandler(async categoryId => {
      const category = await this.orm.findOne({
        where: { id: categoryId },
      });
      if (isNil(category)) {
        return null;
      } else {
        return await category.destroy();
      }
    });

    return await handler(categoryId, this.models);
  }
}

module.exports = ItemCategory;
