# PyTorch DDP Job Template (Gloo backend)

  This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI. In this example, we use the DistributedDataParallel.

  DistributedDataParallel (DDP) implements data parallelism at the module level which can run across multiple machines. Applications using DDP should spawn multiple processes and create a single DDP instance per process.

  This example can be run on single-node or on multi-node, using Gloo backend for distributed GPU training.If you encounter any problem with NCCL, you can use Gloo as the fallback option. (Note that Gloo currently runs slower than NCCL for GPUs.)

## Training Data

The training set is using [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) dataset. PyTorch provides CIFAR-10 download in `torchvision.datasets.CIFAR10` and *DataLoader* in `torch.utils.data.DataLoader`.

## How to use

### Prerequisites

Clone and install `Apex`, and set environment variable first.
```
export GLOO_SOCKET_IFNAME=eth0
git clone https://github.com/NVIDIA/apex
cd apex
python setup.py install
```
  
### Training command

To run the job, you should apply **2 SKU** resources. The training code is as below.
```
cd ..
wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-mul-DDP-nccl-gloo.py

python cifar10-single-mul-DDP-nccl-gloo.py -n 2 -g 2 --epochs 2 --dist-backend gloo
```

### Get the result model

You can view the training process and result in the logs when training process is finished.
