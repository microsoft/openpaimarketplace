# OpenPAI Marketplace Webportal 

The webportal of OpenPAI Marketplace. It is the main entrance for pai user to use OpenPAI Marketplace.

## Prerequisites

- Nodejs 10.x and corresponding npm tool. Other versions of nodejs are not guaranteed in marketplace webportal. 

- OpenPAI Webportal

 Currently OpenPAI Marketplace webportal is used as an [OpenPAI webportal plugin](https://github.com/microsoft/pai/blob/master/docs/manual/cluster-admin/how-to-customize-cluster-by-plugins.md). So it is required to firstly have an OpenPAI webportal, and user could enter OpenPAI Marketplace in the sidebar of OpenPAI webportal. Like the following image shows.

![browse_marketplace](../docs/images/browse_marketplace.gif)

## Development


- Start or connect to a Marketplace rest server
  
  Marketplace webportal needs a backend rest server to fetch item data. So a marketplace rest server url is required if you want marketplace webportal to work as expected.

  Please refer to [rest server doc] for how to start a rest server locally or connect to a existing rest server.

- Start a Marketplace webportal locally

  To start a marketplace webportal locally, first you need to create a `.env` file in webportal project root path:

  ```
  LOG_LEVEL=debug
  SERVER_PORT=9293
  MARKETPLACE_API_URL=<marketplace_rest_server_url>

  ```
  - LOG_LEVEL: the log level to show in webportal, default is debug.
  - SEVER_PORT: the webportal service port.
  - MARKETPLACE_API_URI: the api endpoint of marketplace rest server

  After creating `.env` file, use `npm install` and `npm run dev` command to start marketpalce webportal.

  ```sh
  $ npm install 
  $ npm run dev // go to http://localhost:<SERVER_PORT>/plugin.js to check the bundle file
  ```

- Start an OpenPAI webportal locally
  
  If you want to develop and debug Marketplace webportal, you need to start an OpenPAI webportal locally. Please refer to [OpenPAI doc](https://github.com/microsoft/pai/blob/master/src/webportal/README.md) for how to start an OpenPAI webportal and how to [config plugin](https://github.com/microsoft/pai/blob/master/docs/manual/cluster-admin/how-to-customize-cluster-by-plugins.md).

## Code Style

Marketplace webportal uses eslint as linter and prettier as code formatter.

Pleae refer to [eslint config file](./.eslintrc.js) and [prettier config file](./prettier.config.js) for details. Remember to run `npm run lint` command every time before pushing your code, and resolve all the errors and warnings. Otherwise it will break the CI check when you submit your pull request.

If you use modern editors like VS Code. It is highly recommended to install eslint and prettier extensions.

> How to do code format with prettier? You could use cli like prettier --write 'src/**/*.js' 'src/**/*.jsx' or use prettier extension in vscode.

## Deployment

Please refer to [OpenPAI Marketplace deplopment doc](https://openpaimarketplace.readthedocs.io/en/latest/admin/deployment.html)



