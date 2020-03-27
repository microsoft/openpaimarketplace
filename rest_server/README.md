# Openpaimarketplace Rest Server

The rest server of openpai-marketplace. It is the api service to use openpai marketplace.

## Get started

- deployment

The rest server uses PostgreSQL database as storage. So you should firstly ensure a working PostgreSQL database and set the connection string in rest server .env file. For install and start postgre database, please refer to [official doc](https://www.postgresql.org/download/)

```shell
- git clone https://github.com/microsoft/openpaimarketplace.git
- cd rest_server
- add a .env file with `sql_connection_str=xxx`
- yarn install
- yarn start
```

- api specification

Please refer to [openapi spec](./marketplace_api_spec_3.0.yaml) for marketplace api.
