# Troubleshooting

## How to determine the url of marketplace rest server and webportal plugin?

The marketplace rest server and webportal url is aligned with OpenPAI cluster. If https is enabled in OpenPAI cluster, then the url of marketplace should be `https://<openpai_cluster_ip>/marketplace/api` and `https://<openpai_cluster_ip>/marketplace/plugin.js`, otherwise if https is not enabled in OpenPAI, the url should be `http://<openpai_cluster_ip>/marketplace/api` and `https://<openpai_cluster_ip>/marketplace/plugin.js`.

## How to remove the auto added marketplace in OpenPAI webportal plugin?

In Marketplace v1.6.0, when the admin set `cluster.common.marketplace = "true"`, the OpenPAI deploy script will auto add a marketplace item into the webportal's plugin.
Upgrade marketplace from previous version without changing the `services-configuration.yaml` file, the auto added marketplace item may cause duplicate marketplace tags in webportal [#230](https://github.com/microsoft/openpaimarketplace/issues/230).
Admin can either set `webportal.marketplace: false` to avoid the auto added item, or remove the old marketplace item from `webportal.plugins` to delete the old one.

## How to solve "SequelizeDatabaseError: column <column_name> does not exist"

In OpenPAI Marketplace v1.6.0, we **changed marketplace item schema to support access control for marketplace items**. For user who has deployed the marketplace, marketplace database need to be migrated to new schema. Otherwise, it will throw an "SequelizeDatabaseError: column <column_name> does not exist" exception.

To migrate marketplace, the suggested approach is use `sequelize-cli` and `npx`, like in `rest_server/migrate_marketplace_item.sh`.
```bash
# Install dependency
npm install npx sequelize-cli
# Do migrate in migrations/
npx sequelize-cli db:migrate
```
