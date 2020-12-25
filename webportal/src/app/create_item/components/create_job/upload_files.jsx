// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FontSizes,
  FontWeights,
  Stack,
  Text,
  DefaultButton,
} from 'office-ui-fabric-react';
import { getTheme } from '@uifabric/styling';
import { ReactComponent as UploadIcon } from 'App/assets/upload.svg';

const { palette } = getTheme();

const UploadArea = styled.div`
  border-style: dashed;
  border-width: 1px;
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  padding: 20px;
  background: ${palette.white};
`;

const MessageText = styled.p`
  font-size: small;
  margin-bottom: 50px;
`;

const ErrorText = styled.p`
  font-size: small;
  color: ${palette.red};
`;

const UploadFiles = ({
  getRootProps,
  getInputProps,
  loadYamlError,
  setState,
}) => {
  return (
    <>
      <UploadArea {...getRootProps()}>
        <Stack horizontalAlign='center' gap='l2'>
          <input {...getInputProps()} />
          <Text
            styles={{
              root: {
                fontSize: FontSizes.mediumPlus,
                fontWeight: FontWeights.semibold,
              },
            }}
          >
            Upload OpenPAI Protocol
          </Text>
          <div style={{ width: '30px' }}>
            <UploadIcon />
          </div>
          <MessageText>
            <Text
              styles={{
                root: {
                  fontSize: FontSizes.smallPlus,
                },
              }}
            >
              Drag and drop or click here to upload a YAML file
            </Text>
          </MessageText>
          {loadYamlError !== null && <ErrorText>{loadYamlError}</ErrorText>}
        </Stack>
      </UploadArea>
      <DefaultButton
        style={{ width: '80px' }}
        text='Back'
        onClick={() => {
          setState({ step: 'selectType' });
        }}
      />
    </>
  );
};

UploadFiles.propTypes = {
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func,
  loadYamlError: PropTypes.string,
  setState: PropTypes.func,
};

export default UploadFiles;
