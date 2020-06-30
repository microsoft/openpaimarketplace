// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect, useContext } from 'react';
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
import { capitalize, isNil, cloneDeep, assign } from 'lodash';

import Context from 'App/context';
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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m};
`;

const ModelSection = props => {
  const { dataItem, modelItem, setModelItem } = props;
  const { history } = useContext(Context);

  const clickDelete = () => {
    setModelItem(null);
    window.localStorage.removeItem('modelItem');
  };

  const renderEnvironmentTextField = (data, model, setModel, key) => {
    const envs = model.content.environmentVariables;
    if (envs[key].type === 'data' && !isNil(data)) {
      return (
        <Stack horizontal gap='s1'>
          <TextField
            styles={{ root: { minWidth: '200px' } }}
            readOnly
            defaultValue={isNil(envs[key].value) ? '' : envs[key].value}
          />
          <TooltipHost
            content={`${data.content.dataStorage.storageType}: ${data.content.dataStorage.serverPath}${data.content.dataStorage.subPath}`}
          >
            <Icon
              styles={{ root: { verticalAlign: 'middle' } }}
              iconName='Info'
            />
          </TooltipHost>
        </Stack>
      );
    } else if (
      envs[key].type === 'output' &&
      !isNil(model.content.outputStorage)
    ) {
      return (
        <Stack horizontal gap='s1'>
          <TextField
            styles={{ root: { minWidth: '200px' } }}
            readOnly
            defaultValue={`${model.content.outputStorage.containerPath}${model.content.outputStorage.subPath}`}
          />
          <TooltipHost
            content={`${model.content.outputStorage.storageType}: ${model.content.outputStorage.serverPath}${model.content.outputStorage.subPath}`}
          >
            <Icon
              styles={{ root: { verticalAlign: 'middle' } }}
              iconName='Info'
            />
          </TooltipHost>
        </Stack>
      );
    } else {
      return (
        <Stack horizontal gap='s1'>
          <TextField
            styles={{ root: { minWidth: '200px' } }}
            defaultValue={
              isNil(model.content.environmentVariables[key].value)
                ? ''
                : model.content.environmentVariables[key].value
            }
            onChange={(event, value) => {
              const newModel = cloneDeep(model);
              newModel.content.environmentVariables[key].value = value;
              setModel(newModel);
            }}
          />
        </Stack>
      );
    }
  };

  return (
    <div>
      <Stack gap={spacing.m}>
        <Text variant={'xxLarge'}>Model</Text>
        <Line />
        {!isNil(modelItem) && (
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
              {Object.keys(modelItem.content.environmentVariables).map(
                (key, index) => {
                  return (
                    <Stack key={key} horizontal verticalAlign='center' gap='l1'>
                      <StackItem styles={{ root: { width: '18%' } }}>
                        <Text>{key}</Text>
                      </StackItem>
                      <StackItem>
                        {renderEnvironmentTextField(
                          dataItem,
                          modelItem,
                          setModelItem,
                          key,
                        )}
                      </StackItem>
                    </Stack>
                  );
                },
              )}
              <Text variant='large'>Commands</Text>
              <Wrapper>
                <Stack gap='s2'>
                  {modelItem.content.commands.map(command => (
                    <Text key={command}>{command}</Text>
                  ))}
                </Stack>
              </Wrapper>
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

ModelSection.propTypes = {
  type: PropTypes.string,
};

export default ModelSection;
