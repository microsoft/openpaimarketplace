// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import querystring from 'query-string';
import yaml from 'js-yaml';

export async function listGroups(api) {
  const url = `${api}/api/v2/groups`;
  const token = cookies.get('token');

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const groups = await res.json();
    return groups;
  } else if (res.status === 404) {
    throw new Error(res.statusText);
  }
}

export async function listJobs(api, query) {
  const url = `${api}/api/v2/jobs?${querystring.stringify(query)}`;
  const token = cookies.get('token');

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const jobs = await res.json();
    return jobs;
  } else if (res.status === 404) {
    throw new Error(res.statusText);
  }
}

export async function getJobConfig(api, userName, jobName) {
  const url = userName
    ? `${api}/api/v2/jobs/${userName}~${jobName}/config`
    : `${api}/api/v2/jobs/${jobName}/config`;
  const token = cookies.get('token');

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await res.text();
  const json = yaml.safeLoad(text);
  if (res.ok) {
    return json;
  } else {
    if (json.code === 'NoJobConfigError') {
      throw new Error(json.message);
    } else {
      throw new Error(json.message);
    }
  }
}
