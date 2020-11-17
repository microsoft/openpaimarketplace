
  # Pytorch DDP Example

  This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI.In this example, we use the DistributedDataParallel.

  DistributedDataParallel (DDP) implements data parallelism at the module level which can run across multiple machines. Applications using DDP should spawn multiple processes and create a single DDP instance per process.

  The NCCL backend provides an optimized implementation of collective operations against CUDA tensors.If you only use CUDA tensors for your collective operations, consider using this backend for the best in class performance. The NCCL backend is included in the pre-built binaries with CUDA support.

