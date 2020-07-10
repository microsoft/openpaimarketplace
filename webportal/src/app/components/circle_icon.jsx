// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';

const { palette } = getTheme();

const CircleIcon = styled.div`
  background: ${palette.tealLight};
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default CircleIcon;
