// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, DefaultButton, getTheme } from 'office-ui-fabric-react';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';
import styled from 'styled-components';
import { useBoolean } from '@uifabric/react-hooks';

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
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  return (
    <SelectTypeArea>
      <Stack horizontalAlign='center' gap='12%'>
        <Text variant={'xLarge'}>Create new item</Text>
        <GridWrapper>
          <HoverCard onClick={() => toggleHideDialog()}>
            <Stack horizontal verticalAlign='center'>
              <JobIcon style={{ transform: 'scale(0.75)' }} />
              <Text variant={'large'} style={{ marginRight: '30px' }}>
                Job template
              </Text>
            </Stack>
          </HoverCard>
          <HoverCard
            onClick={() => props.updateItemType(TYPE_ENUM.DATA_TEMPLATE)}
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
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={{
          styles: {
            main: {
              height: '160px',
              width: '100%',
            },
          },
        }}
      >
        <Stack verticalAlign='space-around' gap='m'>
          <DefaultButton
            onClick={() => props.updateItemType(TYPE_ENUM.JOB_TEMPLATE, true)}
            text='Select from your job list'
          />
          <DefaultButton
            onClick={() => props.updateItemType(TYPE_ENUM.JOB_TEMPLATE, false)}
            text='Upload files'
          />
        </Stack>
      </Dialog>
    </SelectTypeArea>
  );
};

SelectType.propTypes = {
  updateItemType: PropTypes.func,
};

export default SelectType;
