// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Text,
  Stack,
} from 'office-ui-fabric-react';
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';

import Card from 'App/components/card';
import CircleIcon from 'App/components/circle_icon';
import Context from 'App/context';

const { palette } = getTheme();

const HoverCard = styled(Card)`
  cursor: pointer;
`;

const ItemCard = props => {
  const { item, status } = props;

  const onClick = () => {
    history.push(`/market_detail?itemId=${item.id}`);
  };
  const { history } = useContext(Context);

  const populateCreatedTime = () => {
    const uploadedTime = Math.floor(
      Math.abs(new Date() - new Date(item.createdAt)) / 1000 / 3600 / 24,
    );
    return uploadedTime === 0
      ? 'not long ago'
      : uploadedTime + (uploadedTime > 1 ? ' days ago' : ' day ago');
  };

  return (
    <HoverCard
      key={item.Id}
      onClick={() => {
        history.push(`/market_detail?itemId=${item.id}`);
      }}
    >
      <Stack
        horizontal
        verticalAlign='center'
        horizontalAlign='space-between'
        gap='l2'
      >
        <CircleIcon />
        <Stack gap='m' styles={{ root: [{ width: '70%' }] }}>
          <Text variant={'xLarge'}>{item.name}</Text>
          <Text variant={'small'}>
            {item.author} published {populateCreatedTime()}
          </Text>
          <Text>{item.summary}</Text>
        </Stack>
      </Stack>
    </HoverCard>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default ItemCard;
