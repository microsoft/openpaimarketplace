# Openpaimarketplace Release Note

## Dec 2020 (version 1.3.0)

- Better data storage experience
  - Use Azure Blob as data storage backend.
  - Add storage api to create/get blob connection string.
  - For more details, please refer to [data management doc](https://openpaimarketplace.readthedocs.io/en/latest/user/data_management.html).

- New deployment process in OpenPAI
  - Create three pai services when deploying in openpai
  - Register marketplace rest api and webportal plugin in OpenPAI pylon.
  - For more details, please refer to [development doc](https://openpaimarketplace.readthedocs.io/en/latest/admin/deployment.html).

- Better Documentation
  - Refine user manual and admin manual in [readthedocs](https://openpaimarketplace.readthedocs.io/en/latest/index.html)
  - Refine readme and developing guide.

- New location and structure of official templates
  - Put official templates in [examples folder](./examples): protocols in [item_protocols folder](./examples/item_protocols), descriptions in [item_descriptions folder](./examples/item_descriptions).
  - All these example templates will be loaded when marketplace rest server starts.
  
- Better UI Design
  - Toggle up pai webportal Marketplace plugin by default
  - Add download button in Marketplace data template
