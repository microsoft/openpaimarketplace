// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import StorageCard from './storage_card';

const OldDetail = props => {
  const { marketItem } = props;

  return (
    <Stack gap='m'>
      <Text variant='large'>Protocol</Text>
      <StorageCard storage={marketItem.content.dataStorage} />
    </Stack>
  );
};

DataDetail.propTypes = {
  marketItem: PropTypes.object.isRequired,
};

export default OldDetail;
