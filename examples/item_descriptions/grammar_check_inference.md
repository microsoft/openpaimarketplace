# Grammar Check Inference Job Template

## Trained model

This is a model inference process. The input data is the training models trained by **Grammer Check Model Training Job**, and this job will use ```fairseq-generate``` to correct test sentences.

## How to use

### Prerequisites

1. Load model file to container
   ```
    mkdir -p /data/grammarCheck/
    cd /data/grammarCheck/
    wget <% $data.uri[0] %>
    tar xvf gramarCheck_data_bin.tgz
    wget <% $data.uri[1] %>
    tar xvf gramarCheck_checkpoint_best.tgz
   ```

2. When use this module, you should set three environment variables:
   ```
    export PREPROCESSED_DATA_DIR=/data/grammarCheck/data-bin/
    export MODEL_SAVE_DIR=/data/grammarCheck/checkpoints/
   ```

3. Install `fairseq`
   ```
   pip install fairseq
   ```

This job uses two data input, the preprocessed data and checkpoint files trained by ```Grammer Check Model Training Job```:

- ```PREPROCESSED_DATA_DIR```: the training model path in container, by default it uses the output of couplet training job. If you want to use your own models. First make sure mount your models into container, and then change the ```$DATA_DIR``` with the path.

- ```MODEL_SAVE_DIR```: the service code, it will start a server at the given port.


### Inference command

```
fairseq-generate ${PREPROCESSED_DATA_DIR} --path ${MODEL_SAVE_DIR}/checkpoint_best.pt --source-lang origin --target-lang correct
```


## How to check the result

You could check the inference results in stdout output.



