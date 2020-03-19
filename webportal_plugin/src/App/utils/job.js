import { get, isNil, cloneDeep } from 'lodash';
import { Interval, DateTime } from 'luxon';

export const MIN_ABNORMAL_JOB_DURATION_MILLISECOND = 5 * 24 * 60 * 60 * 1000; // 5 days

export function isStoppable(job) {
  return (
    job.executionType !== 'STOP' &&
    !['SUCCEEDED', 'FAILED', 'STOPPED'].includes(job.state)
  );
}

export function getHumanizedJobStateString(job) {
  if (job.state === 'JOB_NOT_FOUND') {
    return 'N/A';
  }

  if (
    job.executionType === 'STOP' &&
    !['SUCCEEDED', 'FAILED', 'STOPPED'].includes(job.state)
  ) {
    return 'Stopping';
  }

  if (job.state === 'WAITING') {
    return 'Waiting';
  } else if (job.state === 'RUNNING') {
    return 'Running';
  } else if (job.state === 'SUCCEEDED') {
    return 'Succeeded';
  } else if (job.state === 'FAILED') {
    return 'Failed';
  } else if (job.state === 'STOPPED') {
    return 'Stopped';
  } else if (job.state === 'STOPPING') {
    return 'Stopping';
  } else {
    return 'Unknown';
  }
}

export function getJobDuration(jobInfo) {
  const start =
    get(jobInfo, 'createdTime') && DateTime.fromMillis(jobInfo.createdTime);
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

export function getDurationString(dur) {
  if (!isNil(dur)) {
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

export function getJobModifiedTime(job) {
  const modified = job.completedTime || job.createdTime;
  if (!isNil(modified)) {
    return DateTime.fromMillis(modified);
  } else {
    return null;
  }
}

export function getJobModifiedTimeString(job) {
  const time = getJobModifiedTime(job);
  if (!isNil(time)) {
    return time.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  } else {
    return 'N/A';
  }
}

export function isLongRunJob(job) {
  return Date.now() - job.createdTime > MIN_ABNORMAL_JOB_DURATION_MILLISECOND;
}

export function isLowGpuUsageJob(job) {
  return !isNil(job.gpuUsage) && Number(job.gpuUsage) < 10;
}

export function listAbnormalJobs(allJobs, lowGpuJobsInfo) {
  const allRuuingJobs = allJobs.filter(job => job.state === 'RUNNING');
  const longRunJobs = allRuuingJobs.filter(isLongRunJob);

  // Get low GPU usage jobs
  const lowGpuUsageJobs = allRuuingJobs.reduce((acc, cur) => {
    const gpuUsageInfo = lowGpuJobsInfo.find(info => info.jobName === cur.name);
    if (isNil(gpuUsageInfo)) {
      return acc;
    }
    const lowGpuUsageJob = { ...cur };
    lowGpuUsageJob.gpuUsage = gpuUsageInfo.gpuUsage;
    acc.push(lowGpuUsageJob);
    return acc;
  }, []);

  // Merge long run jobs and low GPU usage jobs
  const abnormalJobs = cloneDeep(longRunJobs);
  abnormalJobs.forEach(job => {
    const lowGpuUsagejob = lowGpuUsageJobs.find(
      lowGpuUsageJob => lowGpuUsageJob.name === job.name,
    );
    if (!isNil(lowGpuUsagejob)) {
      job.gpuUsage = lowGpuUsagejob.gpuUsage;
    }
  });
  lowGpuUsageJobs.forEach(lowGpuUsageJob => {
    if (isNil(abnormalJobs.find(job => job.name === lowGpuUsageJob.name))) {
      abnormalJobs.push(lowGpuUsageJob);
    }
  });
  return abnormalJobs;
}

/**
 * @returns {Date}
 */
export function getModified(job) {
  if (!('_modified' in job)) {
    job._modified = new Date(job.completedTime || job.createdTime);
  }
  return job._modified;
}

/**
 * @returns {number}
 */
export function getDuration(job) {
  if (!('_duration' in job)) {
    job._duration = (job.completedTime || Date.now()) - job.createdTime;
  }
  return job._duration;
}

function generateStatus(job) {
  job._statusText = getHumanizedJobStateString(job);
  if (job._statusText === 'Waiting') {
    job._statusIndex = 0;
  } else if (job._statusText === 'Running') {
    job._statusIndex = 1;
  } else if (job._statusText === 'Stopping') {
    job._statusIndex = 2;
  } else if (job._statusText === 'Succeeded') {
    job._statusIndex = 3;
  } else if (job._statusText === 'Failed') {
    job._statusIndex = 4;
  } else if (job._statusText === 'Stopped') {
    job._statusIndex = 5;
  } else {
    job._statusIndex = -1;
  }
}

/**
 * @returns {string}
 */
export function getStatusText(job) {
  if (!('_statusText' in job)) {
    generateStatus(job);
  }
  return job._statusText;
}

/**
 * @returns {number}
 */
export function getStatusIndex(job) {
  if (!('_statusIndex' in job)) {
    generateStatus(job);
  }
  return job._statusIndex;
}

