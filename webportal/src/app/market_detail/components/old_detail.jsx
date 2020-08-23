// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTheme, Stack, Text } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import yaml from 'js-yaml';

const { palette, spacing } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.neutralLighterAlt};
  padding: ${spacing.m};
  white-space: pre-wrap;
`;

const OldDetail = props => {
  const { marketItem } = props;

  return (
    <Stack gap='m'>
      <Text variant='large'>Protocol</Text>
      <Wrapper>{yaml.safeDump(marketItem.protocol)}</Wrapper>
    </Stack>
  );
};

OldDetail.propTypes = {
  marketItem: PropTypes.object.isRequired,
};

export default OldDetail;
