// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
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
import Loading from 'App/components/loading';
import { listCategories } from 'App/utils/marketplace_api';

const { spacing, palette } = getTheme();

const MarketList = props => {
  const { api, user, token, isAdmin, routeProps } = props;
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const context = {
    api,
    user,
    token,
    isAdmin,
    history: routeProps.history,
    routeProps,
  };

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const allCategories = await listCategories();
        setCategories(allCategories.map(item => item.name));
        setLoading(false);
      } catch (e) {
        alert(e.message);
        setCategories([]);
        setLoading(false);
      }
    }
    fetchAllCategories();
  }, []);

  return (
    <Context.Provider value={context}>
      {loading && (
        <div style={{ height: '400px' }}>
          <Loading />
        </div>
      )}
      {!loading && (
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
              <SideBar categories={categories} />
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
                category={qs.parse(routeProps.location.search).category}
              />
            </StackItem>
          </Stack>
        </Page>
      )}
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
