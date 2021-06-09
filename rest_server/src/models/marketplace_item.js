// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil, toLower } = require('lodash');
const { Op, fn, col, where, cast } = require('sequelize');
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
      source: {
        type: DataTypes.ENUM('marketplace', 'pai'),
        allowNull: false,
        defaultValue: 'marketplace',
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      groupList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      dataType: DataTypes.STRING,
      dataUrl: DataTypes.STRING,
      useBlob: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
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
    this.orm.belongsToMany(models.ItemTag.orm, {
      through: 'ItemTagRelation',
    });
    this.orm.belongsToMany(models.ItemCategory.orm, {
      through: 'ItemCategoryRelation',
    });
    this.models = models;
  }

  async list(name, author, type, source, keyword, tags, categories, userInfo) {
    const handler = modelSyncHandler(
      async (name, author, type, source, keyword, tags, categories) => {
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
        if (source) {
          filterStatement.source = source;
        }
        if (keyword) {
          const lowerKeyword = toLower(keyword);
          filterStatement[Op.or] = [
            {
              name: where(
                fn('LOWER', col('"MarketplaceItem"."name"')),
                Op.substring,
                `%${lowerKeyword}%`,
              ),
            },
            {
              author: where(
                fn('LOWER', col('"MarketplaceItem"."author"')),
                Op.substring,
                `%${lowerKeyword}%`,
              ),
            },
            {
              summary: where(
                fn('LOWER', col('"MarketplaceItem"."summary"')),
                Op.substring,
                `%${lowerKeyword}%`,
              ),
            },
          ];
        }
        if (!userInfo.admin) {
          filterStatement[Op.or] = [
            {
              isPublic: {
                [Op.eq]: true,
              },
            },
            {
              [Op.and]: [
                {
                  isPrivate: {
                    [Op.eq]: true,
                  },
                },
                {
                  author: {
                    [Op.eq]: userInfo.username,
                  },
                },
              ],
            },
            {
              [Op.and]: [
                {
                  isPublic: {
                    [Op.eq]: false,
                  },
                  isPrivate: {
                    [Op.eq]: false,
                  },
                  groupList: {
                    [Op.overlap]: userInfo.groupList,
                  },
                },
              ],
            },
          ];
        }

        const havings = [];
        const havingArrayAgg = (queryParameter, colName) => {
          if (queryParameter) {
            havings.push({
              where: where(
                fn('array_agg', col(colName)),
                Op.contains,
                cast(queryParameter, 'varchar[]'),
              ),
            });
          }
        };
        havingArrayAgg(tags, 'ItemTags.name');
        havingArrayAgg(categories, 'ItemCategories.name');

        const items = await this.orm.findAll({
          where: filterStatement,
          having: havings,
          group: [
            'MarketplaceItem.id',
            'ItemTags.id',
            'ItemTags->ItemTagRelation.createdAt',
            'ItemTags->ItemTagRelation.updatedAt',
            'ItemTags->ItemTagRelation.MarketplaceItemId',
            'ItemTags->ItemTagRelation.ItemTagId',
            'ItemCategories.id',
            'ItemCategories->ItemCategoryRelation.createdAt',
            'ItemCategories->ItemCategoryRelation.updatedAt',
            'ItemCategories->ItemCategoryRelation.MarketplaceItemId',
            'ItemCategories->ItemCategoryRelation.ItemCategoryId',
          ],
          include: [
            {
              attributes: ['id', 'name', 'color'],
              model: this.models.ItemTag.orm,
              through: { attributes: [] },
            },
            {
              attributes: ['id', 'name'],
              model: this.models.ItemCategory.orm,
              through: { attributes: [] },
            },
          ],
        });
        return items;
      },
    );

    return await handler(
      name,
      author,
      type,
      source,
      keyword,
      tags,
      categories,
      this.models,
    );
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

  async getTags(item) {
    const handler = modelSyncHandler(async item => {
      return await item.getItemTags();
    });

    return await handler(item, this.models);
  }

  async addTag(item, tagId) {
    const handler = modelSyncHandler(async item => {
      return await item.addItemTag(tagId);
    });

    return await handler(item, this.models);
  }

  async deleteTag(item, tagId) {
    const handler = modelSyncHandler(async item => {
      return await item.removeItemTag(tagId);
    });

    return await handler(item, this.models);
  }

  async getCategories(item) {
    const handler = modelSyncHandler(async item => {
      return await item.getItemCategories();
    });

    return await handler(item, this.models);
  }

  async addCategory(item, tagId) {
    const handler = modelSyncHandler(async item => {
      return await item.addItemCategory(tagId);
    });

    return await handler(item, this.models);
  }

  async deleteCategory(item, tagId) {
    const handler = modelSyncHandler(async item => {
      return await item.removeItemCategory(tagId);
    });

    return await handler(item, this.models);
  }
}

module.exports = MarketplaceItem;
