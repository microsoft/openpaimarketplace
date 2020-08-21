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
    name: 'Couplet Dataset test test test',
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
    id: '74c8ab09-6225-4982-8145-5be0b5c55a28',
    name: 'tensorflow_serving_mnist',
    author: 'OpenPAI',
    type: 'old',
    categories: ['official example'],
    tags: ['official example'],
    summary: 'A Tensorflow Mnist Model Example',
    description:
      '# Serving a TensorFlow MNIST Digit Recognition Model\n  This example shows you how to use TensorFlow Serving components to export a trained TensorFlow model\n  and use the standard tensorflow_model_server to serve it on OpenPAI.\n  This example uses the simple Softmax Regression model introduced in the TensorFlow tutorial for handwritten image (MNIST data) classification.\n  Reference https://www.tensorflow.org/tfx/serving/serving_basic.',
    content: {
      config: 'tensorflow_serving_mnist.yaml',
    },
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-07-28T04:52:48.289Z',
    updatedAt: '2020-07-28T04:52:48.289Z',
  },
];
