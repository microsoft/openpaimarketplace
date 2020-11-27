// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, Stack, Link } from 'office-ui-fabric-react';
import { FontClassNames } from '@uifabric/styling';
import styled from 'styled-components';
import Card from 'App/components/card';
import Context from 'App/context';
import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as JobIcon } from 'App/assets/job.svg';
import { TYPE_ENUM } from 'App/utils/constants';

const HoverCard = styled(Card)`
  cursor: pointer;
  min-width: 400px;
`;

const ItemCard = props => {
  const { item } = props;
  const { history } = useContext(Context);

  const populateCreatedTime = () => {
    const createdTime = Math.floor(
      Math.abs(new Date() - new Date(item.createdAt)) / 1000 / 3600 / 24,
    );
    return createdTime === 0
      ? 'not long ago'
      : createdTime + (createdTime > 1 ? ' days ago' : ' day ago');
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
        gap='m'
      >
        <Stack.Item>
          {item.type === TYPE_ENUM.DATA_TEMPLATE && <DataIcon />}
          {item.type === TYPE_ENUM.JOB_TEMPLATE && <JobIcon />}
          {item.type === TYPE_ENUM.OLD_TEMPLATE && <JobIcon />}
        </Stack.Item>
        <Stack gap='m' styles={{ root: [{ width: '70%' }] }}>
          <Link
            className={FontClassNames.xLarge}
            href={`${
              window.location.href.split('?type=')[0]
            }market_detail?itemId=${item.id}`}
          >
            {item.name}
          </Link>
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
};

export default ItemCard;
