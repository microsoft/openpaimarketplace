// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FontClassNames, getTheme } from '@uifabric/styling';
import c from 'classnames';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  FontWeights,
  Text,
  Link,
} from 'office-ui-fabric-react';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import t from '../../components/tachyons.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EditMarketItem from './edit_market_item';
import DeleteMarketItem from './delete_market_item';
import Context from 'App/context';
import { TagBar } from '../../components/tag_bar';
import ConfirmDialog from '../../components/confirm_dialog';
import {
  getStarStatus,
  deleteStar,
  addStar,
  increaseSubmits,
} from 'App/utils/marketplace_api';
import CircleIcon from 'App/components/circle_icon';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

export default function Summary(props) {
  const { marketItem } = props;
  const { user, isAdmin } = useContext(Context);

  useEffect(() => {
    async function fetchStarRelationWrapper() {
      const status = await getStarStatus(user, marketItem.id);
      if (status) {
        setStared(true);
      } else {
        setStared(false);
      }
    }
    fetchStarRelationWrapper();
  }, []);

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
      </Stack>
    </Wrapper>
  );
}

Summary.propTypes = {
  marketItem: PropTypes.object,
};
