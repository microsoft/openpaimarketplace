# Create Template

At current version, the marketplace only support create job template. Marketplace template is shared OpenPAI protocols. So it requires a template file in advance. There are two main method to create a template yaml, write it manually or copy it from OpenPAI jobs. Manually write the template can reference [openpai-protocol](https://github.com/microsoft/openpai-protocol). To copy executed job as template yaml, user need to follow [OpenPAI User Manual](https://openpai.readthedocs.io/en/latest/manual/cluster-user/quick-start.html).

Create job template has 4 steps:

1. Click "Create" button at top right corner
2. Upload protocol yaml file as template file
3. Select type as "Job Template", fill other required form fields, then click "Next" button
4. Check template details, if all configuration are correct, click "Next" button, then create job template action success.

![Create Job Template](../images/create_job_template_from_file.gif)

Protocol yaml examples can be found [here](https://github.com/microsoft/openpaimarketplace/tree/master/examples/item_protocols).
