// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';

const { spacing } = getTheme();

const Page = styled.div`
  margin: 0 ${spacing.l1};
  padding: ${spacing.l2};
  max-width: 1300px;
`;

export default Page;
