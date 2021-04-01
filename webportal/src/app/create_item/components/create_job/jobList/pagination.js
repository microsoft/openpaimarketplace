// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class Pagination {
  constructor(itemsPerPage = 10, pageIndex = 0) {
    this.itemsPerPage = itemsPerPage;
    this.pageIndex = pageIndex;
  }

  apply() {
    const { itemsPerPage, pageIndex } = this;
    const start = itemsPerPage * pageIndex;
    return {
      offset: start,
      limit: itemsPerPage,
    };
  }
}

export default Pagination;
