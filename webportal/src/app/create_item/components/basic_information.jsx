// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DefaultButton,
  Dropdown,
  PrimaryButton,
  Stack,
  TextField,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const BasicInformationArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const BasicInformation = props => {
  const { user, itemObject, setItemObject, setStep } = props;
  const [errorMessage, setErrorMessage] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = () => updateState({});

  const columnProps = {
    tokens: { childrenGap: 8 },
    styles: {
      root: {
        minWidth: 300,
        fontSize: 'small',
        fontWeight: 500,
      },
    },
  };

  const textStyles = {
    fieldGroup: { fontSize: 'smaller', borderRadius: '5px' },
    subComponentStyles: {
      label: {
        root: {
          fontSize: 'small',
          fontWeight: 500,
        },
      },
    },
  };

  const dropdownStyles = {
    dropdown: { borderRadius: '5px' },
  };

  return (
    <BasicInformationArea>
      <Stack {...columnProps}>
        <TextField
          label='Title'
          required
          value={itemObject.name}
          onChange={(event, newValue) => {
            itemObject.name = newValue;
            setItemObject(itemObject);
            forceUpdate();
          }}
          errorMessage={
            errorMessage && isEmpty(itemObject.name)
              ? 'Please enter name here.'
              : undefined
          }
          styles={textStyles}
        />
        <TextField
          label='Auther'
          readOnly={true}
          value={user}
          styles={textStyles}
        />
        <Dropdown
          label='Type'
          required={true}
          placeholder='Please select a type'
          options={[
            { key: 'data', text: 'Data' },
            { key: 'template', text: 'Template' },
          ]}
          onChange={(event, item) => {
            itemObject.type = item.key;
            setItemObject(itemObject);
            forceUpdate();
          }}
          errorMessage={
            errorMessage && isEmpty(itemObject.type)
              ? 'Please select type here.'
              : undefined
          }
          styles={dropdownStyles}
        />
        <TextField
          label='Short summary'
          required
          value={itemObject.summary}
          onChange={(event, newValue) => {
            itemObject.summary = newValue;
            setItemObject(itemObject);
            forceUpdate();
          }}
          errorMessage={
            errorMessage && isEmpty(itemObject.summary)
              ? 'Please enter summary here.'
              : undefined
          }
          styles={textStyles}
        />
        <TextField
          label='Description'
          required
          multiline={true}
          rows={9}
          value={itemObject.description}
          onChange={(event, newValue) => {
            itemObject.description = newValue;
            setItemObject(itemObject);
            forceUpdate();
          }}
          errorMessage={
            errorMessage && isEmpty(itemObject.description)
              ? 'Please enter description here.'
              : undefined
          }
          styles={textStyles}
        />
      </Stack>
      <Stack
        horizontal
        horizontalAlign='end'
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
            setStep('uploadFiles');
          }}
        />
        <PrimaryButton
          text='Next'
          onClick={() => {
            if (
              isEmpty(itemObject.name) ||
              isEmpty(itemObject.type) ||
              isEmpty(itemObject.summary) ||
              isEmpty(itemObject.description)
            ) {
              setErrorMessage(true);
              alert('please enter all required fields.');
            } else {
              setErrorMessage(false);
              setStep('detail');
            }
          }}
        />
      </Stack>
    </BasicInformationArea>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.string,
  itemObject: PropTypes.object,
  setItemObject: PropTypes.func,
  setStep: PropTypes.func,
};

export default BasicInformation;
