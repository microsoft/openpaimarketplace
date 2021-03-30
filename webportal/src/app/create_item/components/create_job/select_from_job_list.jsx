// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Stack,
  DefaultButton,
  PrimaryButton,
} from 'office-ui-fabric-react';
import { cloneDeep, isEmpty } from 'lodash';

const SelectFromJobList = ({ api, state, setState }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

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
        <DefaultButton text='Back' onClick={() => {}} />
        <PrimaryButton text='Next' onClick={() => {}} />
      </Stack>
    </>
  );
};

SelectFromJobList.propTypes = {
  api: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default SelectFromJobList;
