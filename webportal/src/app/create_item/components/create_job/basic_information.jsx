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
      (isEmpty(state.itemDescription.trainingData.value)
        ? ''
        : `## Training data\n\n${state.itemDescription.trainingData.value}\n\n`) +
      (isEmpty(state.itemDescription.prerequisites.value) &&
      isEmpty(state.itemDescription.trainingCommand.value) &&
      isEmpty(state.itemDescription.getTheResult.value)
        ? ''
        : '## How to use\n\n') +
      (isEmpty(state.itemDescription.prerequisites.value)
        ? ''
        : `### Prerequisites\n\n${state.itemDescription.prerequisites.value}\n\n`) +
      (isEmpty(state.itemDescription.trainingCommand.value)
        ? ''
        : `### Training command\n\n${state.itemDescription.trainingCommand.value}\n\n`) +
      (isEmpty(state.itemDescription.getTheResult.value)
        ? ''
        : `### Get the result\n\n${state.itemDescription.getTheResult.value}\n\n`) +
      (isEmpty(state.itemDescription.reference.value)
        ? ''
        : `## Reference\n\n${state.itemDescription.reference.value}\n\n`)
    );
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
              label={state.itemDescription.trainingData.label}
              multiline={true}
              rows={2}
              value={state.itemDescription.trainingData.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.trainingData.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.trainingData.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.prerequisites.label}
              multiline={true}
              rows={2}
              value={state.itemDescription.prerequisites.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.prerequisites.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.prerequisites.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.trainingCommand.label}
              multiline={true}
              rows={2}
              value={state.itemDescription.trainingCommand.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.trainingCommand.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.trainingCommand.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.getTheResult.label}
              multiline={true}
              rows={2}
              value={state.itemDescription.getTheResult.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.getTheResult.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.getTheResult.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.reference.label}
              multiline={true}
              rows={2}
              value={state.itemDescription.reference.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.reference.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.reference.placeholder}
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
            setState({ step: 'uploadFiles' });
          }}
        />
        <PrimaryButton
          text='Next'
          onClick={() => {
            if (
              isEmpty(state.itemObject.name) ||
              isEmpty(state.itemObject.type)
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
  api: PropTypes.string,
};

export default BasicInformation;
