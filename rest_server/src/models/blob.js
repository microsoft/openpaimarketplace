// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const modelSyncHandler = require('./model_init_handler');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Blob {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define('Blob', {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storageAccount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      containerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      connectionStrings: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      tokens: DataTypes.ARRAY(DataTypes.TEXT),
      users: DataTypes.ARRAY(DataTypes.STRING),
    });
  }

  associate(models) {
    this.models = models;
  }

  async list(type, storageAccount, containerName, user) {
    const handler = modelSyncHandler(
      async (type, storageAccount, containerName, user) => {
        const filterStatement = {};
        if (type && type !== 'all') {
          filterStatement.type = type;
        }
        if (storageAccount) {
          filterStatement.storageAccount = storageAccount;
        }
        if (containerName) {
          filterStatement.containerName = containerName;
        }
        if (user) {
          filterStatement.users = {
            [Op.contains]: user,
          };
        }
        const items = await this.orm.findAll({ where: filterStatement });
        return items;
      },
    );

    return await handler(
      type,
      storageAccount,
      containerName,
      user,
      this.models,
    );
  }

  async create(blobReq) {
    const handler = modelSyncHandler(async blobReq => {
      const item = await this.orm.create(blobReq);
      return item.id;
    });

    return await handler(blobReq, this.orm);
  }

  async get(blobId) {
    const handler = modelSyncHandler(async blobId => {
      const blob = await this.orm.findOne({
        where: { id: blobId },
      });
      if (isNil(blob)) {
        return null;
      } else {
        return blob;
      }
    });

    return await handler(blobId, this.models);
  }

  async update(blobId, newBlobReq) {
    const handler = modelSyncHandler(async (blobId, newBlobReq) => {
      const blob = await this.orm.findOne({
        where: { id: blobId },
      });
      if (isNil(blob)) {
        return null;
      } else {
        await blob.update(newBlobReq);

        return blob;
      }
    });

    return await handler(blobId, newBlobReq, this.models);
  }

  async del(blobId) {
    const handler = modelSyncHandler(async blobId => {
      const blob = await this.orm.findOne({
        where: { id: blobId },
      });
      if (isNil(blob)) {
        return null;
      } else {
        return await blob.destroy();
      }
    });

    return await handler(blobId, this.models);
  }
}

module.exports = Blob;
