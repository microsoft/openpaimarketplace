// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import Page from 'App/components/page';
import TopBar from './components/top_bar';
import Summary from './components/summary';
import PivotCard from './components/pivot_card';
import Context from 'App/context';
import Line from 'App/components/line';
import { getItem } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';

const MarketDetail = props => {
  const { api, user, token, isAdmin, routeProps } = props;
  const [marketItem, setMarketItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const itemId = qs.parse(routeProps.location.search).itemId;
      const marketItem = await getItem(itemId);
      setMarketItem(marketItem);
      setLoading(false);
    }
    fetchItem();
  });

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
          <TopBar pageType='detail' status={marketItem.status} />
          <Summary marketItem={marketItem} />
          <Line />
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
