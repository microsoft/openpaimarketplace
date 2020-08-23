import { assign, isNil, isEmpty } from 'lodash';
import yaml from 'js-yaml';

export async function generateJobProtocol(item) {
  return item.protocol
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
      protocol.taskRoles.taskrole.resourcePerInstance.ports = {};
      protocol.taskRoles.taskrole.resourcePerInstance.ports[port] = 1;
    });
  }
  protocol.taskRoles.taskrole.commands.push(...templateItem.content.commands);

  return protocol;
}

async function generateJobProtocolFromOld(item) {
  const res = await fetch(
    `https://microsoft.github.io/openpaimarketplace/examples/yaml_templates/${item.content.config}`,
  );
  const text = await res.text();
  const protocol = yaml.safeLoad(text);
  return protocol;
}
