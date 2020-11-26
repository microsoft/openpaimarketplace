// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import StorageCard from './storage_card';

const DataTemplateDetail = props => {
  const { marketItem } = props;
  const dataStorages = marketItem.protocol.prerequisites.filter(
    item => item.type === 'data',
  );

  return (
    <Stack gap='m'>
      <Text variant='large'>Data Storage</Text>
      <StorageCard storages={dataStorages} />
    </Stack>
  );
};

DataTemplateDetail.propTypes = {
  marketItem: PropTypes.object.isRequired,
};

export default DataTemplateDetail;
