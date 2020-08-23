// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTheme, Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isNil } from 'lodash';

const { palette, spacing } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.neutralLighterAlt};
  padding: ${spacing.m};
`;

const StorageCard = props => {
  const { storage } = props;

  return (
    <Wrapper>
      {isNil(storage) ? (
        <Text>There is no storage setting</Text>
      ) : (
        <Stack gap='m'>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Storage Type:</Text>
            <Text>{storage.type}</Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Storage Name:</Text>
            <Text>
              {storage.name}
            </Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Storage Path:</Text>
            <Text>
              {storage.uri}
            </Text>
          </Stack>
        </Stack>
      )}
    </Wrapper>
  );
};

StorageCard.propTypes = {
  storage: PropTypes.object,
};

export default StorageCard;
