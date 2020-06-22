// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import {
  Fabric,
  Stack,
  StackItem,
  Pivot,
  PivotItem,
  getTheme,
} from 'office-ui-fabric-react';
import { isNil } from 'lodash';
import qs from 'query-string';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TopBar } from 'App/top_bar';
import Context from '../context';
import SideBar from './components/side_bar';

import { getPendingItems, ensureUser } from 'App/utils/marketplace_api';
import { MARKET_ITEM_LIST } from 'App/utils/constants';
import { ItemList } from './components/item_list';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
`;

const MarketList = props => {
  const {spacing} = getTheme()
  const { api, user, token, isAdmin, routeProps } = props;
  const [itemList, setItemList] = useState(MARKET_ITEM_LIST);

  const context = {
    api,
    user,
    token,
    isAdmin,
    history: routeProps.history,
  };

  return (
    <Context.Provider value={context}>
      <Wrapper>
        <Stack horizontal horizontalAlign='center' gap={spacing.l1}>
          <StackItem>
            <SideBar></SideBar>
          </StackItem>
          <StackItem grow={1}>
            <ItemList itemList={itemList} />
          </StackItem>
        </Stack>
      </Wrapper>
    </Context.Provider>
  );
};

MarketList.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
  routeProps: PropTypes.object,
};

export default MarketList;
