// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  TextField,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { createItem } from 'App/utils/marketplace_api';
import { isEmpty } from 'lodash';
import generateDataTemplate from './data_template';

const DetailsArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const dataTemplateObject = {
  dockerImage: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
  storageType: 'data',
  storageName: '',
  storagePath: '',
  commands: '',
};

const Detail = props => {
  const { state, setState } = props;

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

  const submit = () => {
    if (
      isEmpty(dataTemplateObject.dockerImage) ||
      isEmpty(dataTemplateObject.storageType) ||
      isEmpty(dataTemplateObject.storageName) ||
      isEmpty(dataTemplateObject.storagePath)
    ) {
      alert('please enter all required fields.');
      return;
    }
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
  };

  return (
    <DetailsArea>
      <Stack {...columnProps}>
        <TextField
          label='Docker Image'
          required
          value={dataTemplateObject.dockerImage}
          onChange={(event, newValue) => {
            dataTemplateObject.dockerImage = newValue;
          }}
          styles={textStyles}
        />
        <TextField
          label='Storage Type'
          required
          value={dataTemplateObject.storageType}
          onChange={(event, newValue) => {
            dataTemplateObject.storageType = newValue;
          }}
          styles={textStyles}
          readOnly={true}
        />
        <TextField
          label='Storage Name'
          required
          value={dataTemplateObject.storageName}
          onChange={(event, newValue) => {
            dataTemplateObject.storageName = newValue;
          }}
          styles={textStyles}
        />
        <TextField
          label='Storage Path'
          required
          value={dataTemplateObject.storagePath}
          onChange={(event, newValue) => {
            dataTemplateObject.storagePath = newValue;
          }}
          styles={textStyles}
        />
        <TextField
          label='Commands'
          multiline={true}
          rows={8}
          value={dataTemplateObject.commands}
          onChange={(event, newValue) => {
            dataTemplateObject.commands = newValue;
          }}
          styles={textStyles}
        />
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
          onClick={() => setState({ step: 'basicInformation' })}
        />
        <PrimaryButton text='Next' onClick={submit} />
      </Stack>
    </DetailsArea>
  );
};

Detail.propTypes = {
  user: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default Detail;
