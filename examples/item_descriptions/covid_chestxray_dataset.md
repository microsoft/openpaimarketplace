# COVID-19 Chest X-ray Dataset

## About the dataset

The COVID-19 chest X-ray dataset is achieved from a GitHub repo [ieee8023/covid-chestxray-dataset](https://github.com/ieee8023/covid-chestxray-dataset). 

The project is to build a public open dataset of chest X-ray and CT images of patients which are positive or suspected of COVID-19 or other viral and bacterial pneumonias ([MERS](https://en.wikipedia.org/wiki/Middle_East_respiratory_syndrome), [SARS](https://en.wikipedia.org/wiki/Severe_acute_respiratory_syndrome), and [ARDS](https://en.wikipedia.org/wiki/Acute_respiratory_distress_syndrome).).

Below description is also copyed from the repo's [readme file](https://github.com/ieee8023/covid-chestxray-dataset/blob/master/README.md) , and made minor changes. You can get more information from the GitHub repo.

### Get raw data
You can get the raw data by cloning the GitHub repo or download the `.zip` file [here](https://github.com/ieee8023/covid-chestxray-dataset).

We downloaded the `.zip` file and stored it on Azure Blob Storage.

### Data content

Data will be collected from public sources as well as through indirect collection from hospitals and physicians.

You can view current [images](https://github.com/ieee8023/covid-chestxray-dataset/tree/master/images) and [metadata](https://github.com/ieee8023/covid-chestxray-dataset/blob/master/metadata.csv).

The labels are arranged in a hierarchy:

![Image](https://github.com/ieee8023/covid-chestxray-dataset/raw/master/docs/hierarchy.jpg)


## How to use

### Download to local

You can download the zip file by click the `Download` buttton.


### Use via OpenPAI job submission

You can also submit an OpenPAI job with this data by adding `DATA_DIR` environment variable.

```
mkdir -p /data/
cd /data
wget <% $data.uri[0] %>
tar xvf couplet_data.tgz
export DATA_DIR=/data/couplet_data/
```

The parameter `data.uri[0]` is defined in the config file (under the `prerequisites` and `taskToles` items), which indicates the dataset address on Azure Blob Storage.

```
prerequisites:
  - name: couplet_data
    type: data
    uri:
      - >-
        https://openpaimarketplace.blob.core.windows.net/marketplace/Couplet_data/couplet_data.tgz
taskRoles:
  taskrole:
    instances: 1
    data: couplet_data
```

You can click "Edit YAML" on the **Job submission** page to get more information.

### Use in the code

Current stats of PA, AP, and AP Supine views. Labels 0=No or 1=Yes. 

Data loader is [here](https://github.com/mlmed/torchxrayvision/blob/master/torchxrayvision/datasets.py#L867). 

You can load data to file by creating object of `class MIMIC_Dataset(Dataset)`.

  ```js

  COVID19_Dataset num_samples=481 views=['PA', 'AP']
  {'ARDS': {0.0: 465, 1.0: 16},
   'Bacterial': {0.0: 445, 1.0: 36},
   'COVID-19': {0.0: 162, 1.0: 319},
   'Chlamydophila': {0.0: 480, 1.0: 1},
   'E.Coli': {0.0: 481},
   'Fungal': {0.0: 459, 1.0: 22},
   'Influenza': {0.0: 478, 1.0: 3},
   'Klebsiella': {0.0: 474, 1.0: 7},
   'Legionella': {0.0: 474, 1.0: 7},
   'Lipoid': {0.0: 473, 1.0: 8},
   'MERS': {0.0: 481},
   'Mycoplasma': {0.0: 476, 1.0: 5},
   'No Finding': {0.0: 467, 1.0: 14},
   'Pneumocystis': {0.0: 459, 1.0: 22},
   'Pneumonia': {0.0: 36, 1.0: 445},
   'SARS': {0.0: 465, 1.0: 16},
   'Streptococcus': {0.0: 467, 1.0: 14},
   'Varicella': {0.0: 476, 1.0: 5},
   'Viral': {0.0: 138, 1.0: 343}}

  COVID19_Dataset num_samples=173 views=['AP Supine']
  {'ARDS': {0.0: 170, 1.0: 3},
   'Bacterial': {0.0: 169, 1.0: 4},
   'COVID-19': {0.0: 41, 1.0: 132},
   'Chlamydophila': {0.0: 173},
   'E.Coli': {0.0: 169, 1.0: 4},
   'Fungal': {0.0: 171, 1.0: 2},
   'Influenza': {0.0: 173},
   'Klebsiella': {0.0: 173},
   'Legionella': {0.0: 173},
   'Lipoid': {0.0: 173},
   'MERS': {0.0: 173},
   'Mycoplasma': {0.0: 173},
   'No Finding': {0.0: 170, 1.0: 3},
   'Pneumocystis': {0.0: 171, 1.0: 2},
   'Pneumonia': {0.0: 26, 1.0: 147},
   'SARS': {0.0: 173},
   'Streptococcus': {0.0: 173},
   'Varicella': {0.0: 173},
   'Viral': {0.0: 41, 1.0: 132}}

  ```

## License

  Each image has license specified in the metadata.csv file. Including Apache 2.0, CC BY-NC-SA 4.0, CC BY 4.0.

  The metadata.csv, scripts, and other documents are released under a CC BY-NC-SA 4.0 license. Companies are free to perform research.


## Related project

The dataset is related to the GitHub project [mlmed/torchxrayvision](https://github.com/mlmed/torchxrayvision).
