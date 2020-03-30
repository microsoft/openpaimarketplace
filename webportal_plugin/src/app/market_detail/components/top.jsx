// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import Context from 'App/context';

const Top = () => {
  const { history } = useContext(Context);

  return (
    <ActionButton
      iconProps={{ iconName: 'revToggleKey' }}
      onClick={() => {
        history.push('/');
      }}
    >
      Back to Marketplace
    </ActionButton>
  );
};

export default Top;
