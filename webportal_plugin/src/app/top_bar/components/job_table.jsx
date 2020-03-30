// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import c from 'classnames';
import React, { useMemo, useLayoutEffect } from 'react';
import {
  FontClassNames,
  Link,
  Selection,
  ShimmeredDetailsList,
  Icon,
  ColorClassNames,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import { isNil } from 'lodash';
import { DateTime } from 'luxon';

import StatusBadge from 'App/components/status-badge';
import {
  getJobDuration,
  getDurationString,
  getModified,
  getStatusText,
} from 'App/utils/job';
import t from 'App/components/tachyons.scss';

const JobTable = props => {
  const { jobs, setSelectedJob } = props;

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
        setSelectedJob(selection.getSelection());
      },
    });
  }, []);

  const nameColumn = {
    key: 'name',
    minWidth: 200,
    name: 'Name',
    fieldName: 'name',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    onRender(job) {
      const { legacy, name, namespace, username } = job;
      const href = legacy
        ? `/job-detail.html?jobName=${name}`
        : `/job-detail.html?username=${namespace || username}&jobName=${name}`;
      return <Link href={href}>{name}</Link>;
    },
  };
  const modifiedColumn = {
    key: 'modified',
    minWidth: 150,
    name: 'Date Modified',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    onRender(job) {
      return DateTime.fromJSDate(getModified(job)).toLocaleString(
        DateTime.DATETIME_SHORT_WITH_SECONDS,
      );
    },
  };
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
  const virtualClusterColumn = {
    key: 'virtualCluster',
    minWidth: 100,
    name: 'Virtual Cluster',
    fieldName: 'virtualCluster',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  };
  const retriesColumn = {
    key: 'retries',
    minWidth: 60,
    name: 'Retries',
    fieldName: 'retries',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  };
  const taskCountColumn = {
    key: 'taskCount',
    minWidth: 60,
    name: 'Tasks',
    fieldName: 'totalTaskNumber',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  };
  const gpuCountColumn = {
    key: 'gpuCount',
    minWidth: 60,
    name: 'GPUs',
    fieldName: 'totalGpuNumber',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
  };
  const statusColumn = {
    key: 'status',
    minWidth: 100,
    name: 'Status',
    headerClassName: FontClassNames.medium,
    isResizable: true,
    onRender(job) {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <StatusBadge status={getStatusText(job)} />
        </div>
      );
    },
  };

  const columns = [
    nameColumn,
    modifiedColumn,
    durationColumn,
    virtualClusterColumn,
    retriesColumn,
    taskCountColumn,
    gpuCountColumn,
    statusColumn,
  ];

  if (!isNil(jobs) && jobs.length === 0) {
    return (
      <div className={c(t.h100, t.flex, t.itemsCenter, t.justifyCenter)}>
        <div className={c(t.tc)}>
          <div>
            <Icon
              className={c(ColorClassNames.themePrimary)}
              style={{ fontSize: FontSizes.xxLarge }}
              iconName='Error'
            />
          </div>
          <div
            className={c(t.mt5, FontClassNames.xLarge)}
            style={{ fontWeight: FontWeights.semibold }}
          >
            No results matched yet.
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ShimmeredDetailsList
          items={jobs}
          setKey='key'
          columns={columns}
          enableShimmer={isNil(jobs)}
          selection={selection}
          selectionMode='single'
        />
      </div>
    );
  }
};

export default JobTable;
