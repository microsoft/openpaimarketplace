# PyTorch DDP Job Template (NCCL backend)

This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI.In this example, we use the DistributedDataParallel.

DistributedDataParallel (DDP) implements data parallelism at the module level which can run across multiple machines. Applications using DDP should spawn multiple processes and create a single DDP instance per process.

The NCCL backend provides an optimized implementation of collective operations against CUDA tensors.If you only use CUDA tensors for your collective operations, consider using this backend for the best in class performance. The NCCL backend is included in the pre-built binaries with CUDA support.

## Training Data

The training set is using [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) dataset. PyTorch provides CIFAR-10 download in `torchvision.datasets.CIFAR10` and *DataLoader* in `torch.utils.data.DataLoader`.

## How to use

### Prerequisites

Clone and install `Apex` first.
```
git clone https://github.com/NVIDIA/apex
cd apex
python setup.py install
```
  
### Training command

To run the job, you should apply **2 SKU** resources. The training code is as below.
```
cd ..
wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-mul-DDP-nccl-gloo.py

python cifar10-single-mul-DDP-nccl-gloo.py -n 2 -g 2 --epochs 2 --dist-backend nccl
```

### Get the result model

You can view the training process and result in the logs when training process is finished.
