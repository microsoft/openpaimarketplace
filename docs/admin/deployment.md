# Deployment

Currently (in version 1.3.0), you need to prepare three parts when deploying Marketplace: database, rest server and webportal.

## Deploy in OpenPAI cluster

When deploying in OpenPAI cluster, the Marketplace mainly includes three services: marketplace-db, marketplace-restserver and marketplace-webportal.

1. Enable marketplace in **service-configuration.yaml**.
   To enable marketplace service in OpenPAI, you need to add the following config in **service-configuration.yaml**:

   ```javascript
   cluster:
     common:
       marketplace: 'true'

   ```

   For more details about the **service-configuration.yaml** file, please refer to [PAI Service Management and Paictl](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/basic-management-operations.html#pai-service-management-and-paictl).

2. Config **marketplace-db**.

   Add following config in **service-configuration.yaml** to config `marketplace-db` service: 

   ```javascript
   marketplace-db:
     user: <username>   # default is 'user'
     passwd: <password> # default is 'passwd'
     data-path: /mnt/marketplace # db data path in master node
   ```

   For more details about the config of **marketplace-db**, please refer to [marketplace-db/config](https://github.com/microsoft/pai/tree/master/src/marketplace-db/config).

3. Config **marketplace-restserver**.

   Add following config in **service-configuration.yaml** to config `marketplace-restserver` service: 

   ```
   marketplace-restserver:
     db_user: <username>   # default is 'user'
     db_password: <password> # default is 'passwd'
     azure_storage:
       storage_account: <storage_account>
       connection_strings:
       - '<connection_string>'
   ```

   For more details about the config of **marketplace-restserver**, please refer to [marketplace-restserver/config](https://github.com/microsoft/pai/tree/master/src/marketplace-restserver/config), for the **azure_storage** config, please refer to [Data Management](../user/data_management.md).


4. Config **marketplace-webportal**.

   Add following config in **service-configuration.yaml** to config `marketplace-webportal` service: 

   ```
   marketplace-webportal:
     marketplace_api_uri: https://<openpai cluster>/marketplace/api
   ```

   For more details about the config of **marketplace-webportal**, please refer to [marketplace-webportal/config](https://github.com/microsoft/pai/tree/master/src/marketplace-webportal/config).

7.  Add **marketplace-webportal** to PAI webportal plugin in **service-configuration.yaml**:

    ```
        webportal:
          plugins:
          - id: marketplace
            title: Marketplace
            uri: https://<openpai cluster>/marketplace/plugin.js
    ```

8.  Push config: `./paictl.py config push -p <config-folder> -m service` in a dev-box.

9.  Start marketplace services in OpenPAI: `./paictl.py service start -n marketplace-db marketplace-restserver marketplace-webportal`.

## Deploy without OpenPAI

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
