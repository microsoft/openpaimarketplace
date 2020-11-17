# Covid Chestxray Model Training Job

  This is a covid chestxray model training process.

  ## Training Data

  You could use [covid-chestxray-dataset](https://github.com/ieee8023/covid-chestxray-dataset) or other dataset supported by [torchxrayvision](https://github.com/mlmed/torchxrayvision).

  ## How to use

  In this job, three environment variables are set:

  DATA_DIR: the training data path in container, by default it uses prepared data. If you want to use your own datasets change the $DATA_DIR with the new URL.

  OUTPUT_DIR: the path to store output result, i.e. the training model files. By default it will mount a nfs storage, and you could change it with other mounted storage.

  ## How to check the result

  After job finished successfully, you could check the output model files in the output storage.
