// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StorageCard from './storage_card';
import { isNil, isEmpty } from 'lodash';
import CodeWrapper from 'App/components/code_wrapper';

const JobTemplateDetail = props => {
  const { marketItem } = props;
  const dockerImage = marketItem.protocol.prerequisites.filter(
    item => item.type === 'dockerimage',
  )[0];
  const dataStorages = marketItem.protocol.prerequisites.filter(
    item => item.type === 'data',
  );
  const codeStorages = marketItem.protocol.prerequisites.filter(
    item => item.type === 'script',
  );
  const outputStorages = marketItem.protocol.prerequisites.filter(
    item => item.type === 'output',
  );
  // TODO: multiple taskroles scenario
  const [ports, setPorts] = useState([]);
  const [commands, setCommands] = useState([]);

  // set ports and commands
  useEffect(() => {
    const newPorts = [];
    const newCommands = [];
    for (const taskRole in marketItem.protocol.taskRoles) {
      if (
        !isNil(
          marketItem.protocol.taskRoles[taskRole].resourcePerInstance.ports,
        )
      ) {
        newPorts.push(
          ...Object.keys(
            marketItem.protocol.taskRoles[taskRole].resourcePerInstance.ports,
          ),
        );
      }
      if (!isNil(marketItem.protocol.taskRoles[taskRole].commands)) {
        newCommands.push(...marketItem.protocol.taskRoles[taskRole].commands);
      }
    }
    setCommands(newCommands);
    setPorts(newPorts);
  }, []);

  return (
    <Stack gap='m'>
      <Text variant='xLarge'>Docker Image:</Text>
      <CodeWrapper>
        <Text variant='large'>{dockerImage.uri}</Text>
      </CodeWrapper>
      <Text variant='xLarge'>Ports:</Text>
      <CodeWrapper>
        {isEmpty(ports) ? (
          <Text>There is no ports setting</Text>
        ) : (
          <Stack horizontal gap='s1'>
            {ports.map(port => (
              <Text key={port}>{port}</Text>
            ))}
          </Stack>
        )}
      </CodeWrapper>
      <Text variant='xLarge'>Data Storage:</Text>
      <StorageCard storages={dataStorages} />
      <Text variant='xLarge'>Code Storage:</Text>
      <StorageCard storages={codeStorages} />
      <Text variant='xLarge'>Output Storage:</Text>
      <StorageCard storages={outputStorages} />
      <Text variant='xLarge'>Commands:</Text>
      <CodeWrapper>
        <Stack gap='s2'>
          {commands.map(command => (
            <Text key={command}>{command}</Text>
          ))}
        </Stack>
      </CodeWrapper>
    </Stack>
  );
};

JobTemplateDetail.propTypes = {
  marketItem: PropTypes.object,
};

export default JobTemplateDetail;
