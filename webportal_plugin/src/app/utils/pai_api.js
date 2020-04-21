// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import querystring from 'query-string';
import yaml from 'js-yaml';

export async function fetchSucessJobs(api, username, token) {
  const res = await fetch(
    `${api}/api/v1/jobs?${querystring.stringify({
      username,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.ok) {
    const jobs = await res.json();
    const successJobs = jobs.filter(job => job.state === 'SUCCEEDED');
    return successJobs;
  } else {
    throw new Error(res.statusText);
  }
}

export async function fetchJobConfig(api, userName, jobName, token) {
  const url = userName
    ? `${api}/api/v1/jobs/${userName}~${jobName}/config`
    : `${api}/api/v1/jobs/${jobName}/config`;
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
