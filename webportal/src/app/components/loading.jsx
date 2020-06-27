// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FontClassNames } from '@uifabric/styling';
import c from 'classnames';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import React from 'react';
import PropTypes from 'prop-types';

import t from 'App/components/tachyons.scss';

const Loading = ({ label = 'Loading...' }) => {
  return (
    <div className={c(t.flex, t.itemsCenter, t.justifyCenter, t.h100)}>
      <div className={c(t.flex, t.itemsCenter)}>
        <Spinner size={SpinnerSize.large} />
        <div className={c(t.ml4, FontClassNames.xLarge)}>{label}</div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  label: PropTypes.string,
};

export default Loading
