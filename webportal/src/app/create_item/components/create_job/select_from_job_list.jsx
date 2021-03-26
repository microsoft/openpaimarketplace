// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Stack,
  DefaultButton,
  PrimaryButton,
} from 'office-ui-fabric-react';
import { isEmpty } from 'lodash';

const SelectFromJobList = ({ state, setState }) => {
  return (
    <>
      <Text>Job list here.</Text>
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
            setState({ step: 'uploadFiles' });
          }}
        />
        <PrimaryButton
          text='Next'
          onClick={() => {
            if (
              isEmpty(state.itemObject.name) ||
              isEmpty(state.itemObject.type) ||
              isEmpty(state.itemObject.summary) ||
              isEmpty(state.itemDescription.description)
            ) {
              setErrorMessage(true);
              alert('please enter all required fields.');
            } else {
              setErrorMessage(false);
              state.itemObject.description = generateDescription(state);
              setState({
                step: 'detail',
                itemObject: state.itemObject,
              });
            }
          }}
        />
      </Stack>
    </>
  );
};

SelectFromJobList.propTypes = {
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default SelectFromJobList;
