// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useContext, useState } from 'react';
import { getTheme, Stack, Text, SearchBox } from 'office-ui-fabric-react';
import queryString from 'query-string';
import { isNil } from 'lodash';
import TypeFilter from './type_filter';
import Context from 'App/context';
import { TYPE_ENUM } from 'App/utils/constants';

const SideBar = () => {
  const [type, setType] = useState(null);
  const [keyword, setKeyword] = useState();
  const { spacing } = getTheme();
  const { history, user } = useContext(Context);

  const getQueryString = (type, keyword) => {
    let qs = '';
    if (isNil(keyword) || keyword === '') {
      if (isNil(type)) {
        qs = '';
      } else if (type === 'my') {
        qs = queryString.stringify({ author: user });
      } else {
        qs = queryString.stringify({ type });
      }
    } else {
      if (isNil(type)) {
        qs = queryString.stringify({ keyword });
      } else if (type === 'my') {
        qs = queryString.stringify({ author: user, keyword });
      } else {
        qs = queryString.stringify({ type, keyword });
      }
    }
    return qs;
  };

  const changeType = newType => {
    return () => {
      if (type === newType) {
        setType(null);
        const qs = getQueryString(null, keyword);
        history.push(`/?${qs}`);
      } else {
        setType(newType);
        const qs = getQueryString(newType, keyword);
        history.push(`/?${qs}`);
      }
    };
  };

  const searchKeyword = newKeyword => {
    setKeyword(newKeyword);
    const qs = getQueryString(type, newKeyword);
    history.push(`/?${qs}`);
  };

  return (
    <Stack
      styles={{ root: { width: 200, padding: `${spacing.s1}` } }}
      gap={spacing.l1}
    >
      <SearchBox onSearch={searchKeyword} />
      <Text variant={'large'}>Types</Text>
      <Stack>
        <TypeFilter
          text='All'
          selected={type === TYPE_ENUM.ALL}
          onClick={changeType(TYPE_ENUM.ALL)}
        />
        <TypeFilter
          text='Data Template'
          selected={type === TYPE_ENUM.DATA_TEMPLATE}
          onClick={changeType(TYPE_ENUM.DATA_TEMPLATE)}
        />
        <TypeFilter
          text='Job Template'
          selected={type === TYPE_ENUM.JOB_TEMPLATE}
          onClick={changeType(TYPE_ENUM.JOB_TEMPLATE)}
        />
        <TypeFilter
          text='Old Example'
          selected={type === TYPE_ENUM.OLD_TEMPLATE}
          onClick={changeType(TYPE_ENUM.OLD_TEMPLATE)}
        />
      </Stack>
      <Text variant={'large'}>My</Text>
      <TypeFilter
        text='My templates'
        selected={type === 'my'}
        onClick={changeType('my')}
      />
    </Stack>
  );
};

export default SideBar;
