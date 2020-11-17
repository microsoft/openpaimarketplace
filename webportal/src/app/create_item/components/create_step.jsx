// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Stack } from 'office-ui-fabric-react';
import { getTheme } from '@uifabric/styling';

const { palette } = getTheme();

const StepArea = styled.div`
  position: absolute;
  left: ${({ left }) => left};
  top: -8px;
  width: 16px;
  display: flex;
  flex-direction: column;
`;

const CircleDot = styled.div`
  background: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;

const StepText = styled.div`
  margin-top: 10px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 150px;
  margin-left: -65px;
  font-size: small;
  color: ${({ color }) => color};
`;

const GrayLine = styled.div`
  position: relative;
  width: 30%;
  height: 50px;
  border-top: 2px solid LightGray;
  margin-top: 20px;
`;

const CreateStep = props => {
  return (
    <Stack horizontalAlign='center'>
      <GrayLine>
        <StepArea left='-8px'>
          <CircleDot
            color={
              props.step === 'uploadFiles' ? palette.themePrimary : 'LightGray'
            }
          />
          <StepText color={props.step === 'uploadFiles' ? 'black' : 'gray'}>
            Upload Files
          </StepText>
        </StepArea>
        <StepArea left='calc(50% - 8px)'>
          <CircleDot
            color={
              props.step === 'basicInformation'
                ? palette.themePrimary
                : 'LightGray'
            }
          />
          <StepText
            color={props.step === 'basicInformation' ? 'black' : 'gray'}
          >
            Basic information
          </StepText>
        </StepArea>
        <StepArea left='calc(100% - 8px)'>
          <CircleDot
            color={props.step === 'detail' ? palette.themePrimary : 'LightGray'}
          />
          <StepText color={props.step === 'detail' ? 'black' : 'gray'}>
            Detail
          </StepText>
        </StepArea>
      </GrayLine>
    </Stack>
  );
};

CreateStep.propTypes = {
  step: PropTypes.string,
};

export default CreateStep;
