# Deployment

There are two components of openpaimarketplace, [rest server](https://github.com/microsoft/openpaimarketplace/tree/master/rest_server) and [webportal plugin](https://github.com/microsoft/openpaimarketplace/tree/master/webportal_plugin), which are responsible for backend service and frontend usage seperately. If you want to use features of openpai marketplace, you must deploy both parts to get a full access

## Deploy rest server

There are two ways to deploy rest server. The recommended way is to use docker compose to deploy rest server with one command. Or if you have network problem or other issues with docker, you could prepare environment and deploy by your own.

### With docker compose (Recommendation)

```shell
$ cd rest_server/deploy
$ docker-compose up -d
$ curl http://localhost:3000 // test when service up
```

You could edit [docker-compose.yml](https://github.com/microsoft/openpaimarketplace/blob/master/rest_server/deploy/docker-compose.yml) to customize the deployment.

### By your own

The rest server uses PostgreSQL database as storage. So you should firstly ensure a working [PostgreSQL database](https://www.postgresql.org/download/) and create a .env file in rest server root path.

```shell
# .env file (not including this line)
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

## Deploy webportal plugin

### Deploy with docker (Recommendation)

You could use prebuilt [docker image](https://github.com/microsoft/openpaimarketplace/packages/171126) in github packages to deploy plugin easily.

```sh
$ // login github packages with docker
$ docker pull docker.pkg.github.com/microsoft/openpaimarketplace/webportal_plugin:<tag> // choose the version you need
$ docker run -d -p <expose_port>:9292 docker.pkg.github.com/microsoft/openpaimarketplace/webportal_plugin:<tag>
$ curl http://localhost:<expose_port>/plugin.js // check out plugin file when service up
```

### Deploy by your own

If you deploy without docker, you need to create a .env file in the webportal plugin root path with some configurations:

```shell
# .env file (not including this line)
LOG_LEVEL=<error, warn, info, verbose, debug or silly>
SERVER_PORT=<expose_port>
MARKETPLACE_API_URL=<marketplace_api_url>
```

> Remind: <marketplace_api_url> should use host ip instead of localhost when deloyment in the same machine, or it will cause some issues.

```sh
$ git clone https://github.com/microsoft/openpaimarketplace.git
$ git checkout xxx // checkout to the version you needed
$ cd webportal_plugin
$ // add .env file
$ yarn install // recommended nodejs version: ^8.10.0 || ^10
$ yarn build
$ yarn start
```

## Configure in pai webportal

After you deploy rest server and webportal plugin successfully, you will have a url like `http://<ip>:<SERVER_PORT>/plugin.js` of webportal plugin. To use it in pai, you should add this url and a name (e.g. new marketplace) in pai `service-configuration.yaml` and restart pai webportal service. Then the marketplace should be shown as a submenu in the `Plugin` section on webportal, like:

![plugin](images/marketplace-plugin.png)

Please refer to [pai configuration doc](https://github.com/microsoft/pai/blob/master/docs/webportal/PLUGINS.md) for more details.
