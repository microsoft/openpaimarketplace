// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useContext } from 'react';
import { getTheme, Stack, Text, SearchBox } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import FilterItem from './filter_item';
import Context from 'App/context';
import { TYPE_ENUM } from 'App/utils/constants';

const SideBar = props => {
  const { type } = props;
  const { spacing } = getTheme();
  const { history } = useContext(Context);

  const changeFilter = filter => {
    return selected => {
      if (selected) {
        history.push('/');
      } else {
        history.push(`/?type=${filter}`);
      }
    };
  };

  return (
    <Stack
      styles={{ root: { width: 200, padding: `${spacing.s1}` } }}
      gap={spacing.l1}
    >
      <SearchBox />
      <Text variant={'large'}>Types</Text>
      <Stack>
        <FilterItem
          text='All'
          selected={type === TYPE_ENUM.ALL}
          onChange={changeFilter(TYPE_ENUM.ALL)}
        />
        <FilterItem
          text='Data Template'
          selected={type === TYPE_ENUM.DATA_TEMPLATE}
          onChange={changeFilter(TYPE_ENUM.DATA_TEMPLATE)}
        />
        <FilterItem
          text='Job Template'
          selected={type === TYPE_ENUM.JOB_TEMPLATE}
          onChange={changeFilter(TYPE_ENUM.JOB_TEMPLATE)}
        />
        <FilterItem
          text='Old Example'
          selected={type === TYPE_ENUM.OLD_TEMPLATE}
          onChange={changeFilter(TYPE_ENUM.OLD_TEMPLATE)}
        />
      </Stack>
    </Stack>
  );
};

SideBar.propTypes = {
  type: PropTypes.string,
};

export default SideBar;
