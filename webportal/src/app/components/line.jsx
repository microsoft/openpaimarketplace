// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';

const { spacing, palette } = getTheme();

const Line = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1px 0;
  padding: 0;
`;

export default Line;
