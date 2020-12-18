// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import yaml from 'js-yaml';
import { ActionButton, Stack } from 'office-ui-fabric-react';
import { isEmpty } from 'lodash';

import Page from 'App/components/page';
import { TYPE_ENUM } from 'App/utils/constants';
import CreateStep from './components/create_step';
import SelectType from './components/select_type';
import CreateJob from './components/create_job/create_job';

const { spacing, palette } = getTheme();

const GrayCard = styled.div`
  padding: ${spacing.m};
  background: ${palette.neutralLighterAlt};
  min-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
`;

const itemDescription = {
  description: '',
  trainingData: {
    label: 'Training Data',
    value: '',
    placeholder: 'Please add the brief introduction of the training data',
  },
  prerequisites: {
    label: 'Prerequisites',
    value: '',
    placeholder:
      'Please add the prerequisites before run the job if have. The prerequisites include data downloading, package installation, environment variable settings, and so on.',
  },
  trainingCommand: {
    label: 'Training Command',
    value: '',
    placeholder: 'Please add the training command here.',
  },
  getTheResult: {
    label: 'Get The Result',
    value: '',
    placeholder: 'Please show how to get the training result.',
  },
  reference: {
    label: 'Reference',
    value: '',
    placeholder:
      'You can add the reference tutorials or projects here if have any.',
  },
};

const CreateItem = props => {
  const { user, routeProps } = props;
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      itemProtocol: null,
      itemObject: {
        name: '',
        summary: '',
        type: '',
        description: '',
        protocol: '',
        author: user,
        status: 'approved',
      },
      step: 'uploadFiles',
      itemId: '',
    },
  );

  const onDrop = useCallback(files => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      try {
        const yamlObject = yaml.safeLoad(reader.result);
        setState({
          itemProtocol: yamlObject,
          itemObject: {
            name: yamlObject.name || '',
            type: TYPE_ENUM.JOB_TEMPLATE,
            summary: '',
            description: '',
            protocol: reader.result,
            author: user,
            status: 'approved',
          },
          step: 'basicInformation',
          setLoadYamlError: null,
        });
      } catch (err) {
        setState({
          setLoadYamlError: err.message,
        });
      }
    };
    reader.readAsText(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Page>
      <Stack horizontal horizontalAlign='begin' verticalAlign='baseline'>
        <ActionButton
          iconProps={{ iconName: 'revToggleKey' }}
          onClick={() => {
            if (confirm('Are you sure you want to leave this page?')) {
              routeProps.history.push('/');
            } else {
              // Do nothing!
            }
          }}
        >
          Back to market list
        </ActionButton>
      </Stack>
      <Stack>
        <GrayCard>
          {isEmpty(state.itemObject.type) && (
            <SelectType
              updateItemType={type =>
                setState({
                  itemObject: { ...state.itemObject, ...{ type: type } },
                })
              }
            />
          )}
          {!isEmpty(state.itemObject.type) && (
            <CreateStep step={state.step} type={state.itemObject.type} />
          )}
          {state.itemObject.type === TYPE_ENUM.JOB_TEMPLATE && (
            <CreateJob
              user={user}
              state={state}
              setState={setState}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              itemDescription={itemDescription}
            />
          )}
        </GrayCard>
      </Stack>
    </Page>
  );
};

CreateItem.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
  routeProps: PropTypes.object,
};

export default CreateItem;
