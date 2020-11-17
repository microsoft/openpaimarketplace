
  # DP Example

  This example shows how to train a custom neural network on cifar10 with Pytorch on OpenPAI. In this example, we use the DataParallel.

  DataParallel splits your data automatically and sends job orders to multiple models on several GPUs. After each model finishes their job, DataParallel collects and merges the results before returning it to you.

  This example program can only run on single-node, but you can choose to use multiple gpus and cpus.

