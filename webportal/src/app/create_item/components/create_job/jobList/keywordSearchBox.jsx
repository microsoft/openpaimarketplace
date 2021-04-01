// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'office-ui-fabric-react';
import Filter from './filter';

const KeywordSearchBox = ({
  filter,
  setFilter,
  ordering,
  pagination,
  updateFilteredJobsInfo,
}) => {
  function onKeywordChange(keyword) {
    const newFilter = new Filter(keyword);
    setFilter(newFilter);
  }

  /** @type {import('office-ui-fabric-react').IStyle} */
  const rootStyles = {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 220,
  };
  return (
    <SearchBox
      underlined
      placeholder='Filter by keyword'
      styles={{ root: rootStyles }}
      value={filter.keyword}
      onChange={onKeywordChange}
    />
  );
};

KeywordSearchBox.propTypes = {
  filter: PropTypes.object,
  setFilter: PropTypes.func,
  ordering: PropTypes.object,
  pagination: PropTypes.object,
  updateFilteredJobsInfo: PropTypes.func,
};

export default KeywordSearchBox;
