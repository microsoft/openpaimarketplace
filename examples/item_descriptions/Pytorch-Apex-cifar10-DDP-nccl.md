
  # Pytorch DDP Example With Apex

  This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI.

  We installed Apex before running `python <script.py>`,we recommend using the right network interface, so we used environment variables, and the sample program will be trained on two machines, each with two gpus.

  And mixed precision training (training in a combination of float (FP32) and half (FP16) precision) allows us to use larger batch sizes and take advantage of NVIDIA Tensor Cores for faster computation.

  The NCCL backend provides an optimized implementation of collective operations against CUDA tensors.If you only use CUDA tensors for your collective operations, consider using this backend for the best in class performance. The NCCL backend is included in the pre-built binaries with CUDA support.
