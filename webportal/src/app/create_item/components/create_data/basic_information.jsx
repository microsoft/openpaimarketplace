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
import { isEmpty } from 'lodash';
import { TYPE_ENUM } from 'App/utils/constants';
import { useBoolean } from '@uifabric/react-hooks';

const BasicInformationArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const BasicInformation = props => {
  const { state, setState, itemDescription } = props;
  const [errorMessage, setErrorMessage] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = () => updateState({});
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

  function generateDescription(state, itemDescription) {
    return (
      `# ${state.itemObject.name}\n\n${itemDescription.description}\n\n` +
      (isEmpty(itemDescription.getRawData.value) &&
      isEmpty(itemDescription.useViaOpenPaiJobSubmition.value) &&
      isEmpty(itemDescription.useInTheCode.value)
        ? ''
        : '## About teh dataset\n\n') +
      (isEmpty(itemDescription.getRawData.value)
        ? ''
        : `### Get raw data\n\n${itemDescription.getRawData.value}\n\n`) +
      (isEmpty(itemDescription.useViaOpenPaiJobSubmition.value)
        ? ''
        : `### Use via OpenPAI job submission\n\n${itemDescription.useViaOpenPaiJobSubmition.value}\n\n`) +
      (isEmpty(itemDescription.useInTheCode.value)
        ? ''
        : `### Use in the code\n\n${itemDescription.useInTheCode.value}\n\n`) +
      (isEmpty(itemDescription.relatedProject.value)
        ? ''
        : `## Related project\n\n${itemDescription.relatedProject.value}\n\n`)
    );
  }

  function AdvancedDescriptionTextField({ field, rows }) {
    return (
      <TextField
        label={field.label}
        multiline={true}
        rows={rows}
        value={field.value}
        onChange={(event, newValue) => {
          field.value = newValue;
        }}
        placeholder={field.placeholder}
        styles={textStyles}
      />
    );
  }

  AdvancedDescriptionTextField.defaultProps = {
    rows: 2,
  };

  AdvancedDescriptionTextField.propTypes = {
    field: PropTypes.object,
    rows: PropTypes.number,
  };

  return (
    <BasicInformationArea>
      <Stack {...columnProps}>
        <TextField
          label='Title'
          required
          value={state.itemObject.name}
          onChange={(event, newValue) => {
            state.itemObject.name = newValue;
            setState({ itemObject: state.itemObject });
            forceUpdate();
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
            state.itemObject.dataUrl = newValue;
            setState({ itemObject: state.itemObject });
            forceUpdate();
          }}
          placeholder='Please add the data url here'
          styles={textStyles}
        />
        <TextField
          label='Short summary'
          description='(No more than 100 characters)'
          required
          value={state.itemObject.summary}
          onChange={(event, newValue) => {
            state.itemObject.summary = newValue;
            setState({ itemObject: state.itemObject });
            forceUpdate();
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
          required
          multiline={true}
          rows={2}
          value={itemDescription.description}
          onChange={(event, newValue) => {
            itemDescription.description = newValue;
            forceUpdate();
          }}
          errorMessage={
            errorMessage && isEmpty(itemDescription.description)
              ? 'Please enter description here.'
              : undefined
          }
          placeholder={`Please add the description of ${
            state.itemObject.type === TYPE_ENUM.JOB_TEMPLATE ? 'job' : 'data'
          } template`}
          styles={textStyles}
        />
        {advancedDescription && (
          <>
            <AdvancedDescriptionTextField
              field={itemDescription.getRawData}
              rows={5}
            />
            <AdvancedDescriptionTextField
              field={itemDescription.useViaOpenPaiJobSubmition}
            />
            <AdvancedDescriptionTextField
              field={itemDescription.useInTheCode}
            />
            <AdvancedDescriptionTextField
              field={itemDescription.relatedProject}
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
              isEmpty(state.itemObject.summary) ||
              isEmpty(state.itemObject.dataUrl) ||
              isEmpty(itemDescription.description)
            ) {
              setErrorMessage(true);
              alert('please enter all required fields.');
            } else {
              setErrorMessage(false);
              state.itemObject.description = generateDescription(
                state,
                itemDescription,
              );
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
  itemDescription: PropTypes.object,
};

export default BasicInformation;
