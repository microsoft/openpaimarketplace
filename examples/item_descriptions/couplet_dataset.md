# Couplet Dataset

The couplet dataset is used in the [Couplet Training Job Template](https://int.openpai.org/plugin.html?index=0#/market_detail?itemId=2). You can also use this dataset to train your own couplet.

The raw data is open sourced on GitHub, including about 70w pair couplet data. We preprocess the data to fit the couplet training job with [fairseq](https://github.com/pytorch/fairseq) models.


## About the dataset

### Get raw data

The raw data are released on GitHub, you can **download** by click the link: [couplet.tar.gz](https://github.com/wb14123/couplet-dataset/releases)

Extracted the file, data are organized as below:

```
.
└── couplet
    ├── test
    │   ├── in.txt
    │   └── out.txt
    ├── train
    │   ├── in.txt
    │   └── out.txt
    └── vocabs
```

There are training set and test set, with "in.txt" keeps the first line of a couplet (上联) and the "out.txt" keeps the second line of a couplet(下联) respectly. The setences stored in lines while each Chinese character is separated by a whitespace. For example:

The 9 line in the in.txt of the training data is:
```
不 畏 鸿 门 传 汉 祚

```
The 9 line in the out.txt of the training data is:
```
难 堪 垓 下 别 虞 姬 
```
They form a couplet.

### Data preprocess

We preprocess the raw data to fit the [Couplet Training Job Template](https://int.openpai.org/plugin.html?index=0#/market_detail?itemId=2) which use the fairseq models.

1. Merge the train and test data into one dataset. The file with `.up` suffix save the first line of the couplets, while the file with `.down` sufix save the second line of the couplets.

2. Split the dataset to training, test and valid set with 98:1:1. 
   
   For the specified split method, please view [here](https://github.com/microsoft/ai-edu/blob/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B/docs/fairseq.md#%E5%88%92%E5%88%86%E6%95%B0%E6%8D%AE%E9%9B%86).

After preprocessing, we got the 6 data files.

```
.
└── couplet_data
    ├── test.down
    ├── test.up
    ├── train.down
    ├── train.up
    ├── valid.down
    └── valid.up
```

## How to use

### Download to local

1. You can download the `couplet_data.tgz` file by click the `Download` buttton.
   
2. The dataset is stored on `Azure Blob Storage`, you can access the dataset via below url:
   ```
   https://openpaimarketplace.blob.core.windows.net/marketplace/Couplet_data/couplet_data.tgz
   ```

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

This is a simple example to show how to pass in the `DATA_DIR` to python code through the command.


- command line: 
    ```
    python3 test.py --data_dir ${DATA_DIR}
    ```
- Add below code to test.py:
    ```
    import argparse

    parser = argparse.ArgumentParser()
    args = parser.add_argument('--data_dir', default=None, help="The path of the data dir")

    train_up = args.data_dir + "/train.up"
    train_down = args.data_dir + "/train.down"

    ...
    ```

## Related project

The data is also used in the [AI对联生成案例](https://github.com/microsoft/ai-edu/tree/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B) on [AI-Edu Community](https://github.com/microsoft/ai-edu).