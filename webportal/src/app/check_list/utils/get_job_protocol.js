import { get, assign, isNil } from 'lodash';

export function getJobProtocol(items) {
  let defaultJobProtocol = {
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
  items.map(item => {
    if (item.type === 'data') {
      const teamStorageConfig = {
        extras: {
          'com.microsoft.pai.runtimeplugin': [
            {
              plugin: 'teamwise_storage',
              parameters: {
                storageConfigNames: [`${item.content.dataStorage.storageName}`],
              },
            },
          ],
        },
      };
      assign(defaultJobProtocol, teamStorageConfig);
    }
    if (item.type === 'model') {
      // if (!isNil(get(item, 'content.codeStorage'))) {
      //   if (containsTeamStorageConfig(defaultJobProtocol)) {
      //     const plugins = get(defaultJobProtocol, [
      //       extras,
      //       'com.microsoft.pai.runtimeplugin',
      //     ]);
      //     plugins.map(plugin => {
      //       if (plugin.plugin === 'teamwise_storage') {
      //         plugin.parameters.storageConfigNames.push(
      //           `${item.content.codeStorage.storageName}`,
      //         );
      //       }
      //     });
      //   }
      // }
      if (!isNil(get(item, 'content.outputStorage'))) {
        // if (containsTeamStorageConfig(defaultJobProtocol)) {
        //   // const plugins = get(defaultJobProtocol, [
        //   //   extras,
        //   //   'com.microsoft.pai.runtimeplugin',
        //   // ]);
        //   // plugins.map(plugin => {
        //   //   if (plugin.plugin === 'teamwise_storage') {
        //   //     plugin.parameters.storageConfigNames.push(
        //   //       `${item.content.outputStorage.storageName}`,
        //   //     );
        //   //   }
        //   // });
        // } else {
        // }
      }
      // Image
      const imageConfig = {
        prerequisites: [
          {
            type: 'dockerimage',
            uri: `${item.content.dockerImage}`,
            name: 'docker_image_0',
          },
        ],
      };
      assign(defaultJobProtocol, imageConfig);
      // Commands
      let commands = [];
      if (!isNil(item.content.environmentVariables)) {
        Object.keys(item.content.environmentVariables).map(key => {
          commands.push(
            `export ${key}=${item.content.environmentVariables[key].value}`,
          );
        });
      }
      commands.push(...item.content.commands);
      defaultJobProtocol.taskRoles.taskrole.commands.push(...commands);
    }
  });
  return defaultJobProtocol;
}

function containsTeamStorageConfig(protocol) {
  const plugins = get(defaultJobProtocol, [
    'extras',
    'com.microsoft.pai.runtimeplugin',
  ]);
  if (isNil(plugins)) {
    return false;
  }
  plugins.map(plugin => {
    if (plugin.plugin === 'teamwise_storage') {
      return true;
    }
  });
  return false;
}
