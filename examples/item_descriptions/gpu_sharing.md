# GPU Sharing Job Template

  This example shows how two jobs share one GPU in OpenPAI.

  We use `python <script.py> &` to initialize each task to be a "Linux background job". Then, the command `wait` will wait for all these jobs to finish. At last, we print the job log of each task.

  Comparing with using one GPU, gpu sharing has higher utilization in our experiement on a K80 GPU. However, this kind of GPU sharing job doesn't ensure isolation for different tasks. Thus different tasks will affect with each other, and sometimes may fail due to various reasons.


## Training Data

The training set is using [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) dataset. PyTorch provides CIFAR-10 download in `torchvision.datasets.CIFAR10` and *DataLoader* in `torch.utils.data.DataLoader`.

## How to use

### Prerequisites

The training code is under the [Microsoft OpenPAI](https://github.com/microsoft/pai) [Distributed-example](https://github.com/microsoft/pai/blob/master/examples/Distributed-example/cifar10-single-node-gpus-cpu-DP.py).

You should get the training code first.
   ```
   wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-node-gpus-cpu-DP.py
   ```
  
### Training command

Start two training processes and wait tile all of them finished. In order to share one GPU, you should apply **1 GPU resource (SKU count = 1)** for the job.

```
mkdir job1
cd job1
wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-node-gpus-cpu-DP.py
python cifar10-single-node-gpus-cpu-DP.py --epoch 200 &> log &
cd ..
mkdir job2
cd job2
wget https://raw.githubusercontent.com/microsoft/pai/master/examples/Distributed-example/cifar10-single-node-gpus-cpu-DP.py
python cifar10-single-node-gpus-cpu-DP.py --epoch 200 &> log &
cd ..
wait
```

### Get the result model

You can view the training process and result in the logs when training process is finished.

```
echo 'job1 log:'
cat job1/log
echo 'job2 log:'
cat job2/log
```



