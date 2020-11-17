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
import yaml from 'js-yaml';

const DetailsArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const Detail = props => {
  const { user, itemProtocol, setItemProtocol, itemObject, setStep } = props;

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

  const dockerImage = itemProtocol.prerequisites.filter(
    item => item.type === 'dockerimage',
  )[0];
  const dataStorage = itemProtocol.prerequisites.filter(
    item => item.type === 'data',
  )[0];
  const codeStorage = itemProtocol.prerequisites.filter(
    item => item.type === 'script',
  )[0];
  const outputStorage = itemProtocol.prerequisites.filter(
    item => item.type === 'output',
  )[0];
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
    createMarketItem({
      ...itemObject,
      ...{
        author: user,
        categories: itemProtocol.categories,
        protocol: yaml.safeDump(itemProtocol),
        status: 'approved',
      },
    })
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
          value={dockerImage.uri}
          onChange={(event, newValue) => {
            for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
              if (itemProtocol.prerequisites[i].type === 'dockerimage') {
                itemProtocol.prerequisites[i].uri = newValue;
                break;
              }
            }
            setItemProtocol(itemProtocol);
          }}
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
              readOnly={dataStorage === undefined}
              onChange={(event, newValue) => {
                for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
                  if (itemProtocol.prerequisites[i].type === 'data') {
                    itemProtocol.prerequisites[i].name = newValue;
                    break;
                  }
                }
                setItemProtocol(itemProtocol);
              }}
              styles={textStyles}
            />
            <TextField
              label='Storage Path'
              value={dataStorage ? dataStorage.uri : 'N/A'}
              readOnly={dataStorage === undefined}
              onChange={(event, newValue) => {
                for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
                  if (itemProtocol.prerequisites[i].type === 'data') {
                    itemProtocol.prerequisites[i].uri = newValue;
                    break;
                  }
                }
                setItemProtocol(itemProtocol);
              }}
              styles={textStyles}
            />
          </PivotItem>
          <PivotItem headerText='Code Storage'>
            <TextField
              label='Storage Name'
              value={codeStorage ? codeStorage.name : 'N/A'}
              readOnly={codeStorage === undefined}
              onChange={(event, newValue) => {
                for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
                  if (itemProtocol.prerequisites[i].type === 'script') {
                    itemProtocol.prerequisites[i].name = newValue;
                    break;
                  }
                }
                setItemProtocol(itemProtocol);
              }}
              styles={textStyles}
            />
            <TextField
              label='Storage Path'
              value={codeStorage ? codeStorage.uri : 'N/A'}
              readOnly={codeStorage === undefined}
              onChange={(event, newValue) => {
                for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
                  if (itemProtocol.prerequisites[i].type === 'script') {
                    itemProtocol.prerequisites[i].uri = newValue;
                    break;
                  }
                }
                setItemProtocol(itemProtocol);
              }}
              styles={textStyles}
            />
          </PivotItem>
          <PivotItem headerText='Output Storage'>
            <TextField
              label='Storage Name'
              value={outputStorage.name ? outputStorage.name : 'N/A'}
              readOnly={outputStorage === undefined}
              onChange={(event, newValue) => {
                for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
                  if (itemProtocol.prerequisites[i].type === 'output') {
                    itemProtocol.prerequisites[i].name = newValue;
                    break;
                  }
                }
                setItemProtocol(itemProtocol);
              }}
              styles={textStyles}
            />
            <TextField
              label='Storage Path'
              value={outputStorage ? outputStorage.uri : 'N/A'}
              readOnly={outputStorage === undefined}
              onChange={(event, newValue) => {
                for (let i = 0; i < itemProtocol.prerequisites.length; ++i) {
                  if (itemProtocol.prerequisites[i].type === 'output') {
                    itemProtocol.prerequisites[i].uri = newValue;
                    break;
                  }
                }
                setItemProtocol(itemProtocol);
              }}
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
