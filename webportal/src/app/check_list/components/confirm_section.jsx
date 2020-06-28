// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import { getJobProtocol } from '../utils/get_job_protocol';

const ConfirmSection = props => {
  const { dataItem, modelItem } = props;

  const clickSubmit = async () => {
    const jobProtocol = getJobProtocol([dataItem, modelItem]);
    window.localStorage.removeItem('marketItem');
    window.localStorage.setItem('marketItem', JSON.stringify(jobProtocol));
    window.location.href = `/submit.html`;
  };

  const clickView = async () => {
    const jobProtocol = getJobProtocol([dataItem, modelItem]);
    console.log(jobProtocol);
    // window.localStorage.removeItem('marketItem');
    // window.localStorage.setItem(
    //   'marketItem',
    //   JSON.stringify(marketItem.jobConfig),
    // );
    // if (isJobV2(marketItem.jobConfig)) {
    //   window.location.href = `/submit.html`;
    // } else {
    //   window.location.href = `/submit_v1.html`;
    // }
  };

  return (
    <Stack horizontal gap='l1'>
      <PrimaryButton text='Submit' onClick={clickSubmit} />
      <DefaultButton text='View config' onClick={clickView} />
    </Stack>
  );
};

ConfirmSection.propTypes = {
  type: PropTypes.string,
};

export default ConfirmSection;
