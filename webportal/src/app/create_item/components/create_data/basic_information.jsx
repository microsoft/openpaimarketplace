// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  Text,
  TextField,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { cloneDeep, isEmpty } from 'lodash';
import { useBoolean } from '@uifabric/react-hooks';
import { createItem } from 'App/utils/marketplace_api';
import generateDataTemplate from './data_template';
import { ShareOptions } from '../share_options';

const BasicInformationArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const BasicInformation = props => {
  const { state, setState, api } = props;
  const [errorMessage, setErrorMessage] = useState(false);
  const [
    advancedDescription,
    { toggle: toggleAdvancedDescription },
  ] = useBoolean(false);

  const columnProps = {
    tokens: { childrenGap: 'm' },
    styles: {
      root: {
        minWidth: 300,
        fontSize: FontSizes.mediumPlus,
        fontWeight: FontWeights.semibold,
      },
    },
  };

  const textStyles = {
    fieldGroup: { borderRadius: '5px' },
    subComponentStyles: {
      label: {
        root: {
          fontSize: FontSizes.mediumPlus,
          fontWeight: FontWeights.semibold,
        },
      },
    },
  };

  function generateDescription(state) {
    return (
      `# ${state.itemObject.name}\n\n${state.itemDescription.description}\n\n` +
      (isEmpty(state.itemDescription.getRawData.value) &&
      isEmpty(state.itemDescription.useViaOpenPaiJobSubmition.value) &&
      isEmpty(state.itemDescription.useInTheCode.value)
        ? ''
        : '## About teh dataset\n\n') +
      (isEmpty(state.itemDescription.getRawData.value)
        ? ''
        : `### Get raw data\n\n${state.itemDescription.getRawData.value}\n\n`) +
      (isEmpty(state.itemDescription.useViaOpenPaiJobSubmition.value)
        ? ''
        : `### Use via OpenPAI job submission\n\n${state.itemDescription.useViaOpenPaiJobSubmition.value}\n\n`) +
      (isEmpty(state.itemDescription.useInTheCode.value)
        ? ''
        : `### Use in the code\n\n${state.itemDescription.useInTheCode.value}\n\n`) +
      (isEmpty(state.itemDescription.relatedProject.value)
        ? ''
        : `## Related project\n\n${state.itemDescription.relatedProject.value}\n\n`)
    );
  }

  function submit() {
    const dataTemplateObject = {
      dockerImage: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
      storageType: 'data',
      storageName: 'data',
      storagePath: state.itemObject.dataUrl,
      commands: '',
    };
    state.itemObject.protocol = generateDataTemplate(
      dataTemplateObject,
      state.itemObject,
    );
    createItem(state.itemObject)
      .then(id =>
        setState({
          itemId: id,
          step: 'completed',
        }),
      )
      .catch(err => {
        throw err;
      });
  }

  return (
    <BasicInformationArea>
      <Stack {...columnProps}>
        <TextField
          label='Title'
          required
          value={state.itemObject.name}
          onChange={(event, newValue) => {
            const itemObject = cloneDeep(state.itemObject);
            itemObject.name = newValue;
            setState({ itemObject });
          }}
          errorMessage={
            errorMessage && isEmpty(state.itemObject.name)
              ? 'Please enter name here.'
              : undefined
          }
          styles={textStyles}
        />
        <TextField
          label='Data url'
          required
          value={state.itemObject.dataUrl}
          onChange={(event, newValue) => {
            const itemObject = cloneDeep(state.itemObject);
            itemObject.dataUrl = newValue;
            itemObject.dataType = newValue.startsWith('https://github.com/')
              ? 'github'
              : 'blob';
            setState({ itemObject });
          }}
          styles={textStyles}
        />
        <TextField
          label='Short summary'
          description='(No more than 100 characters)'
          value={state.itemObject.summary}
          onChange={(event, newValue) => {
            const itemObject = cloneDeep(state.itemObject);
            itemObject.summary = newValue;
            setState({ itemObject });
          }}
          errorMessage={
            errorMessage && isEmpty(state.itemObject.summary)
              ? 'Please enter summary here.'
              : undefined
          }
          styles={textStyles}
        />
        <TextField
          label='Description'
          multiline={true}
          rows={2}
          value={state.itemDescription.description}
          onChange={(event, newValue) => {
            const itemDescription = cloneDeep(state.itemDescription);
            itemDescription.description = newValue;
            setState({ itemDescription });
          }}
          errorMessage={
            errorMessage && isEmpty(state.itemDescription.description)
              ? 'Please enter description here.'
              : undefined
          }
          styles={textStyles}
        />
        {advancedDescription && (
          <>
            <TextField
              label={state.itemDescription.getRawData.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.getRawData.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.getRawData.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.getRawData.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.useViaOpenPaiJobSubmition.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.useViaOpenPaiJobSubmition.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.useViaOpenPaiJobSubmition.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={
                state.itemDescription.useViaOpenPaiJobSubmition.placeholder
              }
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.useInTheCode.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.useInTheCode.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.useInTheCode.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.useInTheCode.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.relatedProject.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.relatedProject.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.relatedProject.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.relatedProject.placeholder}
              styles={textStyles}
            />
          </>
        )}
        <Stack horizontal horizontalAlign='space-between'>
          <Text>*Please follow the Markdown syntax to fill the contents.</Text>
          <DefaultButton
            iconProps={{
              iconName: advancedDescription ? 'ChevronUp' : 'ChevronDown',
            }}
            onClick={toggleAdvancedDescription}
          >
            Advanced
          </DefaultButton>
        </Stack>
      </Stack>
      <ShareOptions state={state} setState={setState} api={api} />
      <Stack
        horizontal
        horizontalAlign='space-between'
        gap='l1'
        styles={{
          root: {
            marginTop: '10px',
          },
        }}
      >
        <DefaultButton
          text='Back'
          onClick={() => {
            setErrorMessage(false);
            setState({ step: 'selectType' });
          }}
        />
        <PrimaryButton
          text='Next'
          onClick={() => {
            if (
              isEmpty(state.itemObject.name) ||
              isEmpty(state.itemObject.type) ||
              isEmpty(state.itemObject.dataUrl)
            ) {
              setErrorMessage(true);
              alert('please enter all required fields.');
            } else {
              setErrorMessage(false);
              state.itemObject.description = generateDescription(state);
              setState({
                step: 'detail',
                itemObject: state.itemObject,
              });
              submit();
            }
          }}
        />
      </Stack>
    </BasicInformationArea>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
  itemDescription: PropTypes.object,
  api: PropTypes.string,
};

export default BasicInformation;
