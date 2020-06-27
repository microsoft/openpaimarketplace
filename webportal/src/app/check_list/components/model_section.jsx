// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  getTheme,
  DefaultButton,
  StackItem,
  TextField,
  TooltipHost,
  Icon,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { capitalize, isNil } from 'lodash';

import Line from 'App/components/line';
import { listItems } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';
import Card from 'App/components/card';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.neutralLight};
  padding: ${spacing.m};
`;

const HoverWrapper = styled.div`
  cursor: pointer;
`;

const Model = {
  id: '8e0b3086-0359-4e75-b11c-c5527487626e',
  name: 'Couplet Training Model',
  author: 'OpenPAI',
  type: 'model',
  categories: 'AI couplet',
  tags: ['official example'],
  summary: 'Dataset of couplet',
  description:
    '# Couplet Training Model\n\nThis is a model training process. After training, this model will give a down part with an upper part of couplet. Please refer to [Microsoft AI Edu Project](https://github.com/microsoft/ai-edu/blob/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B/docs/fairseq.md) for more details.\n\n## Training Data\n\nYou could use ```Couplet Dataset``` data component as training data, or any dataset follows ```fairseq``` model requirements.\n\n## How to use\n\nWhen use this module, you should set three environment variables:\n\n- ```RAW_DATA_DIR```: the training data path in container, if you use ```Couplet Dataset``` data component, this value will be auto filled.\n\n- ```PREPROCESSED_DATA_DIR```: the path to store intermediate result\n\n- ```MODEL_SAVE_DIR```: the path to store output result, i.e. the training model. You could use the predefined output storage, then you could get the results outside container.',
  content: {
    dockerImage: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
    codeStorage: null,
    outputStorage: {
      storageType: 'nfs',
      groups: ['default'],
      storageName: 'confignfs',
      serverPath: '10.151.40.235:/data/',
      subPaths: 'output',
      containerPath: '/mnt/confignfs/',
    },
    environmentVariables: [
      { name: 'RAW_DATA_DIR', type: 'data' },
      {
        name: 'PREPROCESSED_DATA_DIR',
        type: 'local_storage',
        defaultValue: './processed_data',
      },
      { name: 'MODEL_SAVE_DIR', type: 'output' },
    ],
    commands: [
      'pip install fairseq',
      'fairseq-preprocess \\',
      '--source-lang up \\',
      '--target-lang down \\',
      '--trainpref ${RAW_DATA_DIR}/train \\',
      '--validpref ${RAW_DATA_DIR}/valid \\',
      '--testpref ${RAW_DATA_DIR}/test \\',
      '--destdir ${PREPROCESSED_DATA_DIR}',
      'fairseq-train ${PREPROCESSED_DATA_DIR} \\',
      '--log-interval 100 \\',
      '--lr 0.25 \\',
      '--clip-norm 0.1 \\',
      '--dropout 0.2  \\',
      '--criterion label_smoothed_cross_entropy \\',
      '--save-dir ${MODEL_SAVE_DIR} \\',
      '-a lstm \\',
      '--max-tokens 4000 \\',
      '--max-epoch 100',
    ],
  },
  useNumber: 0,
  starNumber: 0,
  status: 'approved',
  createdAt: '2020-05-06T04:52:48.289Z',
  updatedAt: '2020-05-06T04:52:48.289Z',
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m};
`;

const ModelSection = props => {
  const { type } = props;
  const [modelItem, setModelItem] = useState(Model);

  return (
    <div>
      <Stack gap={spacing.m}>
        <Text variant={'xxLarge'}>Model</Text>
        <Line />
        <Card>
          <Stack gap='l1'>
            <HoverWrapper
              onClick={() => {
                history.push(`/market_detail?itemId=${modelItem.id}`);
              }}
            >
              <Text variant={'xLarge'}>{modelItem.name}</Text>
            </HoverWrapper>
            <Text variant='large'>{modelItem.summary}</Text>
            <Text variant='large'>Environment Variables</Text>
            {modelItem.content.environmentVariables.map(env => {
              return (
                <Stack
                  key={env.name}
                  horizontal
                  verticalAlign='center'
                  gap='l1'
                >
                  <StackItem styles={{ root: { width: '18%' } }}>
                    <Text>{env.name}</Text>
                  </StackItem>
                  <StackItem>
                    {env.type === 'data' && (
                      <TextField defaultValue='default' />
                    )}
                    {env.type === 'output' &&
                      !isNil(modelItem.content.outputStorage) && (
                        <Stack horizontal gap='s1'>
                          <TextField
                            readOnly
                            defaultValue={`${modelItem.content.outputStorage.containerPath}${modelItem.content.outputStorage.subPaths}`}
                          />
                          <TooltipHost
                            content={`${modelItem.content.outputStorage.storageType}: ${modelItem.content.outputStorage.serverPath}${modelItem.content.outputStorage.subPaths}`}
                          >
                            <Icon
                              styles={{ root: { verticalAlign: 'middle' } }}
                              iconName='Info'
                            />
                          </TooltipHost>
                        </Stack>
                      )}
                    {env.type !== 'output' &&
                      env.type !== 'data' &&
                      !isNil(modelItem.content.outputStorage) && (
                        <Stack horizontal gap='s1'>
                          <TextField />
                        </Stack>
                      )}
                  </StackItem>
                </Stack>
              );
            })}
            <Text variant='large'>Commands</Text>
            <Wrapper>
              <Stack gap='s2'>
                {modelItem.content.commands.map(command => (
                  <Text
                    key={command}
                  >
                    {command}
                  </Text>
                ))}
              </Stack>
            </Wrapper>
            <StackItem align='end'>
              <DefaultButton text='delete' />
            </StackItem>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
};

ModelSection.propTypes = {
  type: PropTypes.string,
};

export default ModelSection;
