// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack } from 'office-ui-fabric-react';
import { listJobs } from 'App/utils/pai_api';
import { getTheme } from '@uifabric/styling';

import Loading from 'App/components/loading';
import Table from './table';
import Filter from './filter';
import Ordering from './ordering';
import Pagination from './pagination';
import Paginator from './paginator';
import KeywordSearchBox from './keywordSearchBox';

const JobList = ({ api, state, setState }) => {
  const [filteredJobsInfo, setFilteredJobsInfo] = useState({
    totalCount: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(new Filter());
  const [ordering, setOrdering] = useState(new Ordering());
  const [pagination, setPagination] = useState(new Pagination());

  const updateFilteredJobsInfo = (filter, ordering, pagination) => {
    if (!loading) {
      setLoading(true);
      listJobs(api, {
        ...filter.apply(),
        ...ordering.apply(),
        ...pagination.apply(),
        ...{ withTotalCount: true },
      })
        .then(data => {
          setLoading(false);
          setFilteredJobsInfo(data);
        })
        .catch(err => {
          setLoading(false);
          alert(err.data.message || err.message);
          throw Error(err.data.message || err.message);
        });
    }
  };

  useEffect(() => {
    state.selectedJob = undefined;
    updateFilteredJobsInfo(filter, ordering, pagination);
  }, [filter, ordering, pagination]);

  const { spacing } = getTheme();

  return (
    <Stack
      verticalFill
      styles={{
        root: {
          position: 'relative',
          padding: `${spacing.s1} ${spacing.l1} ${spacing.l1}`,
        },
      }}
    >
      <Stack.Item>
        <KeywordSearchBox
          filter={filter}
          setFilter={setFilter}
          ordering={ordering}
          pagination={pagination}
          updateFilteredJobsInfo={updateFilteredJobsInfo}
        />
      </Stack.Item>
      <Stack.Item
        grow
        styles={{
          root: {
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'white',
            padding: spacing.l1,
          },
        }}
      >
        <Table
          filteredJobsInfo={filteredJobsInfo}
          filter={filter}
          setFilter={setFilter}
          ordering={ordering}
          setOrdering={setOrdering}
          pagination={pagination}
          setSelectedJobs={jobs => {
            const selectedJob = jobs[0];
            setState({ selectedJob });
          }}
          loading={loading}
          updateFilteredJobsInfo={updateFilteredJobsInfo}
        />
        {loading && <Loading />}
      </Stack.Item>
      <Stack.Item
        styles={{
          root: { backgroundColor: 'white', paddingBottom: spacing.l1 },
        }}
      >
        <Paginator
          filteredJobsInfo={filteredJobsInfo}
          updateFilteredJobsInfo={updateFilteredJobsInfo}
          filter={filter}
          ordering={ordering}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Stack.Item>
    </Stack>
  );
};

JobList.propTypes = {
  api: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default JobList;
