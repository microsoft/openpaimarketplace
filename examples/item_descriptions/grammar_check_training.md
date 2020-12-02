# Grammar Check Model Training Job Template

This is a grammar check model training process.

## Training Data

You could get data from **Grammar Check Dataset** in OpenPAI Marketplace.

## How to use

### Prerequisites
When use this module, you should

1. Load training data from Azure Blob to container
   ```
    mkdir -p /data/grammarCheck/
    cd /data/grammarCheck/
    wget <% $data.uri[0] %>
    tar xvf gramarCheck_data.tgz
   ```
2. Set three environment variables:
   ```
    export DATA_DIR=/data/grammarCheck/dataset
    mkdir -p /data/grammarCheck/output
    export OUTPUT_DIR=/data/grammarCheck/
    export PREPROCESSED_DATA_DIR=./preprocessed_data
   ```
3. install `fairseq`
   ```
   pip install fairseq==0.9.0
   ```
**NOTE**: 
- The value of `data` and `output` are defined under the `prerequisites` and `taskRoles` fileds of the YAML file on the `Job submission` page.

- ```PREPROCESSED_DATA_DIR```: The path to store intermediate result, by default it is ./processed_data.

- ```OUTPUT_DIR```: The path to store output result, i.e. the training model files.
  
### Training command

```
fairseq-preprocess \
--source-lang origin \
--target-lang correct \
--trainpref ${DATA_DIR}/processed_data/train \
--validpref ${DATA_DIR}/processed_data/dev \
--testpref ${DATA_DIR}/processed_data/test \
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
--max-epoch 100 \
--batch-size 256
```


## Get the result model

\<TBD>

