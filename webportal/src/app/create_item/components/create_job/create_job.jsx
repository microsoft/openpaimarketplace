// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from 'office-ui-fabric-react';

import UploadFiles from './upload_files';
import BasicInformation from './basic_information';
import Detail from './detail';
import CreateCompleted from '../create_completed';
import SelectFromJobList from './select_from_job_list';

const CreateJob = props => {
  const {
    api,
    user,
    state,
    setState,
    getRootProps,
    getInputProps,
    itemDescription,
  } = props;

  return (
    <Stack>
      {state.step === 'uploadFiles' && (
        <UploadFiles
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          loadYamlError={state.loadYamlError}
          setState={setState}
        />
      )}
      {state.step === 'selectFromJobList' && (
        <SelectFromJobList
          api={api}
          state={state}
          setState={setState}
          user={user}
        />
      )}
      {state.step === 'basicInformation' && (
        <BasicInformation
          user={user}
          state={state}
          setState={setState}
          itemDescription={itemDescription}
          api={api}
        />
      )}
      {state.step === 'detail' && (
        <Detail user={user} state={state} setState={setState} />
      )}
      {state.step === 'completed' && <CreateCompleted state={state} />}
    </Stack>
  );
};

CreateJob.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func,
  itemDescription: PropTypes.object,
};

export default CreateJob;
