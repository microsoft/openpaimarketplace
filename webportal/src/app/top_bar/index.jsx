// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useEffect, useState, useContext } from 'react';
import {
  Stack,
  ActionButton,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import Context from 'App/context';

export const TopBar = React.memo(props => {
  const { history } = useContext(Context);

  return (
    <Stack>
      <Stack horizontal horizontalAlign='begin' verticalAlign='baseline'>
        <ActionButton
          iconProps={{ iconName: 'revToggleKey' }}
          onClick={() => {
            history.push('/');
          }}
        >
          Back to market list
        </ActionButton>
      </Stack>
    </Stack>
  );
});

TopBar.propTypes = {
  pageType: PropTypes.string,
  status: PropTypes.string,
};
