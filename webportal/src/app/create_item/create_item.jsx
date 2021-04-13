// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import yaml from 'js-yaml';
import { ActionButton, Stack } from 'office-ui-fabric-react';

import Page from 'App/components/page';
import { TYPE_ENUM } from 'App/utils/constants';
import CreateStep from './components/create_step';
import SelectType from './components/select_type';
import CreateJob from './components/create_job/create_job';
import CreateData from './components/create_data/create_data';

const { spacing, palette } = getTheme();

const GrayCard = styled.div`
  padding: ${spacing.m};
  background: ${palette.neutralLighterAlt};
  min-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
`;

const itemDescription = {
  description: '',

  // Job template
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

  // Data template
  getRawData: {
    label: 'Get raw data',
    value: '',
    placeholder:
      'Please add how to get the raw data here. It can include below information:\n' +
      '1. Source address\n' +
      '2. How to Get\n' +
      '3. Data format\n' +
      '4. Data preprocess\n',
  },
  useViaOpenPaiJobSubmition: {
    label: 'Use via OpenPAI job submission',
    value: '',
    placeholder: 'You can add the submission command here.',
  },
  useInTheCode: {
    label: 'Use in the code',
    value: '',
    placeholder:
      'You can add code snippet to show how to use the data in the code.',
  },
  relatedProject: {
    label: 'Related project',
    value: '',
    placeholder: 'You can add related projects here if have.',
  },
};

const CreateItem = props => {
  const { user, routeProps, api } = props;
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      itemProtocol: null,
      itemDescription: itemDescription,
      itemObject: {
        name: '',
        summary: '',
        type: '',
        source: 'marketplace',
        isPublic: true,
        isPrivate: false,
        groupList: [],
        description: '',
        protocol: '',
        author: user,
        status: 'approved',
      },
      step: 'selectType',
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
          loadYamlError: null,
          selectFromJobList: false,
        });
      } catch (err) {
        setState({
          loadYamlError: err.message,
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
            if (state.step === 'completed') {
              routeProps.history.push('/');
            } else if (confirm('Are you sure you want to leave this page?')) {
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
          {state.step === 'selectType' && (
            <SelectType
              updateItemType={(type, selectFromJobList) => {
                let next = '';
                if (type === TYPE_ENUM.JOB_TEMPLATE) {
                  next = selectFromJobList
                    ? 'selectFromJobList'
                    : 'uploadFiles';
                } else {
                  next = 'basicInformation';
                }
                setState({
                  itemObject: { ...state.itemObject, ...{ type: type } },
                  step: next,
                  selectFromJobList: selectFromJobList,
                });
              }}
            />
          )}
          {state.step !== 'selectType' && !state.selectFromJobList && (
            <CreateStep
              step={state.step}
              type={state.itemObject.type}
              selectFromJobList={state.selectFromJobList}
            />
          )}
          {state.itemObject.type === TYPE_ENUM.JOB_TEMPLATE && (
            <CreateJob
              user={user}
              state={state}
              setState={setState}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              api={api}
            />
          )}
          {state.itemObject.type === TYPE_ENUM.DATA_TEMPLATE && (
            <CreateData
              user={user}
              state={state}
              setState={setState}
              api={api}
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
