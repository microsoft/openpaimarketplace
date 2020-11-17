// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Stack } from 'office-ui-fabric-react';
import { getTheme } from '@uifabric/styling';
import { ReactComponent as UploadIcon } from 'App/assets/upload.svg';

const { palette } = getTheme();

const UploadArea = styled.div`
  border-style: dashed;
  border-width: 1px;
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 150px;
  padding: 20px;
  background: ${palette.white};
`;

const UploadFilesText = styled.p`
  font-size: large;
`;

const MessageText = styled.p`
  font-size: small;
`;

const ErrorText = styled.p`
  font-size: small;
  color: ${palette.red};
`;

const UploadFiles = ({ getRootProps, getInputProps, loadYamlError }) => {
  return (
    <UploadArea {...getRootProps()}>
      <Stack horizontalAlign='center' gap='l1'>
        <input {...getInputProps()} />
        <UploadFilesText>Upload files</UploadFilesText>
        <div style={{ width: '30px' }}>
          <UploadIcon />
        </div>
        <MessageText>Drag and drop or click here to upload a file</MessageText>
        {loadYamlError !== null && <ErrorText>{loadYamlError}</ErrorText>}
      </Stack>
    </UploadArea>
  );
};

UploadFiles.propTypes = {
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func,
  loadYamlError: PropTypes.string,
};

export default UploadFiles;
