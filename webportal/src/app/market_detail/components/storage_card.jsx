// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import c from 'classnames';
import { getTheme, Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isNil } from 'lodash';

const { palette, spacing } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.neutralLight};
  padding: ${spacing.m};
`;

const StorageCard = props => {
  const { storage } = props;

  return (
    <Wrapper>
      {isNil(storage) ? (
        <Text styles={{ root: { color: `${palette.blue}` } }}>
          There is no storage setting
        </Text>
      ) : (
        <Stack gap='m'>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Storage Type:</Text>
            <Text styles={{ root: { color: `${palette.blue}` } }}>
              {storage.storageType}
            </Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Storage Path:</Text>
            <Text styles={{ root: { color: `${palette.blue}` } }}>
              {storage.serverPath}
              {storage.subPath}
            </Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Container Path:</Text>
            <Text styles={{ root: { color: `${palette.blue}` } }}>
              {storage.containerPath}
              {storage.subPath}
            </Text>
          </Stack>
          {/* <Stack horizontal verticalAlign='center' gap='l1'>
        <Text variant='large'>Shared Groups:</Text>
        <Text variant='large' styles={{ root: { color: `${palette.blue}` } }}>
          {marketItem.content.groups.map(group => {
            return <div key={group}>{group}</div>;
          })}
        </Text>
      </Stack> */}
          {/* <Stack horizontal verticalAlign='center' gap='l1'>
        <Text variant='large'>Storage Name:</Text>
        <Text variant='large' styles={{ root: { color: `${palette.blue}` } }}>
          {marketItem.content.storageName}
        </Text>
      </Stack> */}
        </Stack>
      )}
    </Wrapper>
  );
};

StorageCard.propTypes = {
  storage: PropTypes.object,
};

export default StorageCard;
