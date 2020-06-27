// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import c from 'classnames';
import { getTheme, Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import StorageCard from './storage_card';
import styled from 'styled-components';

const { palette } = getTheme();

const DataDetail = props => {
  const { marketItem } = props;

  return (
    <Stack gap='m'>
      <Text variant='large'>Data Storage</Text>
      <StorageCard storage={marketItem.content.dataStorage} />
    </Stack>
  );
};

DataDetail.propTypes = {
  marketItem: PropTypes.object,
};

export default DataDetail;
