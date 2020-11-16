# Pytorch DDP Example With Apex

  This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI.

  We installed Apex before running `python <script.py>`,we recommend using the right network interface, so we used environment variables, and the sample program will be trained on two machines, each with two gpus.

  If you’re using the Gloo backend, you can specify multiple interfaces by separating them by a comma, like this: . The backend will dispatch operations in a round-robin fashion across these interfaces.And mixed precision training (training in a combination of float (FP32) and half (FP16) precision) allows us to use larger batch sizes and take advantage of NVIDIA Tensor Cores for faster computation.

