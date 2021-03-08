// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { get } = require('lodash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const tableName = 'MarketplaceItems';
    await queryInterface.addColumn(tableName, 'source', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'marketplace',
    });
    await queryInterface.addColumn(tableName, 'isPublic', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn(tableName, 'isPrivate', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
    await queryInterface.addColumn(tableName, 'groupList', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: [],
    });
  },
  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const tableName = 'MarketplaceItems';
    await queryInterface.removeColumn(tableName, 'source');
    await queryInterface.removeColumn(tableName, 'isPublic');
    await queryInterface.removeColumn(tableName, 'isPrivate');
    await queryInterface.removeColumn(tableName, 'groupList');
    if (get(queryInterface, 'dropEnum')) {
      await queryInterface.dropEnum('enum_MarketplaceItems_source');
    }
  },
};
