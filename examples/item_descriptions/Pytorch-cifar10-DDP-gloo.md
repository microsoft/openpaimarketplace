
  # Pytorch DDP Example

  This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI. In this example, we use the DistributedDataParallel.

  DistributedDataParallel (DDP) implements data parallelism at the module level which can run across multiple machines. Applications using DDP should spawn multiple processes and create a single DDP instance per process.

  This example can be run on single-node or on multi-node, using Gloo backend for distributed GPU training.If you encounter any problem with NCCL, you can use Gloo as the fallback option. (Note that Gloo currently runs slower than NCCL for GPUs.)
