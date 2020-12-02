# Grammar Check Dataset

## About the Dataset

### Get data

This dataset is downloaded from [Building Educational Applications 2019 Shared Task: Grammatical Error Correction](https://www.cl.cam.ac.uk/research/nl/bea2019st/).

This dataset includes First Certificate in English (FCE) original corpus and a processed version which could be easily used by nlp models like fairseq.

### The file stucture

  ```
  .
  |-- processed_data
      |-- train.origin
      |-- train.correct
      |-- dev.origin
      |-- dev.correct
      |-- test.origin
      |-- test.correct
  |-- fce_v2.1.bea19
      |-- <raw data>
  ```

  The suffix ```.origin``` and ```.correct``` means original sentences and correct sentences seperately. The ```fce_v2.1.bea19``` is the raw data downloaded from websites.

## How to use

### Download to local

1. You can download the `gramarCheck_data.tgz` file by click the `Download` buttton.
   
2. The dataset is stored on `Azure Blob Storage`, you can access the dataset via below url:
   ```
   https://openpaimarketplace.blob.core.windows.net/marketplace/GrammarCheck/gramarCheck_data.tgz
   ```

### Use via OpenPAI job submission

You can also submit an OpenPAI job with this data by adding `DATA_DIR` environment variable.

```
mkdir -p /data/grammarCheck/
cd /data/grammarCheck/
wget <% $data.uri[0] %>
tar xvf gramarCheck_data.tgz
export DATA_DIR=/data/grammarCheck/dataset
```

The parameter `data.uri[0]` is defined in the config file (under the `prerequisites` and `taskToles` items), which indicates the dataset address on Azure Blob Storage.

You can click "Edit YAML" on the **Job submission** page to get more information.

### Use in the code

You can fetch the data from URL: https://openpaimarketplace.blob.core.windows.net/marketplace/GrammarCheck/gramarCheck_data.tgz,  and load it in your code.

