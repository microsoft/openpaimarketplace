// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, Stack, getTheme } from 'office-ui-fabric-react';
import styled from 'styled-components';
import Context from 'App/context';
import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as JobIcon } from 'App/assets/job.svg';
import { TYPE_ENUM } from 'App/utils/constants';

const { palette } = getTheme();

const HoverCard = styled.div`
  background: ${palette.neutralLighterAlt};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
  cursor: pointer;
  min-width: 300px;
  &:hover {
    background: ${palette.neutralLighter};
  }
`;

const ItemCard = props => {
  const { item } = props;
  const { history } = useContext(Context);

  const populateUpdateTime = () => {
    const updateTime = Math.floor(
      Math.abs(new Date() - new Date(item.updatedAt)) / 1000 / 3600 / 24,
    );
    return updateTime === 0
      ? 'not long ago'
      : updateTime + (updateTime > 1 ? ' days ago' : ' day ago');
  };

  return (
    <HoverCard
      key={item.Id}
      onClick={() => {
        history.push(`/market_detail?itemId=${item.id}`);
      }}
    >
      <Stack horizontal verticalAlign='center' gap='s1'>
        <Stack.Item>
          {item.type === TYPE_ENUM.DATA_TEMPLATE && <DataIcon />}
          {item.type === TYPE_ENUM.JOB_TEMPLATE && <JobIcon />}
          {item.type === TYPE_ENUM.OLD_TEMPLATE && <JobIcon />}
        </Stack.Item>
        <Stack gap='s1' styles={{ root: [{ width: '70%' }] }}>
          <Text style={{ color: palette.themeDark }} variant={'large'}>
            {item.name}
          </Text>
          <Text variant={'small'}>
            {item.author} updated {populateUpdateTime()}
          </Text>
        </Stack>
      </Stack>
    </HoverCard>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemCard;
