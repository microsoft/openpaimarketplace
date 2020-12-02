# Covid Chest X-ray Diagnosis Model Training Job Template

  This is a COVID-19 chest X-ray model training process.

## Training Data

  You could use [covid-chestxray-dataset](https://github.com/ieee8023/covid-chestxray-dataset) or other dataset supported by [torchxrayvision](https://github.com/mlmed/torchxrayvision).

## How to use

### Prerequisites

- Load dataset
  
    ```
    mkdir -p /data/covid_chestxray_training/output
    cd /data/
    git clone <% $data.uri[0] %> covid-chestxray-dataset
    export OUTPUT_DIR=/data/covid_chestxray_training/output
    cd /data/covid_chestxray_training
    ```

### Training code

We provide the sample training code on [OpenPAI Marketplace](https://github.com/microsoft/openpaimarketplace) GitHub repo, You can get them [here](https://github.com/microsoft/openpaimarketplace/tree/master/examples/code/covid_chestxray_training). The codes are referd to `train_model.py` and `train_utils.py` from [torchxrayvision/scripts/](https://github.com/mlmed/torchxrayvision/tree/master/scripts).

There are three files: `requirements.txt`, `train.py`, `train_utiles.py`

Command to get the sample training code.
```
wget https://raw.githubusercontent.com/microsoft/openpaimarketplace/master/examples/code/covid_chestxray_training/requirements.txt
pip install -r requirements.txt
wget https://raw.githubusercontent.com/microsoft/openpaimarketplace/master/examples/code/covid_chestxray_training/train.py
wget https://raw.githubusercontent.com/microsoft/openpaimarketplace/master/examples/code/covid_chestxray_training/train_utils.py
```

### Training command

```
python3 train.py -name=covid_chestxray_training --output_dir=OUTPUT_DIR --dataset=COVID19 --dataset_dir=../covid-chestxray-dataset --batch_size 80
```

### Get the result model

After job finished successfully, you could check the output model files in the output storage.
