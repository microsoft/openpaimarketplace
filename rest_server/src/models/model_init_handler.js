// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { get } = require('lodash');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');

const EXAMPLE_DIR = path.join(__dirname, '../../examples/yaml_templates');

const createTemplates = async models => {
  const files = await fs.readdir(EXAMPLE_DIR);
  const templates = [];
  await Promise.all(
    files.map(async file => {
      const filePath = path.join(EXAMPLE_DIR, file);
      const text = await fs.readFile(filePath, 'utf8');
      const template = yaml.safeLoad(text);
      templates.push(template);
      await models.MarketplaceItem.orm.create({
        name: template.name,
        author: template.contributor,
        category: 'OpenPAI Official',
        tags: ['official example'],
        introduction: template.name,
        description: template.description,
        jobConfig: template, // TODO: protocol validation in the future
        submits: 0,
        starNumber: 0,
        status: 'approved',
      });
    }),
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
