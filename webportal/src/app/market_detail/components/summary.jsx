// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FontClassNames, getTheme } from '@uifabric/styling';
import c from 'classnames';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  StackItem,
  FontWeights,
  Text,
  Link,
} from 'office-ui-fabric-react';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircleIcon from 'App/components/circle_icon';
import Context from 'App/context';
import {
  GenerateJobProtocol,
  generateJobProtocol,
} from '../utils/generate_job_protocol';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

export default function Summary(props) {
  const { marketItem } = props;
  const { history } = useContext(Context);

  const clickUse = () => {
    if (marketItem.type === 'data') {
      const jobProtocol = generateJobProtocol(marketItem);
      window.localStorage.removeItem('marketItem');
      window.localStorage.setItem('marketItem', JSON.stringify(jobProtocol));
      window.location.href = `/submit.html`;
    }
    if (marketItem.type === 'model') {
      window.localStorage.removeItem('modelItem');
      window.localStorage.setItem('modelItem', JSON.stringify(marketItem));
    }
  };

  return (
    <Wrapper>
      <Stack gap={'l1'}>
        {/* summary-row-1 */}
        <Stack horizontal verticalAlign={'center'} gap={'l2'}>
          <CircleIcon />
          <Stack gap='m'>
            <Text variant={'xLarge'}>{marketItem.name}</Text>
            <Text>{marketItem.summary}</Text>
          </Stack>
        </Stack>
        <Stack horizontal horizontalAlign='space-between'>
          <Stack horizontal gap='l1'>
            <TooltipHost content='Author'>
              <Stack horizontal gap='s1'>
                <Icon iconName='Contact' />
                <Text>{marketItem.author}</Text>
              </Stack>
            </TooltipHost>
            <TooltipHost content='Type'>
              <Stack horizontal gap='s1'>
                <Icon iconName='BulletedList' />
                <Text>{marketItem.type}</Text>
              </Stack>
            </TooltipHost>
            <TooltipHost content='Stars'>
              <Stack horizontal gap='s1'>
                <Icon iconName='FavoriteStar' />
                <Text>{String(marketItem.starNumber)}</Text>
              </Stack>
            </TooltipHost>
          </Stack>
          <PrimaryButton text='use' onClick={clickUse} />
        </Stack>
      </Stack>
    </Wrapper>
  );
}

Summary.propTypes = {
  marketItem: PropTypes.object,
};
