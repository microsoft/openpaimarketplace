// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTheme, Stack, Text } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const { palette, spacing } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.neutralLighterAlt};
  padding: ${spacing.m};
  white-space: pre-wrap;
`;

const OldDetail = props => {
  const { marketItem } = props;
  const [protocolText, setProtocolText] = useState('');

  useEffect(() => {
    async function fetchProtocol() {
      const res = await fetch(
        `https://microsoft.github.io/openpaimarketplace/examples/yaml_templates/${marketItem.content.config}`,
      );
      const text = await res.text();
      setProtocolText(text);
    }
    fetchProtocol();
  }, []);

  return (
    <Stack gap='m'>
      <Text variant='large'>Protocol</Text>
      <Wrapper>{protocolText}</Wrapper>
    </Stack>
  );
};

OldDetail.propTypes = {
  marketItem: PropTypes.object.isRequired,
};

export default OldDetail;
