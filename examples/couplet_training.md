# Couplet Training Job Template

This is a model training process. After training, this model will give a down part with an upper part of couplet. Please refer to Microsoft AI Edu Project for more details.

## Training Data

You could use Couplet Dataset data component as training data, or any dataset follows fairseq model requirements.

## How to use

When use this module, you should set three environment variables:

- ```DATA_DIR```: the training data path in container, by default it uses Couplet Dataset data component. If you want to use your own datasets. First make sure mount your data into container, and then change the ```$DATA_DIR``` with the path.

- PREPROCESSED_DATA_DIR: the path to store intermediate result, by default it is ./processed_data.

- ```OUTPUT_DIR```: the path to store output result, i.e. the training model files. By default it will mount a nfs storage, and you could change it with other mounted storage.

## How to check the result

After job finished successfully, you could check the output model files in the output storage. The storage server url is in details page.
