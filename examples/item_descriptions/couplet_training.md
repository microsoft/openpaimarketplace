# Couplet Training Job Template

This is a model training process. It uses fairseq model toolkit and a couplet dataset to train a language model. You can use different algorithms while training. The template job is use lstm. 

Please refer [this tutorial](https://github.com/microsoft/ai-edu/blob/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B/docs/fairseq.md) for more details.

## Training Data

In this job, we use [Couplet Dataset](https://int.openpai.org/plugin.html?index=0#/market_detail?itemId=1) provided by OpenPAI Marketplace. You could also use any dataset follows fairseq model requirements.

The dataset is stored on Azure Blob Storage.

URL: `https://openpaimarketplace.blob.core.windows.net/marketplace/Couplet_data/couplet_data.tgz`).

## How to use

### Prerequisites
When use this module, you should

1. Load data from Azure Blob to container
   ```
   mkdir -p /data/couplet_output/
   cd /data
   wget <% $data.uri[0] %>
   tar xvf couplet_data.tgz
   ```
2. Set three environment variables:
   ```
   export DATA_DIR=<% $data.uri[0] %>
   export OUTPUT_DIR=<% $output.uri %>
   export PREPROCESSED_DATA_DIR=./preprocessed_data
   ```
3. install `fairseq`
   ```
   pip install fairseq==0.9.0
   ```
**NOTE**: 
- The value of `data` and `output` are defined under the `prerequisites` and `taskRoles` fileds of the YAML file on the `Job submission` page.

- ```DATA_DIR```: The training data path in container, by default it uses Couplet Dataset data component. If you want to use your own datasets. First make sure mount your data into container, and then change the ```$DATA_DIR``` with the path.

    *Please view [How to mount](#how-to-mount) to get detail information about how to mount data.*


- ```PREPROCESSED_DATA_DIR```: The path to store intermediate result, by default it is ./processed_data.

- ```OUTPUT_DIR```: The path to store output result, i.e. the training model files.
  
### Training command

```
fairseq-preprocess \
--source-lang up \
--target-lang down \
--trainpref ${DATA_DIR}/train \
--validpref ${DATA_DIR}/valid \
--testpref ${DATA_DIR}/test \
--destdir ${PREPROCESSED_DATA_DIR}
```

```
fairseq-train ${PREPROCESSED_DATA_DIR} \
--log-interval 100 \
--lr 0.25 \
--clip-norm 0.1 \
--dropout 0.2  \
--criterion label_smoothed_cross_entropy \
--save-dir ${OUTPUT_DIR} \
-a lstm \
--max-tokens 4000 \
--max-epoch 100
```

### Get the result model

\<TBD>

<br>


## Reference

### How to mount

1. Install nfs
   ```
   $ sudo apt-get update && sudo apt-get install -y nfs-common
   ```

2. Upload
   ```
   $ sudo mkdir -p /mnt/nfsData
   $ sudo mount <container_ip>:/data /mnt/nfsData
   $ cp -r <local_data_dir> /mnt/nfsData/<subPath>
   ```

3. Download
   ```
   $ sudo mkdir -p /mnt/nfsData
   $ sudo mount <container_ip>:/data /mnt/nfsData
   $ cp -r <local_data_dir> /mnt/nfsData/<subPath>
   ```