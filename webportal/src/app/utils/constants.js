// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-template-curly-in-string */

export const MARKETPLACE_API_URL = process.env.MARKETPLACE_API_URL;

export const MARKET_ITEM_LIST = [
  {
    id: '1',
    name: 'Couplet Dataset',
    author: 'OpenPAI',
    type: 'data',
    categories: 'AI couplet',
    tags: ['official example'],
    summary: 'Dataset of couplet',
    protocol: 'couplet_dataset.yaml',
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-08-15T04:52:48.289Z',
    updatedAt: '2020-08-15T04:52:48.289Z',
  },
  {
    id: '2',
    name: 'Couplet Training Job Template',
    author: 'OpenPAI',
    type: 'template',
    categories: 'AI couplet',
    tags: ['official example'],
    summary: 'Couplet model training job',
    protocol: 'couplet_training.yaml',
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-08-15T04:52:48.289Z',
    updatedAt: '2020-08-15T04:52:48.289Z',
  },
  {
    id: '3',
    name: 'Couplet Inference Job Template',
    author: 'OpenPAI',
    type: 'template',
    categories: 'AI couplet',
    tags: ['official example'],
    summary: 'Couplet inference service with trained model',
    protocol: 'couplet_inference.yaml',
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-08-15T04:52:48.289Z',
    updatedAt: '2020-08-15T04:52:48.289Z',
  },
];
