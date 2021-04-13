import React, { useMemo, useLayoutEffect } from 'react';
import {
  FontClassNames,
  Link,
  Selection,
  ShimmeredDetailsList,
  SelectionMode,
} from 'office-ui-fabric-react';

import Ordering from './ordering';
import { get, isNil } from 'lodash';
import { Interval, DateTime } from 'luxon';

function getJobDuration(jobInfo) {
  const start =
    get(jobInfo, 'submissionTime') &&
    DateTime.fromMillis(jobInfo.submissionTime);
  const end =
    get(jobInfo, 'completedTime') && DateTime.fromMillis(jobInfo.completedTime);
  if (start) {
    return Interval.fromDateTimes(start, end || DateTime.utc()).toDuration([
      'days',
      'hours',
      'minutes',
      'seconds',
    ]);
  } else {
    return null;
  }
}

function getDurationString(dur) {
  if (!isNil(dur) && dur !== 'null') {
    if (dur.days > 0) {
      return dur.toFormat(`d'd' h'h' m'm' s's'`);
    } else if (dur.hours > 0) {
      return dur.toFormat(`h'h' m'm' s's'`);
    } else if (dur.minutes > 0) {
      return dur.toFormat(`m'm' s's'`);
    } else {
      return dur.toFormat(`s's'`);
    }
  } else {
    return 'N/A';
  }
}

function getSubmissionTime(job) {
  if (!('_submissionTime' in job)) {
    job._submissionTime = new Date(job.submissionTime);
  }
  return job._submissionTime;
}

const Table = props => {
  const {
    filteredJobsInfo,
    setSelectedJobs,
    filter,
    ordering,
    setOrdering,
    pagination,
    loading,
  } = props;

  // workaround for fabric's bug
  // https://github.com/OfficeDev/office-ui-fabric-react/issues/5280#issuecomment-489619108
  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  });

  /**
   * @type {import('office-ui-fabric-react').Selection}
   */
  const selection = useMemo(() => {
    return new Selection({
      onSelectionChanged() {
        setSelectedJobs(selection.getSelection());
      },
    });
  }, []);

  /**
   * @param {React.MouseEvent<HTMLElement>} event
   * @param {import('office-ui-fabric-react').IColumn} column
   */
  function onColumnClick(event, column) {
    const { field, descending } = ordering;
    if (field === column.key) {
      if (descending) {
        setOrdering(new Ordering());
      } else {
        setOrdering(new Ordering(field, true));
      }
    } else {
      setOrdering(new Ordering(column.key));
    }
  }

  /**
   * @param {import('office-ui-fabric-react').IColumn} column
   */
  function applySortProps(column) {
    column.isSorted = ordering.field === column.key;
    column.isSortedDescending = ordering.descending;
    column.onColumnClick = onColumnClick;
    return column;
  }

  const nameColumn = applySortProps({
    key: 'name',
    minWidth: 200,
    name: 'Name',
    fieldName: 'name',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    isFiltered: filter.keyword !== '',
    onRender(job) {
      const { legacy, name, namespace, username } = job;
      const href = legacy
        ? `/job-detail.html?jobName=${name}`
        : `/job-detail.html?username=${namespace || username}&jobName=${name}`;
      return <Link onClick={() => window.open(href, '_blank')}>{name}</Link>;
    },
  });

  const modifiedColumn = applySortProps({
    key: 'submissionTime',
    minWidth: 150,
    name: 'Submission Time',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    isSorted: ordering.field === 'submissionTime',
    isSortedDescending: !ordering.descending,
    onRender(job) {
      return DateTime.fromJSDate(getSubmissionTime(job)).toLocaleString(
        DateTime.DATETIME_SHORT_WITH_SECONDS,
      );
    },
  });

  const userColumn = applySortProps({
    key: 'user',
    minWidth: 100,
    name: 'User',
    fieldName: 'username',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  });

  const durationColumn = {
    key: 'duration',
    minWidth: 60,
    name: 'Duration',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    onRender(job) {
      return getDurationString(getJobDuration(job));
    },
  };

  const virtualClusterColumn = applySortProps({
    key: 'virtualCluster',
    minWidth: 100,
    name: 'Virtual Cluster',
    fieldName: 'virtualCluster',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  });

  const retriesColumn = applySortProps({
    key: 'retries',
    minWidth: 60,
    name: 'Retries',
    fieldName: 'retries',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  });

  const taskCountColumn = applySortProps({
    key: 'taskCount',
    minWidth: 60,
    name: 'Tasks',
    fieldName: 'totalTaskNumber',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  });

  const gpuCountColumn = applySortProps({
    key: 'gpuCount',
    minWidth: 60,
    name: 'GPUs',
    fieldName: 'totalGpuNumber',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  });

  const columns = [
    nameColumn,
    modifiedColumn,
    userColumn,
    durationColumn,
    virtualClusterColumn,
    retriesColumn,
    taskCountColumn,
    gpuCountColumn,
  ];

  if (!isNil(filteredJobsInfo.data) && filteredJobsInfo.totalCount === 0) {
    return <></>;
  } else {
    return (
      <ShimmeredDetailsList
        items={loading ? [] : filteredJobsInfo.data || []}
        setKey='key'
        columns={columns}
        enableShimmer={isNil(filteredJobsInfo)}
        shimmerLines={pagination.itemsPerPage}
        selection={selection}
        selectionMode={SelectionMode.single}
      />
    );
  }
};

export default Table;
