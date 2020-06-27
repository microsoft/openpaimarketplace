// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import { Stack, Text, PrimaryButton } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';

const ConfirmSection = props => {
  const { type } = props;

  return (
    <div>
      <PrimaryButton text='submit' />
    </div>
  );
};

ConfirmSection.propTypes = {
  type: PropTypes.string,
};

export default ConfirmSection;
