// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, getTheme } from 'office-ui-fabric-react';
import styled from 'styled-components';

import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as JobIcon } from 'App/assets/job.svg';
import Card from 'App/components/card';
import { TYPE_ENUM } from 'App/utils/constants';

const { spacing } = getTheme();

const SelectTypeArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m};
`;

const HoverCard = styled(Card)`
  cursor: pointer;
  min-width: 300px;
  min-height: 180px;
`;

const SelectType = props => {
  return (
    <SelectTypeArea>
      <Stack horizontalAlign='center' gap='12%'>
        <Text variant={'xLarge'}>Create new item</Text>
        <GridWrapper>
          <HoverCard
            onClick={() =>
              props.setItemObject({
                ...props.itemObject,
                ...{ type: TYPE_ENUM.JOB_TEMPLATE },
              })
            }
          >
            <Stack horizontal verticalAlign='center'>
              <JobIcon style={{ transform: 'scale(0.75)' }} />
              <Text variant={'large'} style={{ marginRight: '30px' }}>
                Job template
              </Text>
            </Stack>
          </HoverCard>
          <HoverCard
            onClick={() =>
              props.setItemObject({
                ...props.itemObject,
                ...{ type: TYPE_ENUM.DATA_TEMPLATE },
              })
            }
          >
            <Stack horizontal verticalAlign='center'>
              <DataIcon style={{ transform: 'scale(0.75)' }} />
              <Text variant={'large'} style={{ marginRight: '30px' }}>
                Data template
              </Text>
            </Stack>
          </HoverCard>
        </GridWrapper>
      </Stack>
    </SelectTypeArea>
  );
};

SelectType.propTypes = {
  itemObject: PropTypes.object,
  setItemObject: PropTypes.func,
};

export default SelectType;
