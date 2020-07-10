import { assign, isNil, isEmpty } from 'lodash';

export function generateJobProtocol(item) {
  const defaultJobProtocol = {
    protocolVersion: 2,
    name: 'marketplace_job',
    type: 'job',
    jobRetryCount: 0,
    prerequisites: [
      {
        type: 'dockerimage',
        uri: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
        name: 'docker_image_0',
      },
    ],
    taskRoles: {
      taskrole: {
        instances: 1,
        completion: { minFailedInstances: 1, minSucceededInstances: -1 },
        taskRetryCount: 0,
        dockerImage: 'docker_image_0',
        resourcePerInstance: { gpu: 1, cpu: 4, memoryMB: 8192 },
        commands: [],
      },
    },
    defaults: { virtualCluster: 'default' },
  };
  if (item.type === 'data') {
    return generateJobProtocolFromData(defaultJobProtocol, item);
  }
  if (item.type === 'template') {
    return generateJobProtocolFromTemplate(defaultJobProtocol, item);
  }
}

function generateJobProtocolFromData(protocol, dataItem) {
  const storageConfig = {
    extras: {
      'com.microsoft.pai.runtimeplugin': [
        {
          plugin: 'teamwise_storage',
          parameters: {
            storageConfigNames: [`${dataItem.content.dataStorage.storageName}`],
          },
        },
      ],
    },
  };
  assign(protocol, storageConfig);
  protocol.taskRoles.taskrole.commands.push(
    '# The data stored in environment variable DATA_DIR, you could use it in commands by $DATA_DIR',
  );
  protocol.taskRoles.taskrole.commands.push(
    `export DATA_DIR=${dataItem.content.dataStorage.containerPath}`,
  );

  return protocol;
}

function generateJobProtocolFromTemplate(protocol, templateItem) {
  // add image
  const imageConfig = {
    prerequisites: [
      {
        type: 'dockerimage',
        uri: `${templateItem.content.dockerImage}`,
        name: 'docker_image_0',
      },
    ],
  };
  assign(protocol, imageConfig);

  // add team storage config
  const storageConfigNames = [];
  if (!isNil(templateItem.content.dataStorage)) {
    storageConfigNames.push(templateItem.content.dataStorage.storageName);
  }
  if (!isNil(templateItem.content.codeStorage)) {
    if (
      storageConfigNames.indexOf(
        templateItem.content.codeStorage.storageName,
      ) === -1
    ) {
      storageConfigNames.push(templateItem.content.codeStorage.storageName);
    }
  }
  if (!isNil(templateItem.content.outputStorage)) {
    if (
      storageConfigNames.indexOf(
        templateItem.content.outputStorage.storageName,
      ) === -1
    ) {
      storageConfigNames.push(templateItem.content.outputStorage.storageName);
    }
  }
  const storageConfig = {
    extras: {
      'com.microsoft.pai.runtimeplugin': [
        {
          plugin: 'teamwise_storage',
          parameters: {
            storageConfigNames: storageConfigNames,
          },
        },
      ],
    },
  };
  assign(protocol, storageConfig);

  // add commands
  if (!isNil(templateItem.content.dataStorage)) {
    protocol.taskRoles.taskrole.commands.push(
      `export DATA_DIR=${templateItem.content.dataStorage.containerPath}`,
    );
  }
  if (!isNil(templateItem.content.codeStorage)) {
    protocol.taskRoles.taskrole.commands.push(
      `export CODE_DIR=${templateItem.content.codeStorage.containerPath}`,
    );
  }
  if (!isNil(templateItem.content.outputStorage)) {
    protocol.taskRoles.taskrole.commands.push(
      `export OUTPUT_DIR=${templateItem.content.outputStorage.containerPath}`,
    );
  }
  if (!isEmpty(templateItem.content.ports)) {
    templateItem.content.ports.map(port => {
      const command = `export ${port}=$PAI_PORT_LIST_taskrole_0_${port}`;
      protocol.taskRoles.taskrole.commands.push(command);
      protocol.taskRoles.taskrole.resourcePerInstance['ports'] = {};
      protocol.taskRoles.taskrole.resourcePerInstance['ports'][port] = 1;
    });
  }
  protocol.taskRoles.taskrole.commands.push(...templateItem.content.commands);

  return protocol;
}
