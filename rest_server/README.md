# Openpaimarketplace Rest Server

The rest server of openpaimarketplace. It is the api service to use openpai marketplace.

## Prerequisites

- Nodejs 10.x and corresponding npm tool. Other versions of nodejs are not guaranteed in marketplace webportal. 

- PostgreSQL database. Marketplace rest server uses postgreSQl as database to store item and user data.

## Development


- Start a local postgreSQL database 
  
  Please refer to [postgreSQL doc](https://www.postgresql.org/docs/13/tutorial-install.html) for how to start a database locally. After the database successfully starts, get the database info of user, password, etc.

  Otherwise, if you have a remote database that could be connected from local machine, you could skip this step.

- Start rest server

  To start a marketplace rest server locally, first you need to create a `.env` file in rest_server project root path:

  ```
  DB_USERNAME=<dabase_username>
  DATABASE=<database_name>
  DB_PASSWORD=<database_pwd>
  DB_HOST=<database_host>
  DB_PORT=<database_port>
  PORT=<rest_server_port>
  AZURE_STORAGE=<azure_storage_info>
  ```
  - DB_USERNAME, DATABASE, DB_PASSWORD, DB_HOST, DB_PORT: the database info 
  - PORT: the rest server service port.
  - AZURE_STORAGE: the initial azure storage info. It is a json string that will be initially created in database, and will be used by download or upload data in templates. The format is :

    ```
    {
      "storage_account": <azure_storage_account>,
      "connection_strings": [
        <blob_strage_string>
      ],
      "type": "blob"
    }
    ```

  After creating `.env` file, use `npm install` and `npm run dev` command to start marketpalce rest server.

  ```sh
  $ npm install 
  $ npm run dev // go to http://localhost:<PORT> to test Marketplace rest api
  ```

## Api specification

After rest server starts successfully, you could test the rest api following [marketplace rest api specification](./marketplace_api.yaml).

## Code Style

Marketplace rest server uses eslint as linter and prettier as code formatter.

Pleae refer to [eslint config file](./.eslintrc.js) and [prettier config file](./prettier.config.js) for details. Remember to run `npm run lint` command every time before pushing your code, and resolve all the errors and warnings. Otherwise it will break the CI check when you submit your pull request.

If you use modern editors like VS Code. It is highly recommended to install eslint and prettier extensions.

> How to do code format with prettier? You could use cli like prettier --write 'src/**/*.js' 'src/**/*.jsx' or use prettier extension in vscode.


## Deployment

Please refer to [OpenPAI Marketplace deplopment doc](https://openpaimarketplace.readthedocs.io/en/latest/admin/deployment.html)

