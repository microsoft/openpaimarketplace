// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const modelSyncHandler = require('./model_init_handler');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Blob {
  constructor(sequelize, DataTypes) {
    this.orm = sequelize.define('MarketplaceItem', {
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      tokens: DataTypes.ARRAY(DataTypes.STRING),
      users: DataTypes.ARRAY(DataTypes.STRING),
    });
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

    return await handler(type, storageAccount, containerName, user, this.orm);
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

    return await handler(blobId, this.orm);
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

    return await handler(blobId, newBlobReq, this.orm);
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

    return await handler(blobId, this.orm);
  }
}

module.exports = Blob;
