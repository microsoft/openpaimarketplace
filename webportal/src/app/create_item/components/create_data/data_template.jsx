// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import yaml from 'js-yaml';

const dataTemplate = {
  protocolVersion: 2,
  name: '',
  type: 'job',
  jobRetryCount: 0,
  prerequisites: [
    {
      name: 'default_image',
      type: 'dockerimage',
      uri: '',
    },
    {
      name: '',
      type: 'data',
      uri: [],
    },
  ],
  taskRoles: {
    taskrole: {
      instances: 1,
      completion: {
        minFailedInstances: 1,
      },
      taskRetryCount: 0,
      dockerImage: 'default_image',
      data: '',
      resourcePerInstance: {
        cpu: 5,
        memoryMB: 50000,
        gpu: 1,
      },
      commands: [],
    },
  },
  defaults: {
    virtualCluster: 'default',
  },
  extras: {
    hivedScheduler: { taskRoles: { taskrole: { skuNum: 1, skuType: 'K80' } } },
  },
};

function generateDataTemplate(dataTemplateObject, itemObject) {
  dataTemplate.prerequisites[0].uri = dataTemplateObject.dockerImage;
  dataTemplate.prerequisites[1].name = dataTemplateObject.storageName;
  dataTemplate.prerequisites[1].uri = [dataTemplateObject.storagePath];
  dataTemplate.taskRoles.taskrole.data = dataTemplateObject.storageName;
  dataTemplate.taskRoles.taskrole.commands = dataTemplateObject.commands.split(
    '\n',
  );
  dataTemplate.name = itemObject.name.replace(/ /g, '_');
  return yaml.safeDump(dataTemplate);
}

export default generateDataTemplate;
