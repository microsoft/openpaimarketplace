# OpenPAI Marketplace Doc for Users

* How to use template:  (need explain job template in advance ?) 
    - User can directly create OpenPAI submission from marketplace job template.
    - In job detail, user can simply click the "use" button to clone marketplace job template, and jump to OpenPAI submit page. After that, the usage process is as same as OpenPAI submission. Step-by-step guide is included in [quick start tutorial](./quick-start.md).
* Create template: 
    - Job template can create by user.
    - By click 'create' button, user will get into job create process: Upload Files -> Basic information -> Detail. Step-by-step guide is included in [how to create template](./create-template.md)
* Data: 
    - Data stores on Azure Storage. User can simply click 'download' button to download dataset template data, and get job template result by download URL in stdout.
    - There are two method to upload data to Azure Storage, GUI [Azure Storage Explorer](https://azure.microsoft.com/zh-cn/features/storage-explorer/) and [pai_copy](https://github.com/SwordFaith/pai-copy) CLI tool. Detailed usage can be find in [manual](URL)

## Table of Contents

1. [Quick Start](./quick-start.md)
2. [Data Management](./data-mangement.md)
3. [Create Template](./create-template.md)
