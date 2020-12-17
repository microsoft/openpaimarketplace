// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useCallback } from 'react';
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

const defaultDescription =
  '# Job Template Name\n\n## Training data\n\nPlease add the brief introduction of the training data\n\n## How to use\n\n### Prerequisites\n\nPlease add the prerequisites before run the job if have. The prerequisites include data downloading, package installation, environment variable settings, and so on.\n\n### Training command\n\nPlease add the training command here.\n\n### Get the result\n\nPlease show how to get the training result.\n\n## Reference\n\nYou can add the reference tutorials or projects here if have any.\n';

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
          description: defaultDescription || '',
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
          {isEmpty(itemObject.type) && (
            <SelectType itemObject={itemObject} setItemObject={setItemObject} />
          )}
          {!isEmpty(itemObject.type) && (
            <CreateStep step={step} type={itemObject.type} />
          )}
          {itemObject.type === TYPE_ENUM.JOB_TEMPLATE && (
            <CreateJob
              user={user}
              itemObject={itemObject}
              setItemObject={setItemObject}
              itemProtocol={itemProtocol}
              setItemProtocol={setItemProtocol}
              step={step}
              setStep={setStep}
              loadYamlError={loadYamlError}
              setLoadYamlError={setLoadYamlError}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
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
