<p align="center">
  <img src="./docs/images/marketplace.svg" width="160" alt="Marketplace Logo" /></a>
</p>

<h2 align="center">Openpaimarketplace</h2>

<p align="center">
  <a href="https://github.com/microsoft/openpaimarketplace/actions?query=workflow%3A%22Publish+Docker+Image%22"><img src="https://github.com/microsoft/openpaimarketplace/workflows/Publish%20Docker%20Image/badge.svg" alt="Publish Docker Image"></a>
  <a href="https://github.com/microsoft/openpaimarketplace/actions?query=workflow%3AWebportal"><img src="https://github.com/microsoft/openpaimarketplace/workflows/Webportal/badge.svg?branch=master" alt="Webportal CI"></a>
  <a href="https://github.com/microsoft/openpaimarketplace/actions?query=workflow%3A%22Rest+Server%22"><img src="https://github.com/microsoft/openpaimarketplace/workflows/Rest%20Server/badge.svg?branch=master" alt="Rest Server CI"></a>
  <a href="https://openpaimarketplace.readthedocs.io/en/latest/?badge=latest"><img src="https://readthedocs.org/projects/openpaimarketplace/badge/?version=latest" alt="Doc"></a>
  <a href="https://github.com/microsoft/openpaimarketplace/releases"><img src="https://img.shields.io/github/v/release/Microsoft/openpaimarketplace" alt="Release"></a>
</p>

---

A marketplace which stores data and job templates of openpai. Users could use openpaimarketplace to share their jobs or run-and-learn others' sharing job.

## Components

There are two components of openpaimarketplace, [rest server](https://github.com/microsoft/openpaimarketplace/tree/master/rest_server) and [webportal](https://github.com/microsoft/openpaimarketplace/tree/master/webportal), which are responsible for backend service and frontend UI seperately.

## Getting Started

- For Admin
  
  To the admin user who is responsible for deploying and managing OpenPAI and openpaimarketplace, please check [admin manual](https://openpaimarketplace.readthedocs.io/en/latest/admin/README.html) for help.

- For User

  To the normal user who wants to use marketplace templates in OpenPAI, please check [user manual](https://openpaimarketplace.readthedocs.io/en/latest/user/README.html) for help.

## Reference

- [OpenPAI](https://github.com/microsoft/pai): A complete solution for AI platform. HiveD will be more user-friendly when working in tandem with OpenPAI.

- [OpenPAI Protocol](https://github.com/microsoft/openpai-protocol): The protocol interface between marketplace and OpenPAI platform.

## Developing Guide

This section is a guide for developers who are new to openpaimarketplace. Openpaimarketplace contains 2 sub projects, `rest_server` and `webportal`. For the detailed developing guide, you should refer to the readme doc of each sub project.

### [rest_server](./rest_server)

Rest server uses nodejs as backend service framework. The api follows RESTful API specification.

### [webportal](./webportal)

Currently openpaimarketplace webportal is used as a [pai webportal plugin](https://github.com/microsoft/pai/blob/master/docs/manual/cluster-admin/how-to-customize-cluster-by-plugins.md). It uses react as frontend framework, and builds with webpack bundler.

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
