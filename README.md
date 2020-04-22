# openpaimarketplace

![Webportal Plugin](https://github.com/microsoft/openpaimarketplace/workflows/Webportal%20Plugin/badge.svg?branch=master)
![Rest Server](https://github.com/microsoft/openpaimarketplace/workflows/Rest%20Server/badge.svg?branch=master)
[![Documentation Status](https://readthedocs.org/projects/openpaimarketplace/badge/?version=latest)](https://openpaimarketplace.readthedocs.io/en/latest/?badge=latest)
[![Release Version](https://img.shields.io/github/v/release/Microsoft/openpaimarketplace)](https://github.com/microsoft/openpaimarketplace/releases)
[![Docker Image](https://img.shields.io/badge/docker--image-v1.1.0-success)](https://github.com/microsoft/openpaimarketplace/packages/171126?version=v1.1.0)

A marketplace which stores examples and job templates of openpai. Users could use openpaimarketplace to share their jobs or run-and-learn others' sharing job.

## Components

There are two components of openpaimarketplace, [rest server](https://github.com/microsoft/openpaimarketplace/tree/master/rest_server) and [webportal plugin](https://github.com/microsoft/openpaimarketplace/tree/master/webportal_plugin), which are responsible for backend service and frontend usage seperately. Please check the two folders for more detail.

## Documentation

The documentation is put in [docs directory](./docs) and hosted at [readthedocs](https://openpaimarketplace.readthedocs.io/en/latest/):

* [Deployment](./docs/deployment.md)
* [Getting started](./docs/getting_started.md)

## Code style check

This project use eslint with standard config as linter and prettier as code formatter.

Pleae refer to eslint config file and prettier config file for details. Make sure to run yarn lint command every time before you push your code, and resolve all the errors and warnings. Otherwise it will break the CI check when you submit your pull request.

If you use modern editors like VS Code. It is highly recommends to install eslint and prettier extensions.

    How to do code format with prettier? You could use cli like prettier --write 'src/**/*.js' 'src/**/*.jsx' or use prettier extension in vscode.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
