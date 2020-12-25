

# Deploy Marketplace version v1.3.0 and previous

> Note: this document is not guaranteed to deploy openpaimarketplace successfully for backward compatability. If you meet any problems when deploying v1.3.0 and previous version, please submit issues in openpaimarketplace github project or contact the admins.

## Deploy by marketplace docker images

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
    -e AZURE_STORAGE="{\"storage_account\": \"<storage account>\", \"connection_string\": [\"BlobEndpoint=<blob end point>\"], \"type\": \"blob\"}" \
    openpai/pai-marketplace-restserver:v1.2.0

  docker run \
    -p 9293:9293 \
    -e MARKETPLACE_API_URL="http://localhost:9292" \
    -e SERVER_PORT=9293 \
    -e NPM_INSTALL_TOKEN=<github package npm install token>
    openpai/pai-marketplace-webportal:v1.2.0
  ```

3. Visit `http://localhost:9293/plugin.js` to get the marketplace js file.

## Deploy service by source code

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
   AZURE_STORAGE="{\"storage_account\": \"<storage account>\", \"connection_string\": [\"BlobEndpoint=<blob end point>\"], \"type\": \"blob\"}"
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
