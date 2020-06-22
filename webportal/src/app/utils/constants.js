// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export const MARKETPLACE_API_URL = process.env.MARKETPLACE_API_URL;

export const MARKET_ITEM_LIST = [
  {
    id: '0b41d10e-36e5-4e97-95c2-27726dd94f34',
    name: 'caffe_mnist',
    author: 'OpenPAI',
    category: 'OpenPAI Official',
    tags: ['official example'],
    introduction: 'caffe_mnist',
    description:
      '# Caffe MNIST Example\nThis example shows how to train LeNet on MNIST with Caffe on OpenPAI.\n\n## Dataset\nThe MNIST dataset is downloaded from MNIST website and converted into caffe format.\n\n## LeNet\nThis example will use the LeNet network, which is known to work well on digit classification tasks.\nIt will use a slightly different version from the original LeNet implementation,\nreplacing the sigmoid activations with Rectified Linear Unit (ReLU) activations for the neurons.\n\nThe design of LeNet contains the essence of CNNs that are still used in larger models such as the ones in ImageNet.\nIn general, it consists of a convolutional layer followed by a pooling layer, another convolution layer followed by a pooling layer,\nand then two fully connected layers similar to the conventional multilayer perceptrons.\nThe layers are defined in `$CAFFE_ROOT/examples/mnist/lenet_train_test.prototxt`.\n\n## Reference\nhttp://caffe.berkeleyvision.org/gathered/examples/mnist.html\n',
    jobConfig: {
      protocolVersion: 2,
      name: 'caffe_mnist',
      type: 'job',
      version: 1,
      contributor: 'OpenPAI',
      description:
        '# Caffe MNIST Example\nThis example shows how to train LeNet on MNIST with Caffe on OpenPAI.\n\n## Dataset\nThe MNIST dataset is downloaded from MNIST website and converted into caffe format.\n\n## LeNet\nThis example will use the LeNet network, which is known to work well on digit classification tasks.\nIt will use a slightly different version from the original LeNet implementation,\nreplacing the sigmoid activations with Rectified Linear Unit (ReLU) activations for the neurons.\n\nThe design of LeNet contains the essence of CNNs that are still used in larger models such as the ones in ImageNet.\nIn general, it consists of a convolutional layer followed by a pooling layer, another convolution layer followed by a pooling layer,\nand then two fully connected layers similar to the conventional multilayer perceptrons.\nThe layers are defined in `$CAFFE_ROOT/examples/mnist/lenet_train_test.prototxt`.\n\n## Reference\nhttp://caffe.berkeleyvision.org/gathered/examples/mnist.html\n',
      prerequisites: [
        {
          protocolVersion: 2,
          name: 'caffe_example',
          type: 'dockerimage',
          version: 1,
          contributor: 'OpenPAI',
          description:
            'This is an [example caffe Docker image on OpenPAI](https://github.com/Microsoft/pai/tree/master/examples/caffe).\n',
          uri: 'openpai/pai.example.caffe',
        },
      ],
      taskRoles: {
        train: {
          instances: 1,
          completion: {
            minSucceededInstances: 1,
          },
          dockerImage: 'caffe_example',
          resourcePerInstance: {
            cpu: 4,
            memoryMB: 8192,
            gpu: 1,
          },
          commands: ['./examples/mnist/train_lenet.sh'],
        },
      },
      deployments: [
        {
          name: 'caffe_example',
          taskRoles: {
            train: {
              preCommands: [
                './data/mnist/get_mnist.sh',
                './examples/mnist/create_mnist.sh',
              ],
            },
          },
        },
      ],
      defaults: {
        deployment: 'caffe_example',
      },
    },
    submits: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-05-06T04:52:48.289Z',
    updatedAt: '2020-05-06T04:52:48.289Z',
  },
  {
    id: 'c5cd5f35-afc2-4526-b48f-5dd39cd26cf2',
    name: 'chainer_cifar',
    author: 'OpenPAI',
    category: 'OpenPAI Official',
    tags: ['official example'],
    introduction: 'chainer_cifar',
    description:
      "# Chainer CIFAR Image Classification Example\nThis is an example of a convolutional neural network (convnet) applied to an image classification task using the CIFAR-10 or CIFAR-100 dataset on OpenPAI.\nThe CIFAR datasets can be a good choice for initial experiments with convnets because the size and\nnumber of images is small enough to allow typical models to be trained in a reasonable amount of time.\nHowever, the classification task is still challenging because natural images are used.\n\nSpecifically, there are 50000 color training images of size 32x32 pixels with either 10 class labels (for CIFAR-10) or 100 class labels (for CIFAR-100).\nFor CIFAR-10, state of the art methods without data augmentation can achieve similar to human-level classification accuracy of around 94%.\nFor CIFAR-100, state of the art without data augmentation is around 20% (DenseNet).\n\nIf you want to run this example on the N-th GPU, pass `--gpu=N` to the script. To run on CPU, pass `--gpu=-1`.\nFor example, to run the default model, which uses CIFAR-10 and GPU 0, `python train_cifar.py`;\nto run the CIFAR-100 dataset on GPU 1, `python train_cifar.py --gpu=1 --dataset='cifar100'`.\n\nReference, https://github.com/chainer/chainer/tree/master/examples/cifar\n",
    jobConfig: {
      protocolVersion: 2,
      name: 'chainer_cifar',
      type: 'job',
      version: 1,
      contributor: 'OpenPAI',
      description:
        "# Chainer CIFAR Image Classification Example\nThis is an example of a convolutional neural network (convnet) applied to an image classification task using the CIFAR-10 or CIFAR-100 dataset on OpenPAI.\nThe CIFAR datasets can be a good choice for initial experiments with convnets because the size and\nnumber of images is small enough to allow typical models to be trained in a reasonable amount of time.\nHowever, the classification task is still challenging because natural images are used.\n\nSpecifically, there are 50000 color training images of size 32x32 pixels with either 10 class labels (for CIFAR-10) or 100 class labels (for CIFAR-100).\nFor CIFAR-10, state of the art methods without data augmentation can achieve similar to human-level classification accuracy of around 94%.\nFor CIFAR-100, state of the art without data augmentation is around 20% (DenseNet).\n\nIf you want to run this example on the N-th GPU, pass `--gpu=N` to the script. To run on CPU, pass `--gpu=-1`.\nFor example, to run the default model, which uses CIFAR-10 and GPU 0, `python train_cifar.py`;\nto run the CIFAR-100 dataset on GPU 1, `python train_cifar.py --gpu=1 --dataset='cifar100'`.\n\nReference, https://github.com/chainer/chainer/tree/master/examples/cifar\n",
      prerequisites: [
        {
          protocolVersion: 2,
          name: 'chainer_example',
          type: 'dockerimage',
          version: 1,
          contributor: 'OpenPAI',
          description:
            'This is an [example chainer Docker image on OpenPAI](https://github.com/Microsoft/pai/tree/master/examples/chainer).\n',
          uri: 'openpai/pai.example.chainer',
        },
      ],
      taskRoles: {
        train: {
          instances: 1,
          completion: {
            minSucceededInstances: 1,
          },
          dockerImage: 'chainer_example',
          resourcePerInstance: {
            cpu: 4,
            memoryMB: 8192,
            gpu: 1,
          },
          commands: ['python ./chainer/examples/cifar/train_cifar.py'],
        },
      },
    },
    submits: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-05-06T04:52:48.291Z',
    updatedAt: '2020-05-06T04:52:48.291Z',
  },
  {
    id: 'fba7b293-fe8c-4b71-8bf6-b590abb996af',
    name: 'testing...',
    author: 'admin',
    category: 'custom',
    tags: ['sa'],
    introduction: 'mlml',
    description: 'kmlklkl',
    jobConfig: {
      protocolVersion: 2,
      name: 'admin_96befe3b',
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
          completion: {
            minFailedInstances: 1,
            minSucceededInstances: -1,
          },
          taskRetryCount: 0,
          dockerImage: 'docker_image_0',
          resourcePerInstance: {
            gpu: 1,
            cpu: 4,
            memoryMB: 8192,
          },
          commands: ['sleep 100s'],
        },
      },
      defaults: {
        virtualCluster: 'default',
      },
      extras: {
        'com.microsoft.pai.runtimeplugin': [
          {
            plugin: 'ssh',
            parameters: {
              jobssh: true,
            },
          },
        ],
      },
    },
    submits: 0,
    starNumber: 0,
    status: 'rejected',
    createdAt: '2020-05-07T02:49:38.716Z',
    updatedAt: '2020-05-07T02:49:48.324Z',
  },
];
