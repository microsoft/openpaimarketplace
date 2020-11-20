// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@uifabric/styling';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import yaml from 'js-yaml';
import { ActionButton, Stack } from 'office-ui-fabric-react';

import Page from 'App/components/page';
import CreateStep from './components/create_step';
import UploadFiles from './components/upload_files';
import BasicInformation from './components/basic_information';
import Detail from './components/detail';

const { spacing, palette } = getTheme();

const GrayCard = styled.div`
  padding: ${spacing.m};
  background: ${palette.neutralLighterAlt};
  min-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
`;

const CreateItem = props => {
  const { user, routeProps } = props;
  const [loadYamlError, setLoadYamlError] = useState(null);

  const [itemProtocol, setItemProtocol] = useState(null);
  const [itemObject, setItemObject] = useState({
    name: '',
    summary: '',
    type: '',
    description: '',
    protocol: '',
    author: user,
    status: 'approved',
  });
  const [step, setStep] = useState('uploadFiles');

  const onDrop = useCallback(files => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      try {
        const yamlObject = yaml.safeLoad(reader.result);
        setItemProtocol(yamlObject);
        setItemObject({
          name: yamlObject.name || '',
          summary: '',
          type: '',
          description: yamlObject.description || '',
          protocol: reader.result,
          author: user,
          status: 'approved',
        });
        setStep('basicInformation');
        setLoadYamlError(null);
      } catch (err) {
        setLoadYamlError(err.message);
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
              itemObject={itemObject}
              setItemObject={setItemObject}
              setStep={setStep}
            />
          )}
          {step === 'detail' && (
            <Detail
              user={user}
              itemProtocol={itemProtocol}
              itemObject={itemObject}
              setStep={setStep}
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
