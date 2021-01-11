// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, Link } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import {
  mergeStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react/lib/Styling';
import { TYPE_ENUM } from 'App/utils/constants';

const iconClass = mergeStyles({
  fontSize: 75,
  height: 75,
  width: 75,
});

const classNames = mergeStyleSets({
  green: [{ color: 'green' }, iconClass],
});

const CreateCompleted = props => {
  const { state } = props;

  const viewItem = () => {
    window.location.href = `${window.location.href.slice(
      0,
      window.location.href.lastIndexOf('/'),
    )}market_detail?itemId=${state.itemId}`;
  };

  const viewList = () => {
    window.location.href = `${window.location.href.slice(
      0,
      window.location.href.lastIndexOf('/'),
    )}`;
  };

  return (
    <Stack horizontalAlign='center' verticalAlign='space-around' gap='50px'>
      <Stack horizontalAlign='center' gap='20px'>
        <FontIcon iconName='Completed' className={classNames.green} />
        <Text variant='large'>
          Create{' '}
          {state.itemObject.type === TYPE_ENUM.JOB_TEMPLATE ? 'Job' : 'Data'}{' '}
          Template Completed
        </Text>
      </Stack>
      <Text>
        You can find your template{' '}
        <Link onClick={viewItem}>{state.itemObject.name}</Link> in the{' '}
        <Link onClick={viewList}>Marketplace list</Link>
      </Text>
    </Stack>
  );
};

CreateCompleted.propTypes = {
  state: PropTypes.object,
};

export default CreateCompleted;
