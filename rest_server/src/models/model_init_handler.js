// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { get } = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const { EXAMPLE_LIST } = require('../../../examples/examples');

const protocolDir = path.join(__dirname, '../../../examples/item_protocols');
const descriptionDir = path.join(
  __dirname,
  '../../../examples/item_descriptions',
);

const createTemplates = async models => {
  await Promise.all(
    EXAMPLE_LIST.map(async item => {
      try {
        const protocolFilePath = path.join(
          item.type === 'old'
            ? path.join(protocolDir, 'old_templates')
            : protocolDir,
          item.protocol,
        );
        const descriptionFilePath =
          item.type === 'old'
            ? null
            : path.join(descriptionDir, item.description);
        const protocolText = await fs.readFile(protocolFilePath, 'utf8');
        let descriptionText = `# ${item.name}`;
        if (await fs.pathExists(descriptionFilePath)) {
          descriptionText = await fs.readFile(descriptionFilePath, 'utf8');
        } else if (item.type === 'old') {
          descriptionText = yaml.safeLoad(protocolText).description;
        }
        const newItem = {
          ...item,
          protocol: protocolText,
          description: descriptionText,
          isPublic: true,
          source: 'marketplace',
          isPrivate: false,
          ...{
            categories: Array.isArray(item.categories)
              ? item.categories
              : [item.categories],
          },
        };
        await models.MarketplaceItem.orm.create(newItem);
      } catch (err) {
        console.log(err.message);
      }
    }),
  );
};

const createStorageBlobs = async models => {
  try {
    if (process.env.AZURE_STORAGE) {
      const envBlob = JSON.parse(process.env.AZURE_STORAGE);
      const defaultBlob = {
        type: envBlob.type,
        storageAccount: envBlob.storage_account,
        containerName: 'marketplace',
        connectionStrings: envBlob.connection_strings,
        tokens: [''],
        users: [''],
      };
      await models.Blob.orm.create(defaultBlob);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const init = async models => {
  await models.sequelize.sync();
  await createTemplates(models);
  await createStorageBlobs(models);
};

const modelSyncHandler = fn => {
  return async (...args) => {
    try {
      return await fn(...args.slice(0, args.length - 1));
    } catch (error) {
      if (get(error, 'original.code') === '42P01') {
        // Error 42P01: relation(target table) does not exist
        await init(args[args.length - 1]);
        return await fn(...args.slice(0, args.length - 1));
      } else {
        throw error;
      }
    }
  };
};

// module exports
module.exports = modelSyncHandler;
