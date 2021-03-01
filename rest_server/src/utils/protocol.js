// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// same with https://github.com/microsoft/pai/blob/master/src/rest-server/src/config/v2/protocol.js

// module dependencies
const Ajv = require('ajv');
const ajvMerge = require('ajv-merge-patch/keywords/merge');

const ajv = new Ajv({ allErrors: true });
ajvMerge(ajv);

// base schema
const baseSchema = {
  $id: 'base.json',
  type: 'object',
  properties: {
    protocolVersion: {
      enum: ['2', 2],
    },
    name: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_-]+$',
      maxLength: 255,
    },
    version: {
      type: ['string', 'number'],
    },
    contributor: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
};

// job protocol schema
const protocolSchema = {
  $id: 'protocol.json',
  type: 'object',
  properties: {
    protocolVersion: {
      $ref: 'base.json#/properties/protocolVersion',
    },
    name: {
      $ref: 'base.json#/properties/name',
    },
    type: {
      type: 'string',
      enum: ['job'],
    },
    version: {
      $ref: 'base.json#/properties/version',
    },
    contributor: {
      $ref: 'base.json#/properties/contributor',
    },
    description: {
      $ref: 'base.json#/properties/description',
    },
    prerequisites: {
      type: 'array',
      items: {
        type: 'object',
        oneOf: [
          {
            // script or output prerequisite
            $merge: {
              source: {
                $ref: 'base.json#',
              },
              with: {
                properties: {
                  type: {
                    type: 'string',
                    enum: ['script', 'output'],
                  },
                  plugin: {
                    type: 'string',
                  },
                  require: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  uri: {
                    type: 'string',
                  },
                },
                required: ['name', 'type'],
                additionalProperties: true,
              },
            },
          },
          {
            // data prerequisite
            $merge: {
              source: {
                $ref: 'base.json#',
              },
              with: {
                properties: {
                  type: {
                    type: 'string',
                    enum: ['data'],
                  },
                  plugin: {
                    type: 'string',
                  },
                  require: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  uri: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['name', 'type'],
                additionalProperties: true,
              },
            },
          },
          {
            // docker image prerequisite
            $merge: {
              source: {
                $ref: 'base.json#',
              },
              with: {
                properties: {
                  type: {
                    type: 'string',
                    enum: ['dockerimage'],
                  },
                  auth: {
                    type: 'object',
                    properties: {
                      username: {
                        type: 'string',
                      },
                      password: {
                        type: 'string',
                      },
                      registryuri: {
                        type: 'string',
                      },
                    },
                  },
                  uri: {
                    type: 'string',
                  },
                },
                required: ['name', 'type', 'uri'],
                additionalProperties: false,
              },
            },
          },
        ],
      },
      minItems: 1,
    },
    parameters: {
      type: 'object',
      additionalProperties: true,
    },
    secrets: {
      type: 'object',
      additionalProperties: true,
    },
    jobRetryCount: {
      type: 'integer',
      minimum: 0,
    },
    taskRoles: {
      patternProperties: {
        '^[a-zA-Z_][a-zA-Z0-9_]*$': {
          type: 'object',
          properties: {
            protocolVersion: {
              $ref: 'base.json#/properties/protocolVersion',
            },
            instances: {
              type: 'integer',
              minimum: 1,
            },
            completion: {
              type: 'object',
              properties: {
                minFailedInstances: {
                  type: ['integer', 'null'],
                },
                minSucceededInstances: {
                  type: ['integer', 'null'],
                },
              },
              additionalProperties: false,
            },
            taskRetryCount: {
              type: 'integer',
            },
            prerequisites: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            dockerImage: {
              type: 'string',
            },
            data: {
              type: 'string',
            },
            output: {
              type: 'string',
            },
            script: {
              type: 'string',
            },
            extraContainerOptions: {
              type: 'object',
              properties: {
                shmMB: {
                  type: 'integer',
                },
                additionalProperties: false,
              },
            },
            resourcePerInstance: {
              type: 'object',
              properties: {
                cpu: {
                  type: 'integer',
                },
                memoryMB: {
                  type: 'integer',
                },
                gpu: {
                  type: 'integer',
                },
                ports: {
                  patternProperties: {
                    '^[a-zA-Z_][a-zA-Z0-9_]*$': {
                      type: 'integer',
                    },
                  },
                  minProperties: 1,
                  additionalProperties: false,
                },
              },
              required: ['cpu', 'memoryMB', 'gpu'],
              additionalProperties: false,
            },
            commands: {
              type: 'array',
              items: {
                type: 'string',
              },
              minItems: 1,
            },
          },
          required: ['dockerImage', 'resourcePerInstance', 'commands'],
          additionalProperties: false,
        },
      },
      minProperties: 1,
      additionalProperties: false,
    },
    deployments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          protocolVersion: {
            $ref: 'base.json#/properties/protocolVersion',
          },
          name: {
            $ref: 'base.json#/properties/name',
          },
          taskRoles: {
            patternProperties: {
              '^[a-zA-Z_][a-zA-Z0-9_]*$': {
                type: 'object',
                properties: {
                  preCommands: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    minItems: 1,
                  },
                  postCommands: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    minItems: 1,
                  },
                },
                additionalProperties: false,
              },
            },
            minProperties: 1,
            additionalProperties: false,
          },
        },
        required: ['name', 'taskRoles'],
      },
      minItems: 1,
    },
    defaults: {
      type: 'object',
      properties: {
        deployment: {
          type: 'string',
        },
      },
    },
    extras: {
      type: 'object',
    },
  },
  required: ['protocolVersion', 'name', 'type', 'taskRoles'],
  additionalProperties: false,
};

const protocolValidate = ajv.addSchema(baseSchema).compile(protocolSchema);

// module exports
module.exports = {
  validate: protocolValidate,
};
