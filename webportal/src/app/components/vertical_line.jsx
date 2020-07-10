// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';

const { palette } = getTheme();

const VerticalLine = styled.div`
  display: block;
  width: 2px;
  background-color: ${palette.neutralSecondary};
  border: 0;
  margin: 0 1px;
  padding: 0;
`;

export default VerticalLine;
