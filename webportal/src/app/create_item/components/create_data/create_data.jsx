// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';
import { Stack } from 'office-ui-fabric-react';

import BasicInformation from './basic_information';
import Detail from './detail';
import CreateCompleted from '../create_completed';

const { spacing, palette } = getTheme();

const GrayCard = styled.div`
  padding: ${spacing.m};
  background: ${palette.neutralLighterAlt};
  min-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
`;

const CreateData = props => {
  const { user, state, setState, itemDescription } = props;

  return (
    <Stack>
      <GrayCard>
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
      </GrayCard>
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
