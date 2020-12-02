# OpenPAI Marketplace Doc for Users

> Note: This document suits for openpaimarketplace version v1.4.0 and later.

Openpaimarketplace has two type of templates: data template and job tempalte. Both these two type of tempaltes could be directly used to create an OpenPAI job easily. The step-by-step usage guide is included in [quick start tutorial](./quick-start.md).

- Data Template

  The data source in data template now supported by [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction). User could download data or use it direcly in an OpenPAI job.

  There are two methods to download/upload data of Azure Blob Storage: using [Azure Storage Explorer](https://azure.microsoft.com/zh-cn/features/storage-explorer/) or using [pai_copy](https://github.com/SwordFaith/pai-copy) CLI tool. Detailed guide can be find in [Data Management Guide](./data-management.md).

- Job Template

  The main part of job template contains an OpenPAI protocol config. With this config, user could easily submit an OpenPAI job and easily edit to fullfil extra requirements.

  Besides of using templates. User could also create job template with an existing OpenPAI protocol config file. The step-by-step creating guide is included in [how to create template](./create-template.md).

## Table of Contents

1. [Quick Start](./quick_start.md)
2. [Data Management](./data_management.md)
3. [Creating Job Template](./create_template.md)
