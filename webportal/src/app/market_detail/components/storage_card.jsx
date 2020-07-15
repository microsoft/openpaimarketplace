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
            <Text>{storage.storageType}</Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Storage Path:</Text>
            <Text>
              {storage.serverPath}
              {storage.subPath}
            </Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Container Path:</Text>
            <Text>
              {storage.containerPath}
              {storage.subPath}
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
