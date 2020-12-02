# PyTorch DDP Job Template With Apex (Gloo backend)

This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI.

We installed Apex before running `python <script.py>`,we recommend using the right network interface, so we used environment variables, and the sample program will be trained on two machines, each with two gpus.

If you’re using the Gloo backend, you can specify multiple interfaces by separating them by a comma, like this: . The backend will dispatch operations in a round-robin fashion across these interfaces.And mixed precision training (training in a combination of float (FP32) and half (FP16) precision) allows us to use larger batch sizes and take advantage of NVIDIA Tensor Cores for faster computation.


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
wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-mul-DDP-nccl-gloo-Apex-mixed.py

python  cifar10-single-mul-DDP-nccl-gloo-Apex-mixed.py -n 2 -g 2 --epochs 2 --dist-backend gloo
```

### Get the result model

You can view the training process and result in the logs when training process is finished.
