# Troubleshooting

## How to determine the url of marketplace rest server and webportal plugin?

The marketplace rest server and webportal url is aligned with OpenPAI cluster. If https is enabled in OpenPAI cluster, then the url of marketplace should be `https://<openpai_cluster_ip>/marketplace/api` and `https://<openpai_cluster_ip>/marketplace/plugin.js`, otherwise if https is not enabled in OpenPAI, the url should be `http://<openpai_cluster_ip>/marketplace/api` and `https://<openpai_cluster_ip>/marketplace/plugin.js`.
