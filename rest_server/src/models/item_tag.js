// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const modelSyncHandler = require('./model_init_handler');

class ItemTag {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define('ItemTag', {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      color: DataTypes.STRING,
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
      const tags = await this.orm.findAll();
      return tags;
    });

    return await handler(this.models);
  }

  async create(tagReq) {
    const handler = modelSyncHandler(async tagReq => {
      const tag = await this.orm.create(tagReq);
      return tag.id;
    });

    return await handler(tagReq, this.models);
  }

  async get(tagId) {
    const handler = modelSyncHandler(async tagId => {
      const tag = await this.orm.findOne({
        where: { id: tagId },
      });
      if (isNil(tag)) {
        return null;
      } else {
        return tag;
      }
    });

    return await handler(tagId, this.models);
  }

  async update(tagId, newTagReq) {
    const handler = modelSyncHandler(async (tagId, newTagReq) => {
      const tag = await this.orm.findOne({
        where: { id: tagId },
      });
      if (isNil(tag)) {
        return null;
      } else {
        await tag.update(newTagReq);
        return tag;
      }
    });

    return await handler(tagId, newTagReq, this.models);
  }

  async del(tagId) {
    const handler = modelSyncHandler(async tagId => {
      const tag = await this.orm.findOne({
        where: { id: tagId },
      });
      if (isNil(tag)) {
        return null;
      } else {
        return await tag.destroy();
      }
    });

    return await handler(tagId, this.models);
  }
}

module.exports = ItemTag;
