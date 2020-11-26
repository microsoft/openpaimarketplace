# Deployment

Currently (in version 1.3.0), the Marketplace can be deploy as a service in OpenPAI cluster, will include three service in PAI (marketplace-db, marketplace-restserver and marketplace-webportal).

## Deploy in PAI cluster

1. Enable marketplace in **service-configuration.yaml**, for more detail about the **service-configuration.yaml** file, please refer to [PAI Service Management and Paictl](https://openpai.readthedocs.io/en/latest/manual/cluster-admin/basic-management-operations.html#pai-service-management-and-paictl).

        cluster:
          common:
            marketplace: 'true'

2. Config **marketplace-db** in **service-configuration.yaml**, for more detail about the config of **marketplace-db**, please refer to [marketplace-db/config](https://github.com/microsoft/pai/tree/master/src/marketplace-db/config).

        marketplace-db:
          user: <username>   # default is 'user'
          passwd: <password> # default is 'passwd'
          data-path: /mnt/marketplace # db data path in master node

3. Config **marketplace-restserver** in **service-configuration.yaml**, for more detail about the config of **marketplace-restserver**, please refer to [marketplace-restserver/config](https://github.com/microsoft/pai/tree/master/src/marketplace-restserver/config), for the **azure_storage** config, please refer to [Data Management](../user/data_management.md).

        marketplace-restserver:
          db_user: <username>   # default is 'user'
          db_password: <password> # default is 'passwd'
          azure_storage:
            storage_account: <storage_account>
            connection_strings:
            - '<connection_string>'

4. Config **marketplace-webportal** in **service-configuration.yaml**, for more detail about the config of **marketplace-webportal**, please refer to [marketplace-webportal/config](https://github.com/microsoft/pai/tree/master/src/marketplace-webportal/config).

        marketplace-webportal:
          marketplace_api_uri: https://<openpai cluster>/marketplace/api

5. Add **marketplace-webportal** to PAI webportal plugin in **service-configuration.yaml**.

        webportal:
          plugins:
          - id: marketplace
            title: Marketplace
            uri: https://<openpai cluster>/marketplace/plugin.js

6. Push config: ```./paictl.py config push -p <config-folder> -m service```

7. Start marketplace services in OpenPAI: ```./paictl.py service start -n marketplace-db marketplace-restserver marketplace-webportal```

## Deploy without OpenPAI

Admins can also deploy marketplace outside PAI cluster.

### Deploy by marketplace docker images

1. Setup a postgres DB.

        docker run \
          -p 5432:5432 \
          -e POSTGRES_USER=user \
          -e POSTGRES_PASSWORD=postgre \
          -e POSTGRES_DB=marketplace \
          postgres:12.0

2. Pull & run docker images from DockerHub: `openpai/pai-marketplace-restserver` and `openpai/pai-marketplace-webportal`.

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

3. Visit `http://localhost:9293/plugin.js` to get the marketplace js file.

### Deploy service by source code

1. Setup a postgres DB.

        docker run \
          -p 5432:5432 \
          -e POSTGRES_USER=user \
          -e POSTGRES_PASSWORD=postgre \
          -e POSTGRES_DB=marketplace \
          postgres:12.0

2. Run marketplace rest_server.

        a. Setup `.env` file for marketplace rest_server.

        # .env file (not including this line)
        DB_USERNAME=<user_name>
        DATABASE=<database_name>
        DB_PASSWORD=<password>
        DB_HOST=<database_host>
        DB_PORT=<database_port_number>
        PORT=<api_service_port>
        AZURE_STORAGE="{\"storage_account\": \"<storage account>\", \"connection_string\": ["BlobEndpoint=<blob end point>\"], \"type\": \"blob\"}"

        b. Then git clone the source code and start the rest server.

        git clone https://github.com/microsoft/openpaimarketplace.git
        git checkout xxx // checkout to the version you needed
        cd rest_server
        // add a .env file
        npm install // recommended nodejs version: ^10
        npm start

3. Run marketplace webportal.

        a. Setup `.env` file for marketplace webportal.

        # .env file (not including this line)
        LOG_LEVEL=<error, warn, info, verbose, debug or silly>
        SERVER_PORT=<expose_port>
        MARKETPLACE_API_URL=<marketplace_api_url>
        NPM_INSTALL_TOKEN=<github package npm install token>

        b. Then git clone the source code and start the webportal.

        git clone https://github.com/microsoft/openpaimarketplace.git
        git checkout xxx // checkout to the version you needed
        cd webportal
        // add a .env file
        npm install // recommended nodejs version: ^10
        npm start

4. Visit `http://<HOST_IP>:<SERVER_PORT>/plugin.js` to get the marketplace js file.

## Notes

1. The three components of marketplace service are independent, user don't have to deploy all of them (e.g. Users can config the marketplace-restserver connect to their own postgres DB, without deploy the marketplace-db service).

2. The marketplace will be deploy to master node in PAI cluster.

3. User can still deploy marketplaces service without set `cluster.common.market: "true"`, but the pylon will not expose the marketplace uri without this.
