// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class Ordering {
  constructor(field, descending = false) {
    this.field = field;
    this.descending = descending;
  }

  apply() {
    const { field, descending } = this;
    if (field === undefined) {
      return {};
    }

    let query;
    if (field === 'name') {
      query = 'jobName';
    } else if (field === 'submissionTime') {
      query = 'submissionTime';
    } else if (field === 'user') {
      query = 'username';
    } else if (field === 'virtualCluster') {
      query = 'vc';
    } else if (field === 'retries') {
      query = 'retries';
    } else if (field === 'taskCount') {
      query = 'totalTaskNumber';
    } else if (field === 'gpuCount') {
      query = 'totalGpuNumber';
    }

    return { order: `${query},${descending ? 'DESC' : 'ASC'}` };
  }
}

export default Ordering;
