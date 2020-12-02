# COVID-19 Inference Service Job Template

This is the inference service to visualize the prediction number of confirmed and death population in different countries.

## Trained model

The model is trained by **Covid19 Prediction Model**, and is stored on Azure Blob Storage.


## How to use
### Prerequisites

1. Load model file and inference code to container
   ```
    mkdir -p /data/covid19
    cd /data/covid19
    wget <% $script.uri %>
    tar xvf covid_inference_project.tgz
   ```

2. When use this module, you should set two environment variables:
   ```
   export CODE_DIR=/data/covid19/inference_project
   export SERVER_PORT=$PAI_PORT_LIST_taskrole_0_SERVER_PORT
   ```

- ```CODE_DIR```: the service code, it will start a server at the given port.

- ```FLASK_RUN_PORT```: the service port container will output.

### Inference command

```
cd ${CODE_DIR}
npm install
npm run build
npm start
```

## How to check the result

After job finished successfully, you could check the stdout of the job. There will be a log please go to <url> to view the result. The <url> is in the form of  `$PAI_HOST_IP_taskrole_0:$SERVER_PORT`.

Copy the <url> to the browser to check the visualization result.
