// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultButton,
  Dropdown,
  PrimaryButton,
  Stack,
  TextField,
} from 'office-ui-fabric-react';
import styled from 'styled-components';

const BasicInformationArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const BasicInformation = props => {
  const {
    user,
    itemProtocol,
    setItemProtocol,
    itemObject,
    setItemObject,
    setStep,
  } = props;

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

  if (!itemObject.name) {
    itemObject.name = itemProtocol.name;
  }

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
          }}
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
          }}
          styles={dropdownStyles}
        />
        <TextField
          label='Short summary'
          required
          value={itemObject.summary}
          onChange={(event, newValue) => {
            itemObject.summary = newValue;
            setItemObject(itemObject);
          }}
          styles={textStyles}
        />
        <TextField
          label='Description'
          required
          multiline={true}
          rows={9}
          value={itemProtocol.description}
          onChange={(event, newValue) => {
            itemProtocol.description = newValue;
            setItemProtocol(itemObject);
          }}
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
        <DefaultButton text='Back' onClick={() => setStep('uploadFiles')} />
        <PrimaryButton text='Next' onClick={() => setStep('detail')} />
      </Stack>
    </BasicInformationArea>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.string,
  itemProtocol: PropTypes.object,
  setItemProtocol: PropTypes.func,
  itemObject: PropTypes.object,
  setItemObject: PropTypes.func,
  setStep: PropTypes.func,
};

export default BasicInformation;
