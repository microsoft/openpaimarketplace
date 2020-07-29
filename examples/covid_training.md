# Covid19 prediction model of confirmed and death number

This is a prediction model of confirmed and death number in different countries. This model uses dataset published by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University. With this data set, the model could predict the confirmed and death number of population of different dates.

## Training Data

The training data is fetched by [Coronavirus Tracker API](https://github.com/ExpDev07/coronavirus-tracker-api). You could provide a formatted data as the training data, there is a default dataset downloaded ahead in the data storage. If no input data given, the model will auto download latest dataset from Coronavirus Tracker API.

## How to use

When use this module, you should set three environment variables:

- `DATA_DIR`: the training data path in container, by default it uses Coronavirus Public Dataset. If you want to use your own datasets. First make sure mount your data into container, and then change the `$DATA_DIR` with the path.

- `CODE_DIR`: the path to store model training code,it is mounted by code storage.

- `OUTPUT_DIR`: the path to store output result, i.e. the prediction results. By default it will mount the output storage, and you could change it with other mounted storage.

## How to check the result

After job finished successfully, you could check the output result file in the output storage. Or you could use model service template and go to http://<ip>:<flask_port>/upper=<input> to see the visualization.
