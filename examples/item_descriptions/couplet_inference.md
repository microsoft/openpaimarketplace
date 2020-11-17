# Couplet Training Job Template

This is a model inference process. It serves with a language model trained by [Couplet Training Job Template](https://int.openpai.org/plugin.html?index=0#/market_detail?itemId=2). This job will produce a url for user to ask for down part for a upper part of couplet.

## How to use

### Prerequisites
When use this module, you should set three environment variables:

- ```DATA_DIR```: the training model path in container, by default it uses the output of couplet training job. If you want to use your own models. First make sure mount your models into container, and then change the ```$DATA_DIR``` with the path.

- ```CODE_DIR```: the service code, it will start a server at the given port.

- ```FLASK_RUN_PORT```: the service port container will output.

### Inference command

```
mkdir -p /data/
cd /data/
wget <% $script.uri %>
tar xvf couplet_inference_project.tgz
cd /data/couplet/
wget <% $data.uri[0] %>
tar xvf couplet_checkpoint_best.tgz
export DATA_DIR=/data/couplet/checkpoints/
export CODE_DIR=/data/couplet/
export FLASK_PORT=$PAI_PORT_LIST_taskrole_0_FLASK_PORT
pip install fairseq
pip install flask
pip install gunicorn
cd ${CODE_DIR}
gunicorn --bind=0.0.0.0:${FLASK_PORT} app:app
```

## How to check the result

After job finished successfully, you could check the job detail to get the container ip and ```flask_port``` number, then go to http://<ip>:<flask_port>?upper=<input> to test the result.
