// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Page from 'App/components/page';
import { TopBar } from 'App/top_bar';
import Summary from './components/summary';
import Detail from './components/detail';
import Context from 'App/context';
import Line from 'App/components/line';

const marketItem = {
  id: '0b41d10e-36e5-4e97-95c2-27726dd94f34',
  name: 'Couplet Dataset',
  author: 'OpenPAI',
  type: 'data',
  categories: 'Ai couplet',
  tags: ['official example'],
  summary: 'Dataset of couplet',
  description:
    '# Caffe MNIST Example\nThis example shows how to train LeNet on MNIST with Caffe on OpenPAI.\n\n## Dataset\nThe MNIST dataset is downloaded from MNIST website and converted into caffe format.\n\n## LeNet\nThis example will use the LeNet network, which is known to work well on digit classification tasks.\nIt will use a slightly different version from the original LeNet implementation,\nreplacing the sigmoid activations with Rectified Linear Unit (ReLU) activations for the neurons.\n\nThe design of LeNet contains the essence of CNNs that are still used in larger models such as the ones in ImageNet.\nIn general, it consists of a convolutional layer followed by a pooling layer, another convolution layer followed by a pooling layer,\nand then two fully connected layers similar to the conventional multilayer perceptrons.\nThe layers are defined in `$CAFFE_ROOT/examples/mnist/lenet_train_test.prototxt`.\n\n## Reference\nhttp://caffe.berkeleyvision.org/gathered/examples/mnist.html\n',
  content: {
    dataType: 'nfs',
    groups: ['default'],
    storageName: 'confignfs',
    subPath: '/couplet',
    containerPath: '/data',
  },
  useNumber: 0,
  starNumber: 0,
  status: 'approved',
  createdAt: '2020-05-06T04:52:48.289Z',
  updatedAt: '2020-05-06T04:52:48.289Z',
};

const MarketDetail = props => {
  const { api, user, token, isAdmin, routeProps } = props;

  const context = {
    user,
    api,
    token,
    isAdmin,
    history: routeProps.history,
  };

  return (
    <Context.Provider value={context}>
      <Page>
        <TopBar pageType='detail' status={marketItem.status} />
        <Summary marketItem={marketItem} />
        <Line />
        <Detail marketItem={marketItem} />
      </Page>
    </Context.Provider>
  );
};

MarketDetail.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
  routeProps: PropTypes.object,
};

export default MarketDetail;
