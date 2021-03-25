// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text, getTheme, TooltipHost } from 'office-ui-fabric-react';
import React from 'react';

export const AccessInfo = props => {
  const { isPublic, isPrivate, groupList } = props;
  const groupListInfo = groupList.toString();

  return (
    <TooltipHost
      calloutProps={{
        isBeakVisible: false,
      }}
      delay={0}
      tooltipProps={{
        onRenderContent: () => {
          return (
            <>
              <Text>Access Info</Text>
              {isPublic === false && isPrivate === false && (
                <>
                  <br /><br />
                  <Text variant={'small'}>Share-to groups:</Text>
                  <br />
                  <Text>{groupListInfo}</Text>
                </>
              )}
            </>
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
