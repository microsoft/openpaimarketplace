# Deploy Marketplace version v1.4.0 and later

> Note: This document suits for openpaimarketplace version v1.4.0 and later, and pai version v1.4.0 and later.

To deploy OpenPAI Marketplace, you need to prepare three parts when deploying Marketplace: database, rest server and webportal.

## Deployment steps

When deploying in OpenPAI cluster, you should deploy 3 services: marketplace-db, marketplace-restserver and marketplace-webportal. The deployment process of these 3 services are the same as deploying other pai services (like webportal and rest-server). The documentation of how to deploy a PAI service is located in [this page](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/basic-management-operations.html#pai-service-management-and-paictl) and in `PAI Service Management and Paictl` section. Here we just figure out some main points about how to deploy these 3 marketplace services.

Firstly, start a dev-box and prepare a pai cluster config file **service-configuration.yaml** (please refer to pai doc how to get this file), and add some extra configurations in this file. Including: `cluster, marketplace-db, marketplace-restserver, marketplace-webportal` properties, the following steps will give the details how to add these configs.

Then, push the new pai config file **service-configuration.yaml** to the cluster and start 3 services `marketplace-db marketplace-restserver marketplace-webportal`.

If the 3 services are started successfully, edit webportal plugin config in **service-configuration.yaml** file and push this file to cluster again and then restart pai webportal. Alternatively, if you are sure about the url of service marketplace-webportal, you could directly start OpenPAI webportal with webportal plugin config before the marketplace related services are started. When `marketplace-webportal` is started successfully, you could directly access marketplace plugin in the sidebar. Belowed are the detailed steps:

1. Add marketplace related configs in **service-configuration.yaml**, including `cluster.common.marketplace, marketplace-db, marketplace-restserver, marketplace-webportal and webportal.plugins` properties.

  ```

  cluster:
    common:
      marketplace: 'true'

  marketplace-db:
    user: <username>   # default is 'user'
    passwd: <password> # default is 'passwd'
    data-path: /mnt/marketplace # db data path in master node

  marketplace-restserver:
    db_user: <username>   # default is 'user'
    db_password: <password> # default is 'passwd'
    azure_storage: # set this value if you want use Azure Blob as storage
      type: blob
      storage_account: <storage_account>
      connection_strings:
      - '<connection_string>'

  marketplace-webportal:
    marketplace_api_uri: https://<openpai cluster>/marketplace/api

  webportal:
    plugins:
    - id: marketplace
      title: Marketplace
      uri: https://<openpai cluster>/marketplace/plugin.js

  ```

  TODO: does the file value correctly and indicate properties required or optional

  - `cluster.common.marketplace`: this config is the switch of marketplace, if this value is set true, marketplace will be enabled in OpenPAI, if this value is false or not set, marketplace will be disabled in OpenPAI.

  - `marketplace-db`: including `user, passwd and data-path` values. These values controls the basic info of postgresql database marketplace used.

  - `marketplace-restserver`: including `db_user, db_password and azure_storage`. These values are used when starting [Marketplace rest server](https://github.com/microsoft/pai/tree/master/src/marketplace-restserver/config). The first two values should be aligned with values set in `marketplace-db`. The last value `azure_storage` is not required, if this value exists, rest server will initialize it into database as an available [azure blob storage](../user/data_management.md).

  - `marketplace-webportal.marketplace_api_uri`: this value is set with Marketplace rest server api url. If OpenPAI webportal url is `https://xxx` , marketplace_api_uri should be set as `https://<openpai_cluster_ip>/marketplace/api`. If OpenPAI webpoortal url is `http://xxx`, then marketplace_api_uri should be set as `http://<master_node_ip>:<9292>`.

  - `webportal.plugins`: this value is used in OpenPAI webportal, set with the marketplace webportal plugin url when marketplace-webportal service successfully started. Same as `marketpalce_api_uri`, if OpenPAI webportal url is `https://xxx`, marketplace_api_uri could be set as `https://<openpai_cluster_ip>/marketplace/plugin.js`. If OpenPAI webportal url is `http://xxx`, then marketplace_api_uri should be set as `http://<master_node_ip>:<9293>/plugin.js`.

2.  After the pai config file **service-configuration.yaml** are edited correctly, push config file to update the cluster config using command `./paictl.py config push -p <config-folder> -m service`.

3.  Start marketplace services in OpenPAI:

  ```
  ./paictl.py service start -n marketplace-db marketplace-restserver marketplace-webportal`.
  ```

4.  Make sure `webportal.plugins` is set correctly, then restart OpenPAI webportal service:

  ```
  ./paictl.py service stop -n webportal`
  ./paictl.py service start -n webportal`
  ```

## Notes

1. The marketplace will be deployed to master node in OpenPAI cluster.

2. User can still deploy marketplaces service without set `cluster.common.market: "true"`, but the OpenPAI cluster will not expose the marketplace uri without this config.

## Q&A
