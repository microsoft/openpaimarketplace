// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FontSizes,
  FontWeights,
  Stack,
  Text,
  DefaultButton,
} from 'office-ui-fabric-react';
import { getTheme } from '@uifabric/styling';

const SelectFromJobList = ({ state, setState }) => {
  return <Text>Job list here.</Text>;
};

SelectFromJobList.propTypes = {
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default SelectFromJobList;
