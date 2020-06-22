// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isNil, isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import {
  getTheme,
  CommandBarButton,
  SearchBox,
  Stack,
  FontWeights,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SideBar = props => {
  const { spacing } = getTheme();

  return (
    <Stack styles={{ root: { width: 200 } }}>
      <SearchBox placeholder='search' />
      <div>Types</div>
      <Stack horizontal horizontalAlign='space-between'>
        <div>All</div>
        <div>201</div>
      </Stack>
    </Stack>
  );
};

SideBar.propTypes = {};

export default SideBar;
