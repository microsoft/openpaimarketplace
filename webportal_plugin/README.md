# Openpaimarketplace Webportal Plugin

The rest server of openpai-marketplace. It is the main entrance for pai user to use openpai marketplace.

## Deployment

### Deploy with docker

You could use prebuilt [docker image](https://github.com/microsoft/openpaimarketplace/packages/171126) in github packages to deploy plugin easily.

```sh
- // login github packages with docker
- docker pull docker.pkg.github.com/microsoft/openpaimarketplace/webportal_plugin:<tag> // choose the version you need
- docker run -d -p <expose_port>:9292 docker.pkg.github.com/microsoft/openpaimarketplace/webportal_plugin:<tag>
- curl http://localhost:<expose_port>/plugin.js // check out plugin file when service up
```

### Deploy by your own

If you deploy without docker, you need to create a .env file in the webportal plugin root path with some configurations:

```shell
LOG_LEVEL=<error, warn, info, verbose, debug or silly>
SERVER_PORT=<expose_port>
MARKETPLACE_API_URL=<marketplace_api_url>
```

- For developing

  Webportal plugin used webpack-dev-server to hold static plugin.js file when developing.

  ```sh
  - git clone https://github.com/microsoft/openpaimarketplace.git
  - git checkout xxx // checkout to the version you needed
  - cd webportal_plugin
  - // add .env file
  - yarn install
  - yarn dev // go to <host_url>:<expose_port>/plugin.js to check the bundle file
  ```

- For production

  ```sh
  - git clone https://github.com/microsoft/openpaimarketplace.git
  - cd webportal_plugin
  - // add .env file
  - yarn install
  - yarn build
  - yarn start
  ```

## Configure pai webportal

If you want to check the plugin in pai webportal, you should configure pai webportal .env file with the plugin service uri. See [web portal plugin doc](https://github.com/microsoft/pai/blob/master/docs/webportal/PLUGINS.md) for more detail of configuring webportal plugin.
