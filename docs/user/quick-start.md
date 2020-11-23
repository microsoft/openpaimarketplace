# Quick Start

Before you start this journey, you better have read the [OpenPAI Quick Start](https://openpai.readthedocs.io/en/latest/manual/cluster-user/quick-start.html) document. We won't repeat basics in that document.

For a quick start, you should get equipped with an account authorized for OpenPAI cluster and marketplace, and an connection string can access Azure Storage.

## Browse marketplace

[comment]: < # TODO: Update "Data" tag to "Data template", and recording gif again >

![browse_marketplace](../images/browse_marketplace.gif)

The above gif shows how to browse OpenPAI Marketplace. The entry point of OpenPAI Marketplace is site in "Plugins" folding panel. In marketplace, templates are categorized. After you clicked "Marketplace" button, it  defaultly displays all template. In "Types" sidebar, there are 4 options at this version, which are "All", "Data", "Job Template", "Old Example":

* "All" uses no filter, and simply displays all templates.
* "Data" filters data templates out. Data templates are templates to help user load related dataset to their environment.
* "Job Template" filters job templates out. Job templates are templates to perform predefined task, which may ease users from repeating theirselves.
* "Old Example" filters legacy templates out. Those templates show how to use old framework in templates.


## Create job from template

In following part, we will walk through the process to submit job from job template. In marketplace, we mainly use 2 kinds of templates, job templates and data templates. Data templates offers extra "download" function to download related dataset. For both kinds of templates, you can simply click on it, and jump to the details page. The details page shows the description of the template, "Use" button and "Download" button for data templates. To create job from template, you need click the "Use" buttion, and the marketplace will generate corresponding job in OpenPAI submit page. User need to verify the commands and configurations, and submit the job manually. For advanced job settings, [OpenPAI user manual](https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-use-advanced-job-settings.html) will be a good reference. In Following gif shows the process step by step.

![create_job_from_template](../images/create_job_from_template.gif)


