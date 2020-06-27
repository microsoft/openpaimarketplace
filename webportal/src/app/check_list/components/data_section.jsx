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

const Data = {
  id: '0b41d10e-36e5-4e97-95c2-27726dd94f34',
  name: 'Couplet Dataset',
  author: 'OpenPAI',
  type: 'data',
  categories: 'AI couplet',
  tags: ['official example'],
  summary: 'Dataset of couplet',
  description:
    '# Couplet Dataset\n\nThis is the dataset of couplet. \n\n## Data content\n\nThis dataset contains processed data based on [Microsoft AI EDU project](https://github.com/microsoft/ai-edu/blob/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B/docs/fairseq.md).\n\nThe original dataset was downloaded from [Public couplet dataset](https://github.com/wb14123/couplet-dataset) and was splited into ```test, train and valid``` with 98:1:1 proportion. The ```.up``` and ```.down``` files contains upper part and down part of a certain couplet seperately.\n\n## The file stucture\n\n```\n.\n|-- test.down // down part of couplet\n|-- test.up  // up part of couplet\n|-- train.down\n|-- train.up\n|-- valid.down\n|-- valid.up\n```\n\n## How to use it\n\nThe data was stored in a pai nfs storage. It will be mounted in container when you use the data in pai cluster.\n\n\n',
  content: {
    dataStorage: {
      storageType: 'nfs',
      groups: ['default'],
      storageName: 'confignfs',
      serverPath: '10.151.40.235:/data/',
      subPath: 'couplet',
      containerPath: '/mnt/confignfs/',
    },
  },
  useNumber: 0,
  starNumber: 0,
  status: 'approved',
  createdAt: '2020-05-06T04:52:48.289Z',
  updatedAt: '2020-05-06T04:52:48.289Z',
};

const DataSection = props => {
  const { type } = props;
  const { history } = useContext(Context);
  const [dataItem, setDataItem] = useState(Data);

  return (
    <div>
      <Stack gap={spacing.m}>
        <Text variant={'xxLarge'}>Data</Text>
        <Line />
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
              <DefaultButton text='delete' />
            </StackItem>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
};

DataSection.propTypes = {
  type: PropTypes.string,
};

export default DataSection;
