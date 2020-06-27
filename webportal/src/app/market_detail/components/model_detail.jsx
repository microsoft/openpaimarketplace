// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import c from 'classnames';
import { getTheme, Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import StorageCard from './storage_card';
import styled from 'styled-components';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.neutralLight};
  padding: ${spacing.m};
`;

const ModelDetail = props => {
  const { marketItem } = props;

  return (
    <Stack gap='m'>
      <Stack horizontal verticalAlign='center' gap='l1'>
        <Text variant='large'>Docker Image:</Text>
        <Text variant='large' styles={{ root: { color: `${palette.blue}` } }}>
          {marketItem.content.dockerImage}
        </Text>
      </Stack>
      <Stack gap='m'>
        <Text variant='large'>Code Storage:</Text>
        <StorageCard storage={marketItem.content.codeStorage} />
      </Stack>
      <Stack gap='m'>
        <Text variant='large'>Ouput Storage:</Text>
        <StorageCard storage={marketItem.content.outputStorage} />
      </Stack>
      <Stack horizontal verticalAlign='center' gap='l1'>
        <Text variant='large'>Environment Variables:</Text>
        {marketItem.content.environmentVariables.map(env => (
          <Text key={env.name} styles={{ root: { color: `${palette.blue}` } }}>
            {env.name}
          </Text>
        ))}
      </Stack>
      <Stack gap='m'>
        <Text variant='large'>Commands:</Text>
        <Wrapper>
          <Stack gap='s2'>
            {marketItem.content.commands.map(command => (
              <Text
                key={command}
                styles={{ root: { color: `${palette.blue}` } }}
              >
                {command}
              </Text>
            ))}
          </Stack>
        </Wrapper>
      </Stack>
    </Stack>
  );
};

ModelDetail.propTypes = {
  marketItem: PropTypes.object,
};

export default ModelDetail;
