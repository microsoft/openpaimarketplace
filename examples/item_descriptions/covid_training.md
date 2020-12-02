# COVID-19 Prediction Model Training Job Template

This is a prediction model of confirmed and death number in different countries. This model uses dataset published by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University. With this data set, the model could predict the confirmed and death number of population of different dates.

## Training Data

The training data is fetched by [Coronavirus Tracker API](https://github.com/ExpDev07/coronavirus-tracker-api). You could provide a formatted data as the training data, there is a default dataset downloaded ahead in the data storage. If no input data given, the model will auto download latest dataset from Coronavirus Tracker API.

## How to use

### Prerequisites
When use this module, you should

1. Load training data and code from Azure Blob to container
   ```
   mkdir -p /data/covid19/data/
   cd /data/covid19/data/
   wget <% $data.uri[0] %>
   export DATA_DIR=/data/covid19/data/
   cd /data/covid19/
   wget <% $script.uri %>
   tar xvf /data/covid19/covid19_prediction_project.tgz
   ```
2. Set three environment variables:
   ```
    export CODE_DIR=/data/covid19/prediction_project/
    export OUTPUT_DIR=/data/covid19/prediction_project/output/
   ```
3. install python packages
   ```
    pip install numpy
    pip install scipy
    pip install sklearn
   ```
**NOTE**: 
- The value of `data` and `script` are defined under the `prerequisites` and `taskRoles` fileds of the YAML file on the `Job submission` page.

- ```DATA_DIR```: The training data path in container, by default it uses Couplet Dataset data component.

- ```CODE_DIR```: The training command path in container.

- ```OUTPUT_DIR```: The path to store output result, i.e. the training model files.
  
### Training command

```
cd ${CODE_DIR}
python PredictionConfirmed.py -i ${DATA_DIR}/covid-19_data.json -o ${OUTPUT_DIR}
```

### Get the result

You can get the prediction result in the job log page.

