// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import {
  Stack,
  Link,
  ColorClassNames,
  FontWeights,
  FontSizes,
} from 'office-ui-fabric-react';
import c from 'classnames';
import t from '../../components/tachyons.scss';
import { FontClassNames } from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { isNil } from 'lodash';
import styled from 'styled-components';

import Filter from '../../models/filter';
import ItemCard from './item_card';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const ItemList = props => {
  const { itemList } = props;

  return (
    <GridWrapper>
      {itemList.map(item => (
        <ItemCard key={item.id} item={item} status={status} />
      ))}
    </GridWrapper>
  );
};
