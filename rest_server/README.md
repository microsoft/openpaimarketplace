# Openpaimarketplace Rest Server

The rest server of openpaimarketplace. It is the api service to use openpai marketplace.

## Deployment

There are two ways to deploy rest server. The recommended way is to use docker compose to deploy rest server with one command. Or if you have network problem or other issues with docker, you could prepare environment and deploy by your own.

### Deploy with docker compose (Recommendation)

  ```shell
  $ cd rest_server/deploy
  $ docker-compose up -d
  $ curl http://localhost:3000 // test when service up
  ```

  You could check and edit [config file](./deploy/docker-compose.yml) to customize the deployment.

### Deploy by your own

  The rest server uses PostgreSQL database as storage. So you should firstly ensure a working [PostgreSQL database](https://www.postgresql.org/download/) and create a .env file in rest server root path.

  ```shell
  DB_USERNAME=<user_name>
  DATABASE=<database_name>
  DB_PASSWORD=<password>
  DB_HOST=<database_host>
  DB_PORT=<database_port_number>
  PORT=<api_service_port>
  ```

  Then git clone the source code and start the rest server.

  ```shell
  $ git clone https://github.com/microsoft/openpaimarketplace.git
  $ git checkout xxx // checkout to the version you needed
  $ cd rest_server
  $ // add a .env file
  $ yarn install // recommended nodejs version: ^8.10.0 || ^10
  $ yarn start
  ```

## Api specification

Please refer to [openapi spec](./marketplace_api_spec_3.0.yaml) for marketplace api.
