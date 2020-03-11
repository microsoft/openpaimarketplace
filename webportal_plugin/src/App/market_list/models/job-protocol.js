// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { jobProtocolSchema } from './protocol-schema';

import { get, isEmpty, cloneDeep } from 'lodash';
import yaml from 'js-yaml';
import Joi from 'joi-browser';
import { removeEmptyProperties } from '../utils/utils';
import { TaskRolesManager } from '../utils/task-roles-manager';

export class JobProtocol {
  constructor(props) {
    const {
      name,
      jobRetryCount,
      prerequisites,
      parameters,
      taskRoles,
      deployments,
      description,
      contributor,
      secrets,
      defaults,
      extras,
    } = props;
    this.protocolVersion = 2;
    this.name = name || '';
    this.description = description || '';
    this.contributor = contributor || '';
    this.type = 'job';
    this.jobRetryCount = jobRetryCount || 0;
    this.prerequisites = prerequisites || [];
    this.parameters = parameters || {};
    this.taskRoles = taskRoles || {};
    this.deployments = deployments || {};
    this.secrets = secrets || {};
    this.defaults = defaults || {};
    this.extras = extras || {};
  }

  // make sure protocolYaml is valid before use this function
  static fromYaml(protocolYaml) {
    try {
      const jobProtocol = yaml.safeLoad(protocolYaml);
      return new JobProtocol(jobProtocol);
    } catch (e) {
      alert(e.message);
    }
  }

  static validateFromYaml(protocolYaml) {
    try {
      const protocol = yaml.safeLoad(protocolYaml);
      return JobProtocol.validateFromObject(protocol);
    } catch (err) {
      return String(err.message);
    }
  }

  static safePruneProtocol(protocol) {
    const prunedProtocol = removeEmptyProperties(protocol);
    const taskRoles = cloneDeep(prunedProtocol.taskRoles);
    Object.keys(taskRoles).forEach(taskRoleName => {
      const taskRoleContent = taskRoles[taskRoleName];
      if (isEmpty(taskRoleContent.commands)) {
        return;
      }
      taskRoleContent.commands = taskRoleContent.commands.filter(
        line => !isEmpty(line),
      );
    });
    prunedProtocol.taskRoles = taskRoles;
    return prunedProtocol;
  }

  static validateFromObject(protocol) {
    const result = Joi.validate(
      JobProtocol.safePruneProtocol(protocol),
      jobProtocolSchema,
    );
    return String(result.error || '');
  }

  getUpdatedProtocol(
    jobBasicInfo,
    jobTaskRoles,
    jobParameters,
    jobSecrets,
    protocolExtras,
  ) {
    const parameters = removeEmptyProperties(
      jobParameters.reduce((res, parameter) => {
        res[parameter.key] = parameter.value;
        return res;
      }, {}),
    );
    let deployments = this._generateDeployments(jobTaskRoles);
    const deployName = get(this, 'defaults.deployment', 'defaultDeployment');
    deployments = isEmpty(deployments)
      ? []
      : [{ name: deployName, taskRoles: deployments }];

    const prerequisites = this.prerequisites
      .filter(prerequisite => prerequisite.type !== 'dockerimage')
      .concat(TaskRolesManager.getTaskRolesPrerequisites(jobTaskRoles))
      .map(curPre => {
        const oriPre = this.prerequisites.find(pre => pre.name === curPre.name);
        return { ...oriPre, ...curPre };
      });

    const taskRoles = this._updateAndConvertTaskRoles(jobTaskRoles);
    const secrets = removeEmptyProperties(
      jobSecrets.reduce((res, secret) => {
        res[secret.key] = secret.value;
        return res;
      }, {}),
    );
    const defaultsField = {
      ...this.defaults,
      ...removeEmptyProperties(jobBasicInfo.getDefaults()),
    };

    return new JobProtocol({
      ...this,
      ...jobBasicInfo.convertToProtocolFormat(),
      parameters: parameters,
      taskRoles: taskRoles,
      prerequisites: prerequisites,
      deployments: deployments,
      secrets: secrets,
      defaults: defaultsField,
      extras: protocolExtras,
    });
  }

  _updateAndConvertTaskRoles(jobTaskRoles) {
    return jobTaskRoles.reduce(
      (res, taskRole) => ({
        ...res,
        ...taskRole.convertToProtocolFormat(),
      }),
      {},
    );
  }

  _generateDeployments(jobTaskRoles) {
    const deployments = jobTaskRoles.reduce((res, taskRole) => {
      res[taskRole.name] = taskRole.getDeployment();
      return res;
    }, {});
    return removeEmptyProperties(deployments);
  }

  toYaml() {
    try {
      return yaml.safeDump(JobProtocol.safePruneProtocol(this));
    } catch (e) {
      alert(e.message);
    }
  }
}
