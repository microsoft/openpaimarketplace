// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, getTheme } from 'office-ui-fabric-react';

import Page from 'App/components/page';
import Context from 'App/context';
import DataSection from './components/data_section';
import ModelSection from './components/model_section';
import ConfirmSection from './components/confirm_section';
import { TopBar } from 'App/top_bar';

const CheckList = props => {
  const { api, user, token, isAdmin, routeProps } = props;

  const context = {
    user,
    api,
    token,
    isAdmin,
    history: routeProps.history,
  };

  return (
    <Context.Provider value={context}>
      <Page>
        <Stack gap='l2'>
          <TopBar />
          <DataSection />
          <ModelSection />
          <ConfirmSection />
        </Stack>
      </Page>
    </Context.Provider>
  );
};

CheckList.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
  routeProps: PropTypes.object,
};

export default CheckList;
