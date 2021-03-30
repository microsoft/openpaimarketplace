// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack, DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import JobList from './jobList';
import { getJobConfig } from 'App/utils/pai_api';
import { TYPE_ENUM } from 'App/utils/constants';
import yaml from 'js-yaml';

const SelectFromJobList = ({ api, user, state, setState }) => {
  return (
    <>
      <JobList api={api} state={state} setState={setState} />
      <Stack
        horizontal
        horizontalAlign='space-between'
        gap='l1'
        styles={{
          root: {
            marginTop: '10px',
          },
        }}
      >
        <DefaultButton
          text='Back'
          onClick={() => {
            setState({ step: 'selectType' });
          }}
        />
        <PrimaryButton
          text='Next'
          disabled={state.selectedJob === undefined}
          onClick={() => {
            getJobConfig(
              api,
              state.selectedJob.username,
              state.selectedJob.name,
            )
              .then(object => {
                setState({
                  itemProtocol: object,
                  itemObject: {
                    name: object.name || '',
                    type: TYPE_ENUM.JOB_TEMPLATE,
                    summary: '',
                    description: '',
                    protocol: yaml.safeDump(object),
                    author: user,
                    status: 'approved',
                  },
                  step: 'basicInformation',
                  loadYamlError: null,
                  selectFromJobList: true,
                });
              })
              .catch(err => {
                setState({
                  loadYamlError: err.message,
                });
              });
          }}
        />
      </Stack>
    </>
  );
};

SelectFromJobList.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default SelectFromJobList;
