# CIFAR-10 Single Node DP Job Template

This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI. In this example, we use the DataParallel.

DataParallel splits your data automatically and sends job orders to multiple models on several GPUs. After each model finishes their job, DataParallel collects and merges the results before returning it to you.

This example program can only run on single-node, but you can choose to use multiple gpus and cpus.


## Training Data

The training set is using [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) dataset. PyTorch provides CIFAR-10 download in `torchvision.datasets.CIFAR10` and *DataLoader* in `torch.utils.data.DataLoader`.

## How to use

### Prerequisites
N/A
  
### Training command

To run the job, you should apply **4 SKU** resources. The training code is as below.
```
wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-node-gpus-cpu-DP.py

python cifar10-single-node-gpus-cpu-DP.py --gpuid 0,1,2,3
```

### Get the result model

You can view the training process and result in the logs when training process is finished.

