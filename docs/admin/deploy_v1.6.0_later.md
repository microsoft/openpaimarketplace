# Deploy Marketplace version v1.6.0 and later

> Note: This document suits for openpaimarketplace version v1.6.0 and later, and pai version v1.6.0 and later.

To deploy OpenPAI Marketplace, you need to prepare three parts when deploying Marketplace: database, rest server and webportal.

## Deployment in OpenPAI Installation

In OpenPAI v1.6.0 or later, admin can deploy the marketplace in OpenPAI installation step by setting `enable_marketplace: "true"` in [`config.yaml` file](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/installation-guide.html#prepare-configuration-files) under the `OpenPAI Customized Settings`.

### `config.yaml` example

``` yaml
user: forexample
password: forexample
docker_image_tag: v1.5.0

# Optional

#######################################################################
#                    OpenPAI Customized Settings                      #
#######################################################################
# enable_hived_scheduler: true
# enable_docker_cache: false
# docker_cache_storage_backend: "azure" # or "filesystem"
# docker_cache_azure_account_name: ""
# docker_cache_azure_account_key: ""
# docker_cache_azure_container_name: "dockerregistry"
# docker_cache_fs_mount_path: "/var/lib/registry"
# docker_cache_remote_url: "https://registry-1.docker.io"
# docker_cache_htpasswd: ""
enable_marketplace: "true"

# ...

```

Make sure the setting of `enable_marketplace` was `"true"` (include the quotation marks), and finish the [installation](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/installation-guide.html), the marketplace should be enable by default.

## Deployment in a OpenPAI cluster

When deploying in OpenPAI cluster, you should deploy 3 services: marketplace-db, marketplace-restserver and marketplace-webportal. The deployment process of these 3 services are the same as deploying other pai services (like webportal and rest-server). The documentation of how to deploy a PAI service is located in [this page](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/basic-management-operations.html#pai-service-management-and-paictl) and in `PAI Service Management and Paictl` section. Here we just figure out some main points about how to deploy these 3 marketplace services.

Firstly, start a dev-box and prepare a pai cluster config file **service-configuration.yaml** (please refer to pai doc how to get this file), and add some extra configurations in this file. Including: `cluster, marketplace-db, marketplace-restserver, marketplace-webportal` properties, the Advance settings step will give the details how to add these configs.

Then, push the new pai config file **service-configuration.yaml** to the cluster and start 3 services `marketplace-db marketplace-restserver marketplace-webportal`.

If the 3 services are started successfully, edit webportal plugin config in **service-configuration.yaml** file and push this file to cluster again and then restart pai webportal. Alternatively, if you are sure about the url of service marketplace-webportal, you could directly start OpenPAI webportal with webportal plugin config before the marketplace related services are started. When `marketplace-webportal` is started successfully, you could directly access marketplace plugin in the sidebar. Belowed are the detailed steps:

**Step 1.** Set `cluster.common.marketplace` to be true in **service-configuration.yaml**

  ```yaml
  cluster:
    common:
      marketplace: 'true'
  ```

**Step 2.** After the pai config file **service-configuration.yaml** are edited correctly, push config file to update the cluster config using command:

  ```bash
  ./paictl.py config push -p <config-folder> -m service
  ```

**Step 3.** Start marketplace services in OpenPAI:

  ```bash
  ./paictl.py service start -n marketplace-db marketplace-restserver marketplace-webportal
  ```

**Step 4.** Restart OpenPAI pylon and webportal service:

  ```bash
  ./paictl.py service stop -n pylon webportal
  ./paictl.py service start -n pylon webportal
  ```

**Step 5.** (Optional) Migrate marketplace item schema from v1.5.0 to v1.6.0

In OpenPAI Marketplace v1.6.0, we changed marketplace item schema to support access control for marketplace items. For user who has deployed the marketplace, marketplace database need to be migrated to new schema. Otherwise, it will throw an "SequelizeDatabaseError: column <column_name> does not exist" exception.

To migrate marketplace, the suggested approach is use `sequelize-cli` and `npx`, like in `rest_server/migrate_marketplace_item.sh`.
```bash
# Install dependency
npm install npx sequelize-cli
# Do migrate in migrations/
npx sequelize-cli db:migrate
```

**Warning:** Upgrade marketplace from previous version without changing the `services-configuration.yaml` file, the auto added marketplace item may cause duplicate marketplace tags in webportal [#230](https://github.com/microsoft/openpaimarketplace/issues/230).
Admin can either set `webportal.marketplace: false` to avoid the auto added item, or remove the old marketplace item from `webportal.plugins` to delete the old one.

## Advance settings

Set `cluster.common.marketplace: 'true'` will use the default settings in `marketplace-db marketplace-restserver marketplace-webportal`, and also add a default marketplace page to OpenPAI webportal.
But admin can still use customized settings.

### marketplace-db service settings

Admin can change marketplace-db settings in the OpenPAI config file **service-configuration.yaml**, all properties are optional:

```yaml
marketplace-db:
    user: <username>   # default is 'user'
    passwd: <password> # default is 'passwd'
    db: marketplace    # the db name
    port: 9291
    max-connection: 1000
    data-path: /mnt/marketplace # the data path of marketplace in master node
```

### marketplace-restserver service settings

Admin can change marketplace-restserver settings in the OpenPAI config file **service-configuration.yaml**, all properties are optional:

```yaml
marketplace-restserver:
    db_user: <username>     # use the value from marketplace-db settings by default
    db_password: <password> # use the value from marketplace-db settings by default
    db: marketplace         # use the value from marketplace-db settings by default
    db_host: postgres
    db_port: 9291           # use the value from marketplace-db settings by default
    server-port: 9292
    idp_url: <OpenPAI rest-server url> # use the value from pai rest-server settings by default

    azure_storage: # some feature of marketplace may use azure storage to allow user upload their data, no need this by default.
        type: blob
        storage_account: openpaimarketplace
        connection_strings: []
        azure_storage_json: ''
```

### marketplace-webportal service settings

Admin can change marketplace-webportal settings in the OpenPAI config file **service-configuration.yaml**, all properties are optional:

```yaml
marketplace-webportal:
    marketplace_api_uri: <marketplace_api_uri> # use the value from marketplace-restserver settings by default
    api-port: 9292
    server-port: 9293
```

### marketplace service settings

Admin can change marketplace related webportal settings in the OpenPAI config file **service-configuration.yaml**:
If don't want to use the default marketplace plugin in OpenPAI webportal, you can set `webportal.marketplace: false` and add to `webportal.plugins` manully.
If don't need the save-template feature in OpenPAI webportal, you can set `webportal.save-template: false`.

```yaml
webportal:
    marketplace: false
    save-template: true
    plugins:
    - id: my-marketplace
        title: my-marketplace
        uri: https://my-marketplace
```

## Notes

1. The marketplace will be deployed to master node in OpenPAI cluster.

2. User can still deploy marketplaces service without set `cluster.common.market: "true"`, but the OpenPAI cluster will not expose the marketplace uri without this config.

## Q&A
