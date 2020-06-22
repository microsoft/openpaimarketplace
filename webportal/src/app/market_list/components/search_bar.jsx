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



const SearchBar = props => {
  return (
    <SearchBox placehoder='Search'/>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
