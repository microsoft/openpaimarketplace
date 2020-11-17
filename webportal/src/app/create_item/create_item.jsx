// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import yaml from 'js-yaml';
import {
  ActionButton,
  DefaultButton,
  Stack,
  StackItem,
} from 'office-ui-fabric-react';

import Page from 'App/components/page';
import Context from 'App/context';
import CreateStep from './components/create_step';
import UploadFiles from './components/upload_files';
import BasicInformation from './components/basic_information';
import Detail from './components/detail';

const { spacing, palette } = getTheme();

const GrayCard = styled.div`
  padding: ${spacing.m};
  background: ${palette.neutralLighterAlt};
  height: 600px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
`;

const CreateItem = props => {
  const { api, user, token, isAdmin, routeProps } = props;
  const [loadYamlError, setLoadYamlError] = useState(null);

  const [itemProtocol, setItemProtocol] = useState(null);
  const [itemObject, setItemObject] = useState({
    summary: '',
    type: '',
  });
  const [step, setStep] = useState('uploadFiles');

  const onDrop = useCallback(files => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      try {
        setItemProtocol(yaml.safeLoad(reader.result));
        setStep('basicInformation');
        setLoadYamlError(null);
      } catch (err) {
        setLoadYamlError(err.message);
      }
    };
    reader.readAsText(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const context = {
    user,
    api,
    token,
    isAdmin,
    history: routeProps.history,
    itemProtocol,
    setItemProtocol,
    itemObject,
    setItemObject,
  };

  return (
    <Context.Provider value={context}>
      <Page>
        <Stack horizontal horizontalAlign='space-between'>
          <StackItem gap='0'>
            <ActionButton
              onClick={() => {
                window.location.href = window.location.href.split(
                  '/create_item',
                )[0];
              }}
              styles={{ root: { color: palette.themePrimary } }}
            >
              Marketplace / Create
            </ActionButton>
          </StackItem>
          <DefaultButton
            iconProps={{ iconName: 'Add' }}
            text='Create'
            href={`${window.location}create_item`}
          />
        </Stack>
        <Stack>
          <GrayCard>
            <CreateStep step={step} />
            {step === 'uploadFiles' && (
              <UploadFiles
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                loadYamlError={loadYamlError}
              />
            )}
            {step === 'basicInformation' && (
              <BasicInformation
                user={user}
                itemProtocol={itemProtocol}
                setItemProtocol={setItemProtocol}
                itemObject={itemObject}
                setItemObject={setItemObject}
                setStep={setStep}
              />
            )}
            {step === 'detail' && (
              <Detail
                user={user}
                itemProtocol={itemProtocol}
                setItemProtocol={setItemProtocol}
                itemObject={itemObject}
                setStep={setStep}
              />
            )}
          </GrayCard>
        </Stack>
      </Page>
    </Context.Provider>
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
