// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

class Filter {
  constructor(keyword = '') {
    this.keyword = keyword;
  }

  apply() {
    return { keyword: this.keyword, state: 'SUCCEEDED' };
  }
}

export default Filter;
