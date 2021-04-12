// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text, TooltipHost } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';

export const AccessInfo = props => {
  const { isPublic, isPrivate, groupList } = props;
  let groupListInfo = groupList.toString();
  if (groupListInfo === '') {
    groupListInfo = 'No group is shared currently';
  }

  return (
    <TooltipHost
      calloutProps={{
        isBeakVisible: false,
      }}
      delay={0}
      tooltipProps={{
        onRenderContent: () => {
          return (
            <Stack gap='m'>
              <Text>Access Info</Text>
              {isPublic === false && isPrivate === false && (
                <Stack gap='s1'>
                  <Text variant={'small'}>Share-to groups:</Text>
                  <Text>{groupListInfo}</Text>
                </Stack>
              )}
            </Stack>
          );
        },
      }}
    >
      <Stack horizontal gap='s1'>
        {isPublic === true && <Text>Public</Text>}
        {isPublic === false && isPrivate === true && <Text>Private</Text>}
        {isPublic === false && isPrivate === false && <Text>Protected</Text>}
      </Stack>
    </TooltipHost>
  );
};

AccessInfo.propTypes = {
  isPublic: PropTypes.bool,
  isPrivate: PropTypes.bool,
  groupList: PropTypes.arrayOf(PropTypes.string),
};
