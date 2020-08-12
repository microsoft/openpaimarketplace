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

const ShowStorage = storage => {
  switch (storage.storageType) {
    case 'nfs':
      return (
        <>
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
        </>
      );
    case 'gitRepository':
      return (
        <>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>URL:</Text>
            <Text>
              {storage.url}
            </Text>
          </Stack>
          <Stack horizontal verticalAlign='center' gap='m'>
            <Text>Path:</Text>
            <Text>
              {storage.path}
            </Text>
          </Stack>
        </>
      );
  }
}

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
          {ShowStorage(storage)}
        </Stack>
      )}
    </Wrapper>
  );
};

StorageCard.propTypes = {
  storage: PropTypes.object,
};

export default StorageCard;
