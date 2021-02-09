// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import { Stack, Text, getTheme } from 'office-ui-fabric-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { capitalize, isNil } from 'lodash';
import ItemCard from './item_card';
import HorizontalLine from 'App/components/horizontal_line';
import { listItems } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';

const { spacing } = getTheme();

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m};
`;

const ItemList = props => {
  const { type, author, keyword } = props;
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const items = await listItems(type, author, keyword);
        setItemList(items);
        setLoading(false);
      } catch (e) {
        alert(e.message);
        setItemList([]);
        setLoading(false);
      }
    }
    fetchData();
  }, [type, author, keyword]);

  return (
    <div>
      {loading && (
        <div style={{ height: '400px' }}>
          <Loading />
        </div>
      )}
      {!loading && (
        <Stack gap={spacing.m}>
          <Text variant={'xxLarge'}>
            {isNil(type) ? 'All' : capitalize(type)}
          </Text>
          <HorizontalLine />
          <GridWrapper>
            {itemList.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </GridWrapper>
        </Stack>
      )}
    </div>
  );
};

ItemList.propTypes = {
  type: PropTypes.string,
  author: PropTypes.string,
  keyword: PropTypes.string,
};

export default ItemList;
