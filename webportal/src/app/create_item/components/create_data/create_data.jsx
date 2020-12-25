// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from 'office-ui-fabric-react';

import BasicInformation from './basic_information';
import Detail from './detail';
import CreateCompleted from '../create_completed';

const CreateData = props => {
  const { user, state, setState, itemDescription } = props;

  return (
    <Stack>
      {state.step === 'basicInformation' && (
        <BasicInformation
          user={user}
          state={state}
          setState={setState}
          itemDescription={itemDescription}
        />
      )}
      {state.step === 'detail' && (
        <Detail user={user} state={state} setState={setState} />
      )}
      {state.step === 'completed' && <CreateCompleted state={state} />}
    </Stack>
  );
};

CreateData.propTypes = {
  user: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
  itemDescription: PropTypes.object,
};

export default CreateData;
