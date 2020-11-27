// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  TextField,
  Pivot,
  PivotItem,
  PivotLinkSize,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { isNil, isEmpty } from 'lodash';
import { createItem } from 'App/utils/marketplace_api';

const DetailsArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const Detail = props => {
  const { itemProtocol, itemObject, setStep } = props;

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

  const pivotStyles = {
    root: {
      left: '-8px',
      fontSize: FontSizes.mediumPlus,
      fontWeight: FontWeights.semibold,
    },
  };

  const dockerImages = itemProtocol.prerequisites.filter(
    item => item.type === 'dockerimage',
  );
  const dockerImage =
    dockerImages && dockerImages.length > 0 ? dockerImages[0] : undefined;
  const dataStorages = itemProtocol.prerequisites.filter(
    item => item.type === 'data',
  );
  const dataStorage =
    dataStorages && dataStorages.length > 0 ? dataStorages[0] : undefined;
  const codeStorages = itemProtocol.prerequisites.filter(
    item => item.type === 'script',
  );
  const codeStorage =
    codeStorages && codeStorages.length > 0 ? codeStorages[0] : undefined;
  const outputStorages = itemProtocol.prerequisites.filter(
    item => item.type === 'output',
  );
  const outputStorage =
    outputStorages && outputStorages.length > 0 ? outputStorages[0] : undefined;
  const [ports, setPorts] = useState([]);
  const [commands, setCommands] = useState([]);

  // set ports and commands
  useEffect(() => {
    const newPorts = [];
    const newCommands = [];
    for (const taskRole in itemProtocol.taskRoles) {
      if (!isNil(itemProtocol.taskRoles[taskRole].resourcePerInstance.ports)) {
        newPorts.push(
          ...Object.keys(
            itemProtocol.taskRoles[taskRole].resourcePerInstance.ports,
          ),
        );
      }
      if (!isNil(itemProtocol.taskRoles[taskRole].commands)) {
        newCommands.push(...itemProtocol.taskRoles[taskRole].commands);
      }
    }
    setCommands(newCommands);
    setPorts(newPorts);
  }, []);

  const submit = () => {
    createItem(itemObject)
      .then(id => {
        window.location.href = `${window.location.href.slice(
          0,
          window.location.href.lastIndexOf('/'),
        )}market_detail?itemId=${id}`;
      })
      .catch(err => {
        throw err;
      });
  };

  return (
    <DetailsArea>
      <Stack {...columnProps}>
        <TextField
          label='Docker Image'
          value={
            dockerImage ? dockerImage.uri : 'There is no docker image setting'
          }
          readOnly={true}
          styles={textStyles}
        />
        <TextField
          label='Ports'
          readOnly={true}
          value={
            isEmpty(ports) ? 'There is no ports setting' : JSON.stringify(ports)
          }
          styles={textStyles}
        />
        <Pivot linkSize={PivotLinkSize.normal} styles={pivotStyles}>
          <PivotItem headerText='Data Storage'>
            <Stack {...columnProps}>
              <TextField
                label='Storage Name'
                value={dataStorage ? dataStorage.name : 'N/A'}
                readOnly={true}
                styles={textStyles}
              />
              <TextField
                label='Storage Path'
                value={dataStorage ? dataStorage.uri : 'N/A'}
                readOnly={true}
                styles={textStyles}
              />
            </Stack>
          </PivotItem>
          <PivotItem headerText='Code Storage'>
            <Stack {...columnProps}>
              <TextField
                label='Storage Name'
                value={codeStorage ? codeStorage.name : 'N/A'}
                readOnly={true}
                styles={textStyles}
              />
              <TextField
                label='Storage Path'
                value={codeStorage ? codeStorage.uri : 'N/A'}
                readOnly={true}
                styles={textStyles}
              />
            </Stack>
          </PivotItem>
          <PivotItem headerText='Output Storage'>
            <Stack {...columnProps}>
              <TextField
                label='Storage Name'
                value={outputStorage ? outputStorage.name : 'N/A'}
                readOnly={true}
                styles={textStyles}
              />
              <TextField
                label='Storage Path'
                value={outputStorage ? outputStorage.uri : 'N/A'}
                readOnly={true}
                styles={textStyles}
              />
            </Stack>
          </PivotItem>
        </Pivot>
        <TextField
          label='Commands'
          readOnly={true}
          multiline={true}
          rows={8}
          value={commands.join('\n')}
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
          onClick={() => setStep('basicInformation')}
        />
        <PrimaryButton text='Next' onClick={submit} />
      </Stack>
    </DetailsArea>
  );
};

Detail.propTypes = {
  user: PropTypes.string,
  itemProtocol: PropTypes.object,
  setItemProtocol: PropTypes.func,
  itemObject: PropTypes.object,
  setItemObject: PropTypes.func,
  setStep: PropTypes.func,
};

export default Detail;
