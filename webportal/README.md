# Openpaimarketplace Webportal Plugin

The rest server of openpai-marketplace. It is the main entrance for pai user to use openpai marketplace.

## Deployment

Please refer to [openpaimarketplace doc](../docs/deployment.md#Deploy-webportal-plugin)

## Development

First create a .env file in the webportal plugin root path with some configurations:

```shell
# .env file (not including this line)
LOG_LEVEL=<error, warn, info, verbose, debug or silly>
SERVER_PORT=<expose_port>
MARKETPLACE_API_URL=<marketplace_api_url>
```

Webportal plugin used webpack-dev-server to watch the file changes instantly.

```sh
$ git clone https://github.com/microsoft/openpaimarketplace.git
$ git checkout xxx // checkout to the version you needed
$ cd webportal_plugin
$ // add .env file
$ yarn install // recommended nodejs version: ^8.10.0 || ^10
$ yarn dev // go to <host_url>:<expose_port>/plugin.js to check the bundle file
```

## Configure pai webportal

If you want to use the plugin in pai webportal, you should configure pai webportal .env file with the plugin service uri. Please refer to [web portal plugin doc](../docs/deployment.md#Configure-in-pai-webportal).
