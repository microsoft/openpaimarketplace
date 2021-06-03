// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useContext, useEffect, useState } from 'react';
import { getTheme, Stack, Text, SearchBox } from 'office-ui-fabric-react';
import { isEmpty } from 'lodash';
import FilterItem from './type_filter';
import Context from 'App/context';
import { TYPE_ENUM } from 'App/utils/constants';
import PropTypes from 'prop-types';

const SideBar = props => {
  const { categories } = props;
  const [currentType, setCurrentType] = useState(null);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { spacing } = getTheme();
  const { history, user, routeProps } = useContext(Context);

  useEffect(() => {
    const searchParams = new URLSearchParams(routeProps.location.search);
    setCurrentType(searchParams.get('type'));
    setCurrentAuthor(searchParams.get('author'));
    setCurrentCategory(searchParams.get('category'));
  }, []);

  const changeUrl = (section, value) => {
    return () => {
      const searchParams = new URLSearchParams(routeProps.location.search);
      if (section === 'keyword') {
        if (value === '') {
          searchParams.delete('keyword');
        } else {
          searchParams.set('keyword', value);
        }
      } else if (section === 'type') {
        if (currentType === value) {
          setCurrentType(null);
          searchParams.delete('type');
        } else {
          setCurrentType(value);
          searchParams.set('type', value);
        }
      } else if (section === 'author') {
        if (currentAuthor === value) {
          setCurrentAuthor(null);
          searchParams.delete('author');
        } else {
          setCurrentAuthor(value);
          searchParams.set('author', value);
        }
      } else if (section === 'category') {
        if (currentCategory === value) {
          setCurrentCategory(null);
          searchParams.delete('category');
        } else {
          setCurrentCategory(value);
          searchParams.set('category', value);
        }
      }
      history.push(`/?${searchParams.toString()}`);
    };
  };

  const searchKeyword = newKeyword => {
    changeUrl('keyword', newKeyword)();
  };

  return (
    <Stack
      styles={{ root: { width: 200, padding: `${spacing.s1}` } }}
      gap={spacing.l1}
    >
      <SearchBox onSearch={searchKeyword} />
      <Text variant={'large'}>Types</Text>
      <Stack>
        <FilterItem
          text='All'
          selected={currentType === TYPE_ENUM.ALL}
          onClick={changeUrl('type', TYPE_ENUM.ALL)}
        />
        <FilterItem
          text='Data Template'
          selected={currentType === TYPE_ENUM.DATA_TEMPLATE}
          onClick={changeUrl('type', TYPE_ENUM.DATA_TEMPLATE)}
        />
        <FilterItem
          text='Job Template'
          selected={currentType === TYPE_ENUM.JOB_TEMPLATE}
          onClick={changeUrl('type', TYPE_ENUM.JOB_TEMPLATE)}
        />
        <FilterItem
          text='Old Example'
          selected={currentType === TYPE_ENUM.OLD_TEMPLATE}
          onClick={changeUrl('type', TYPE_ENUM.OLD_TEMPLATE)}
        />
      </Stack>
      <Text variant={'large'}>My</Text>
      <FilterItem
        text='My templates'
        selected={currentAuthor === user}
        onClick={changeUrl('author', user)}
      />
      <Text variant={'large'}>Categories</Text>
      <Stack>
        {!isEmpty(categories) &&
          categories.map(category => {
            return (
              <FilterItem
                key={category}
                text={category}
                selected={currentCategory === category}
                onClick={changeUrl('category', category)}
              />
            );
          })}
      </Stack>
    </Stack>
  );
};

SideBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default SideBar;
