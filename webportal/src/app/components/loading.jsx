// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Text, Stack } from 'office-ui-fabric-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Loading = ({ label = 'Loading...' }) => {
  return (
    <Wrapper>
      <Stack>
        <Spinner size={SpinnerSize.large} />
        <Text variant='large'>{label}</Text>
      </Stack>
    </Wrapper>
  );
};

Loading.propTypes = {
  label: PropTypes.string,
};

export default Loading;
