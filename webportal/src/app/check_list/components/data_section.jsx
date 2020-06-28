// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect, useContext } from 'react';
import {
  Stack,
  Text,
  getTheme,
  DefaultButton,
  StackItem,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { capitalize, isNil } from 'lodash';

import Line from 'App/components/line';
import { listItems } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';
import Card from 'App/components/card';
import Context from 'App/context';
import StorageCard from 'App/market_detail/components/storage_card';

const { spacing } = getTheme();

const HoverWrapper = styled.div`
  cursor: pointer;
`;

const DataSection = props => {
  const { dataItem, setDataItem } = props;
  const { history } = useContext(Context);

  const clickDelete = () => {
    setDataItem(null);
    window.localStorage.removeItem('dataItem');
  };

  return (
    <div>
      <Stack gap={spacing.m}>
        <Text variant={'xxLarge'}>Data</Text>
        <Line />
        {!isNil(dataItem) && (
          <Card>
            <Stack gap='l1'>
              <HoverWrapper
                onClick={() => {
                  history.push(`/market_detail?itemId=${dataItem.id}`);
                }}
              >
                <Text variant={'xLarge'}>{dataItem.name}</Text>
              </HoverWrapper>
              <Text variant='large'>{dataItem.summary}</Text>
              <StorageCard storage={dataItem.content.dataStorage} />
              <StackItem align='end'>
                <DefaultButton text='delete' onClick={clickDelete} />
              </StackItem>
            </Stack>
          </Card>
        )}
      </Stack>
    </div>
  );
};

DataSection.propTypes = {
  type: PropTypes.string,
};

export default DataSection;
