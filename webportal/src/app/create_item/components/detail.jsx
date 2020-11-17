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
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { isNil, isEmpty } from 'lodash';
import { createMarketItem } from 'App/utils/marketplace_api';

const DetailsArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const Detail = props => {
  const { itemProtocol, itemObject, setStep } = props;

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
    console.log(itemObject);
    createMarketItem(itemObject)
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
          required
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
        <Pivot linkSize={PivotLinkSize.large}>
          <PivotItem headerText='Data Storage'>
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
          </PivotItem>
          <PivotItem headerText='Code Storage'>
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
          </PivotItem>
          <PivotItem headerText='Output Storage'>
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
          </PivotItem>
        </Pivot>
        <TextField
          label='Commands'
          readOnly={true}
          multiline={true}
          rows={7}
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
