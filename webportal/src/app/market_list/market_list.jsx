// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import {
  Stack,
  StackItem,
  getTheme,
} from 'office-ui-fabric-react';
import qs from 'query-string';
import PropTypes from 'prop-types';

import Context from '../context';
import SideBar from './components/side_bar';

import ItemList from './components/item_list';
import Page from 'App/components/page';

const { spacing } = getTheme();

const MarketList = props => {
  const { api, user, token, isAdmin, routeProps } = props;

  const context = {
    api,
    user,
    token,
    isAdmin,
    history: routeProps.history,
  };

  return (
    <Context.Provider value={context}>
      <Page>
        <Stack horizontal horizontalAlign='center' gap={spacing.l1}>
          <StackItem>
            <SideBar type={qs.parse(routeProps.location.search).type} />
          </StackItem>
          <StackItem grow={1}>
            <ItemList type={qs.parse(routeProps.location.search).type} />
          </StackItem>
        </Stack>
      </Page>
    </Context.Provider>
  );
};

MarketList.propTypes = {
  api: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  routeProps: PropTypes.object.isRequired,
};

export default MarketList;
