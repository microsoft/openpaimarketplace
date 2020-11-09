// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { get } = require('lodash');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const { MARKET_ITEM_LIST } = require('../../../examples/constants');

const EXAMPLE_DIR1 = path.join(__dirname, '../../../examples/yaml_templates');
const EXAMPLE_DIR2 = path.join(__dirname, '../../../examples/item_protocols');

const createTemplates = async (models) => {
  const templates = [];
  await Promise.all(
    MARKET_ITEM_LIST.map(async item => {
      const filePath = path.join(
        item.type === 'old' ? EXAMPLE_DIR1 : EXAMPLE_DIR2, item.protocol
      );
      const text = await fs.readFile(filePath, 'utf8');
      const template = yaml.safeLoad(text);
      templates.push(template);
      const newItem = {
        ...item,
        ...{ protocol: text },
        ...{ categories: Array.isArray(item.categories) ? item.categories : [item.categories] }
      };
      await models.MarketplaceItem.orm.create(newItem);
    })
  );

  return templates;
};

const init = async models => {
  await models.sequelize.sync();
  await createTemplates(models);
};

const modelSyncHandler = fn => {
  return async (...args) => {
    try {
      return await fn(...args.slice(0, args.length - 1));
    } catch (error) {
      if (get(error, 'original.code') === '42P01') {
        // Error 42P01: relation does not exist
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
