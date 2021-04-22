# Openpaimarketplace Release Note

## April 2021 (version 1.7.0)

- Add save to template in new submission page and new features #253
- Implement item process experience: including create, copy, list and edit #249
- Add item creation from job list #256
- Add share option of protected/public/private #254

## Mar 2021 (version 1.6.0)

- Simplify deploy config #209
- Save to template #212
- Add access control #210
- [Upgrade Guide](https://openpaimarketplace.readthedocs.io/en/latest/admin/deploy_v1.6.0_later.html)

## Jan 2021 (version 1.5.0)

- Refine deployment process #165
- Refine manual book of marketplace deploy flow #154
- Add search bar in market list page #158
- Add create template page #163
- Fix bugs of official examples #129

## Dec 2020 (version 1.4.1)

- Improve deployment and usage experience for v1.4.0

  - Check environment variable `process.env.AZURE_STORAGE` exists before insert into database.

  - Add a property `useBlob` in marketplaceItem model as a flag, and only contact `pai_copy` related commands if `useBlob` is true.

## Dec 2020 (version 1.4.0)

- Keep the release version aligned with [pai](https://github.com/microsoft/pai) (both with version v1.4.0).

- Make the name of example templates human readable in Marketplace Webportal UI.
  - Change names of /examples/examples.js human readable.
  - Make the title of /examples/item_descriptions aligned with name of /examples/examples.js.
  - Keep the name of /examples/item_protoocls illegal for OpenPAI. (Because the protocol will be submitted to OpenPAI cluster).

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
