# Deployment

> Note: This deployment document suits for openpaimarketplace version v1.4.0 and later, and pai version v1.4.0 and later.

To deploy OpenPAI Marketplace, you need to prepare three parts when deploying Marketplace: database, rest server and webportal.

## Deploy inside OpenPAI

When deploying inside OpenPAI cluster, you should deploy 3 services: marketplace-db, marketplace-restserver and marketplace-webportal. The deployment process of these 3 services are the same as deploying other pai services (like webportal and rest-server). The documentation of how to deploy a PAI service is located in [this page](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/basic-management-operations.html#pai-service-management-and-paictl) and in `PAI Service Management and Paictl` section. Here we just figure out some main points about how to deploy these 3 marketplace services.

Firstly, start a dev-box and prepare a pai cluster config file **service-configuration.yaml** (please refer to pai doc how to get this file), and add some extra configurations in this file. Including: `cluster, marketplace-db, marketplace-restserver, marketplace-webportal` properties, the following steps will give the details how to add these configs.

Then, push the new pai config file **service-configuration.yaml** to the cluster and start 3 services `marketplace-db marketplace-restserver marketplace-webportal`.

If the 3 services are started successfully, edit webportal plugin config in **service-configuration.yaml** file and push this file to cluster again and then restart pai webportal. Alternatively, if you are sure about the url of service marketplace-webportal, you could directly start OpenPAI webportal with webportal plugin config before the marketplace related services are started. When `marketplace-webportal` is started successfully, you could directly access marketplace plugin in the sidebar. Belowed are the detailed steps:

1. Add marketplace related configs in **service-configuration.yaml**, including `cluster.common.marketplace, marketplace-db, marketplace-restserver, marketplace-webportal and webportal.plugins` properties.

  ```
  ## other configs ...

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

  ## other configs ...
  ```

  TODO: does the file value correctly and indicate properties required or optional 

  - `cluster.common.marketplace`: this config is the switch of marketplace, if this value is set true, marketplace will be enabled in OpenPAI, if this value is false or not set, marketplace will be disabled in OpenPAI.

  - `marketplace-db`: including `user, passwd and data-path` values. These values controls the basic info of postgresql database marketplace used.

  - `marketplace-restserver`: including `db_user, db_password and azure_storage`. These values are used when starting [Marketplace rest server](https://github.com/microsoft/pai/tree/master/src/marketplace-restserver/config). The first two values should be aligned with values set in `marketplace-db`. The last value `azure_storage` is not required, if this value exists, rest server will initialize it into database as an available [azure blob storage](../user/data_management.md).

  - `marketplace-webportal.marketplace_api_uri`: this value is set with Marketplace rest server api url. If pylon is deployed in OpenPAI, marketplace_api_uri could be set as `https://<openpai_cluster_ip>/marketplace/api`. If pylon is not deployed in OpenPAI, then marketplace_api_uri should be set as `http://<master_node_ip>:<9292>`. (TODO: if pylon is not set, the request will failed because of cors?)

  - `webportal.plugins`: this value is used in OpenPAI webportal, set with the marketplace webportal plugin url when marketplace-webportal service successfully started. Same as `marketpalce_api_uri`, if pylon is deployed in OpenPAI, marketplace_api_uri could be set as `https://<openpai_cluster_ip>/marketplace/plugin.js`. If pylon is not deployed in OpenPAI, then marketplace_api_uri should be set as `https://<master_node_ip>:<9292>/plugin.js`. 

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

## Deploy outside OpenPAI

Admin can also deploy marketplace outside PAI cluster.

### Deploy by marketplace docker images

1. Setup a postgres DB.

  ```
    docker run \
      -p 5432:5432 \
      -e POSTGRES_USER=user \
      -e POSTGRES_PASSWORD=postgre \
      -e POSTGRES_DB=marketplace \
      postgres:12.0
  ```

2. Pull & run docker images from DockerHub: `openpai/pai-marketplace-restserver` and `openpai/pai-marketplace-webportal`.

  ```
  docker run \
    -p 9292:9292 \
    -e DB_USERNAME=user \
    -e DB_PASSWORD=postgre \
    -e DATABASE=marketplace \
    -e DB_HOST=localhost \
    -e DB_PORT=5432 \
    -e NODE_ENV=production \
    -e PORT=9292 \
    -e AZURE_STORAGE="{\"storage_account\": \"<storage account>\", \"connection_string\": ["BlobEndpoint=<blob end point>\"], \"type\": \"blob\"}" \
    openpai/pai-marketplace-restserver:v1.2.0

  docker run \
    -p 9293:9293 \
    -e MARKETPLACE_API_URL="http://localhost:9292" \
    -e SERVER_PORT=9293 \
    -e NPM_INSTALL_TOKEN=<github package npm install token>
    openpai/pai-marketplace-webportal:v1.2.0
  ```

3. Visit `http://localhost:9293/plugin.js` to get the marketplace js file.

### Deploy service by source code

1. Setup a postgres DB.

   ```
   docker run \
     -p 5432:5432 \
     -e POSTGRES_USER=user \
     -e POSTGRES_PASSWORD=postgre \
     -e POSTGRES_DB=marketplace \
     postgres:12.0
   ```
2. Run marketplace rest_server.

   - Setup `.env` file for marketplace rest_server.

   ```
   # .env file (not including this line)
   DB_USERNAME=<user_name>
   DATABASE=<database_name>
   DB_PASSWORD=<password>
   DB_HOST=<database_host>
   DB_PORT=<database_port_number>
   PORT=<api_service_port>
   AZURE_STORAGE="{\"storage_account\": \"<storage account>\", \"connection_string\": ["BlobEndpoint=<blob end point>\"], \"type\": \"blob\"}"
   ```

   - Then git clone the source code and start the rest server.

   ```
   git clone https://github.com/microsoft/openpaimarketplace.git
   git checkout xxx // checkout to the version you needed
   cd rest_server
   // add a .env file
   npm install // recommended nodejs version: ^10
   npm start
   ```

3. Run marketplace webportal.

   - Setup `.env` file for marketplace webportal.

   ```
   # .env file (not including this line)
   LOG_LEVEL=<error, warn, info, verbose, debug or silly>
   SERVER_PORT=<expose_port>
   MARKETPLACE_API_URL=<marketplace_api_url>
   NPM_INSTALL_TOKEN=<github package npm install token>
   ```

   - Then git clone the source code and start the webportal.

   ```
   git clone https://github.com/microsoft/openpaimarketplace.git
   git checkout xxx // checkout to the version you needed
   cd webportal
   // add a .env file
   npm install // recommended nodejs version: ^10
   npm start
   ```

4.  Visit `http://<HOST_IP>:<SERVER_PORT>/plugin.js` to get the marketplace js file.

## Notes

1. The three components of marketplace service are independent, user don't have to deploy all of them (e.g. Users can config the `marketplace-restserver` connect to their own postgres DB, without deploy the `marketplace-db` service).

2. The marketplace will be deployed to master node in OpenPAI cluster.

3. User can still deploy marketplaces service without set `cluster.common.market: "true"`, but the pylon will not expose the marketplace uri without this config.
