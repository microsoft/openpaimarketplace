// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, getTheme } from 'office-ui-fabric-react';
import { cloneDeep, isNil } from 'lodash';

import Page from 'App/components/page';
import Context from 'App/context';
import DataSection from './components/data_section';
import ModelSection from './components/model_section';
import ConfirmSection from './components/confirm_section';
import { TopBar } from 'App/top_bar';

const CheckList = props => {
  const { api, user, token, isAdmin, routeProps } = props;
  const [dataItem, setDataItem] = useState(null);
  const [modelItem, setModelItem] = useState(null);

  useEffect(() => {
    const model = JSON.parse(window.localStorage.getItem('modelItem'));
    setModelItem(model);
  }, []);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('dataItem'));
    setDataItem(data);
  }, []);

  useEffect(() => {
    if (isNil(modelItem)) {
      return;
    }
    const newModel = cloneDeep(modelItem);
    const envs = newModel.content.environmentVariables;
    Object.keys(envs).map(key => {
      if (envs[key].type === 'data') {
        envs[key].value = isNil(dataItem)
          ? ''
          : `${dataItem.content.dataStorage.containerPath}${dataItem.content.dataStorage.subPath}`;
      }
      if (envs[key].type === 'output') {
        envs[key].value = isNil(get(modelItem, ['content', 'outputStorage']))
          ? ''
          : `${modelItem.content.outputStorage.containerPath}${modelItem.content.outputStorage.subPath}`;
      }
    });
    setModelItem(newModel);
  }, [dataItem]);

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
          <DataSection dataItem={dataItem} setDataItem={setDataItem} />
          <ModelSection
            dataItem={dataItem}
            modelItem={modelItem}
            setModelItem={setModelItem}
          />
          <ConfirmSection dataItem={dataItem} modelItem={modelItem} />
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
