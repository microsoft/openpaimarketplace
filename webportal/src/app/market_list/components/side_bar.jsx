// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useContext } from 'react';
import {
  getTheme,
  SearchBox,
  Stack,
  Text,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import FilterItem from './filter_item';
import Context from 'App/context';

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
    <Stack styles={{ root: { width: 200 } }} gap={spacing.l1}>
      <SearchBox placeholder='search' />
      <Text variant={'large'}>Types</Text>
      <Stack>
        <FilterItem
          text='All'
          selected={type === 'all'}
          onChange={changeFilter('all')}
        />
        <FilterItem
          text='Data'
          selected={type === 'data'}
          onChange={changeFilter('data')}
        />
        <FilterItem
          text='Model'
          selected={type === 'model'}
          onChange={changeFilter('model')}
        />
        <FilterItem
          text='Job Template'
          selected={type === 'template'}
          onChange={changeFilter('template')}
        />
      </Stack>
      <Text variant={'large'}>Categories</Text>
      <Stack>
        <FilterItem text='Tensorflow' />
        <FilterItem text='Pytorch' />
      </Stack>
    </Stack>
  );
};

SideBar.propTypes = {
  type: PropTypes.string,
};

export default SideBar;
