// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import Filter from './filter';
import Pagination from './pagination';

export default React.createContext({
  itemList: null,
  filteredItems: null,
  filter: new Filter(),
  setFilter(filter) {
    this.filter = filter;
  },
  pagination: new Pagination(),
  setPagination(pagination) {
    this.pagination = pagination;
  },
  api: null,
  user: null,
  token: null,
  history: null,
});
