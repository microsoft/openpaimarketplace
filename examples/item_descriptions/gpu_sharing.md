# GPU Sharing Example

  This example shows how two jobs share one GPU in OpenPAI.

  We use `python <script.py> &` to initialize each task to be a "Linux background job". Then, the command `wait` will wait for all these jobs to finish. At last, we print the job log of each task.

  Comparing with using one GPU, gpu sharing has higher utilization in our experiement on a K80 GPU. However, this kind of GPU sharing job doesn't ensure isolation for different tasks. Thus different tasks will affect with each other, and sometimes may fail due to various reasons.