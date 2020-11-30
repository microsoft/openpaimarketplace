// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';
import CodeWrapper from 'App/components/code_wrapper';

const OldTemplateDetail = props => {
  const { marketItem } = props;

  return (
    <Stack gap='m'>
      <Text variant='large'>Protocol</Text>
      <CodeWrapper>{yaml.safeDump(marketItem.protocol)}</CodeWrapper>
    </Stack>
  );
};

OldTemplateDetail.propTypes = {
  marketItem: PropTypes.object.isRequired,
};

export default OldTemplateDetail;
