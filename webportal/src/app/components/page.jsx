// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';

const { spacing } = getTheme();

const Page = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: ${spacing.l2} ;
`;

export default Page;




