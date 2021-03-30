// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import {
  DefaultButton,
  Stack,
  StackItem,
  getTheme,
} from 'office-ui-fabric-react';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import Context from '../context';
import SideBar from './components/side_bar';
import ItemList from './components/item_list';
import Page from 'App/components/page';
import { TYPE_ENUM } from 'App/utils/constants';

const { spacing, palette } = getTheme();

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
        <Stack horizontal horizontalAlign='end'>
          <DefaultButton
            iconProps={{ iconName: 'Add' }}
            text='Create'
            href={`${
              window.location.href.split(/\?type=|\?author=/)[0]
            }create_item`}
            styles={{
              root: {
                backgroundColor: palette.white,
                borderColor: palette.blackTranslucent40,
              },
            }}
          />
        </Stack>
        <Stack horizontal gap={spacing.l1}>
          <StackItem>
            <SideBar />
          </StackItem>
          <StackItem grow={1}>
            <ItemList
              type={
                isNil(qs.parse(routeProps.location.search).type)
                  ? TYPE_ENUM.ALL
                  : qs.parse(routeProps.location.search).type
              }
              author={qs.parse(routeProps.location.search).author}
              keyword={qs.parse(routeProps.location.search).keyword}
            />
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
