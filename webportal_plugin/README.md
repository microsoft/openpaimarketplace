# Openpaimarketplace Webportal Plugin

The rest server of openpai-marketplace. It is the main entrance for pai user to use openpai marketplace.

## get started

The deployment of webportal plugin used webpack-dev-server to hold static plugin.js file by default. However you could use webpack to build plugin.js file and render it by your own service.

- To start by webpack-dev-server

```sh
- git clone https://github.com/microsoft/openpaimarketplace.git
- cd webportal_plugin
- yarn install
- yarn start // go to <root_url>/plugin.js to check the bundle file
```

- To build by webpack

```sh
- git clone https://github.com/microsoft/openpaimarketplace.git
- cd webportal_plugin
- yarn install
- yarn build // the output plugin.js file is in /dist folder
```

After the service started, configure pai webportal .env file with the service uri. See [web portal plugin doc](https://github.com/microsoft/pai/blob/master/docs/webportal/PLUGINS.md) for more detail of configuring webportal plugin.
