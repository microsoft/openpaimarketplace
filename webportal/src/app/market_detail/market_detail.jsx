// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import Page from 'App/components/page';
import TopBar from './components/top_bar';
import Summary from './components/summary';
import PivotCard from './components/pivot_card';
import Context from 'App/context';
import HorizontalLine from 'App/components/horizontal_line';
import { getItem } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';

const marketItemReducer = (state, action) => {
  switch (action.type) {
    case 'setItem':
      return action.value;
    case 'setName':
      return { ...state, name: action.value };
    case 'setSummary':
      return { ...state, summary: action.value };
    case 'setDescription':
      return { ...state, description: action.value };
    case 'setPublic':
      return { ...state, isPublic: true, isPrivate: false, groupList: [] };
    case 'setPrivate':
      return { ...state, isPrivate: true, isPublic: false, groupList: [] };
    case 'setGroupList':
      return {
        ...state,
        isPublic: false,
        isPrivate: false,
        groupList: action.value,
      };
    default:
      throw new Error();
  }
};

const MarketDetail = props => {
  const { api, user, token, isAdmin, routeProps } = props;
  const [marketItem, marketItemDispatch] = useReducer(marketItemReducer, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const itemId = qs.parse(routeProps.location.search).itemId;
      const newMarketItem = await getItem(itemId);
      marketItemDispatch({ type: 'setItem', value: newMarketItem });
      setLoading(false);
    }
    fetchItem();
  }, []);

  const context = {
    user,
    api,
    token,
    isAdmin,
    history: routeProps.history,
  };

  return (
    <Context.Provider value={context}>
      {loading && <Loading />}
      {!loading && (
        <Page>
          <TopBar />
          <Summary
            marketItem={marketItem}
            marketItemDispatch={marketItemDispatch}
          />
          <HorizontalLine />
          <PivotCard marketItem={marketItem} />
        </Page>
      )}
    </Context.Provider>
  );
};

MarketDetail.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
  routeProps: PropTypes.object,
};

export default MarketDetail;
