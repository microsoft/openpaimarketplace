// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Fabric, FontClassNames } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';

import t from '../components/tachyons.scss';
import { TopBar } from 'App/top_bar';
import Summary from './components/summary';
import Detail from './components/detail';
import Context from 'App/context';
import { SpinnerLoading } from 'App/components/loading';
import { getItemById } from 'App/utils/marketplace_api';

const MarketDetail = props => {
  const { api, user, token, routeProps } = props;

  const [loading, setLoading] = useState(true);
  const [marketItem, setMarketItem] = useState(null);
  useEffect(() => {
    reload();
  }, []);

  async function reload() {
    let marketItem;
    try {
      const itemId = window.localStorage.getItem('itemId');
      marketItem = await getItemById(itemId);
    } catch (err) {
      alert(err.message);
    }
    // update states
    setMarketItem(marketItem);
    setLoading(false);
  }

  const context = {
    user,
    api,
    token,
    history: routeProps.history,
  };

  return (
    <Context.Provider value={context}>
      {loading && <SpinnerLoading />}
      {loading === false && (
        <Fabric style={{ height: '100%', margin: '0 auto', maxWidth: 1050 }}>
          <div className={classNames(t.w100, t.pa4, FontClassNames.medium)}>
            <TopBar pageType='detail' status={marketItem.status} />
            <Summary marketItem={marketItem} />
            <Detail marketItem={marketItem} />
          </div>
        </Fabric>
      )}
    </Context.Provider>
  );
};

MarketDetail.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  routeProps: PropTypes.object,
};

export default MarketDetail;
