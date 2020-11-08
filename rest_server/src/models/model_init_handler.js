// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { get } = require('lodash');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');

const EXAMPLE_DIR1 = path.join(__dirname, '../../../examples/yaml_templates');
const EXAMPLE_DIR2 = path.join(__dirname, '../../../examples/item_protocols');

const createTemplates = async (models, dir, type) => {
  const files = await fs.readdir(dir);
  const templates = [];
  await Promise.all(
    files.map(async file => {
      const filePath = path.join(dir, file);
      const text = await fs.readFile(filePath, 'utf8');
      const template = yaml.safeLoad(text);
      templates.push(template);
      await models.MarketplaceItem.orm.create({
        name: template.name,
        author: template.contributor,
        type: type,
        category: 'OpenPAI Official',
        tags: ['official example'],
        summary: 'TODO...',
        protocol: text,
        useNumber: 0,
        starNumber: 0,
        createdAt: new Date().toISOString(),
      });
    }),
  );
  return templates;
};

const init = async models => {
  await models.sequelize.sync();
  await createTemplates(models, EXAMPLE_DIR1, 'old');
  await createTemplates(models, EXAMPLE_DIR2, 'template');
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
