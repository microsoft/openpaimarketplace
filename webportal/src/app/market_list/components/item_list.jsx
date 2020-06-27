// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import { Stack, Text, getTheme } from 'office-ui-fabric-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { capitalize, isNil } from 'lodash';

import ItemCard from './item_card';
import Line from 'App/components/line';
import { listItems } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';

const { spacing } = getTheme();

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m};
`;

const ItemList = props => {
  const { type } = props;
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const items = await listItems(type);
      setItemList(items);
      setLoading(false);
    }
    fetchData();
  }, [type]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <Stack gap={spacing.m}>
          <Text variant={'xxLarge'}>
            {isNil(type) ? 'All' : capitalize(type)}
          </Text>
          <Line />
          <GridWrapper>
            {itemList.map(item => (
              <ItemCard key={item.id} item={item} status={status} />
            ))}
          </GridWrapper>
        </Stack>
      )}
    </div>
  );
};

ItemList.propTypes = {
  type: PropTypes.string,
};

export default ItemList;
