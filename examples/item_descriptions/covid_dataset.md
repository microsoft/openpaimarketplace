# COVID-19 Outbreak Statistics Dataset

This dataset is downloaded from [Coronavirus Tracker API](https://github.com/ExpDev07/coronavirus-tracker-api). It provides up-to-date data about Coronavirus outbreak, including numbers about confirmed cases, deaths and recovered. Please refer to the project for more details.

## About the Dataset

Currently 3 different data-sources are available to retrieve the data:

- **jhu** - https://github.com/CSSEGISandData/COVID-19 - Worldwide Data repository operated by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).

- **csbs** - https://www.csbs.org/information-covid-19-coronavirus - U.S. County data that comes from the Conference of State Bank Supervisors.

- **nyt** - https://github.com/nytimes/covid-19-data - The New York Times is releasing a series of data files with cumulative counts of coronavirus cases in the United States. This API provides the timeseries at the US county level.

**jhu** data-source will be used as a default source if you do not specify a _source parameter_ in your request.

### Get raw data

You can fetch the latest data file https://coronavirus-tracker-api.herokuapp.com/all api, and rename it as `covid-19_data_<date>.json`.

The suffix <date> indicates the date when it was downloaded. The data source will update by date.


The data file is served on **heroku** platform by the team of [Coronavirus Tracker API](https://github.com/ExpDev07/coronavirus-tracker-api) project. 
The project retrieves source data from institutions mentioned above and cooks the data to a structured format. Then save the data to `json` file. 

The data is organized in json file as below:

```json
{ 
    "confirmed":
    {
        "locations":{},
        "latest":55021938,
        "last updated":"2020-11-17T07:50:12.388084Z",
        "source":"https://github.com/ExpDev07/coronavirus-tracker-api"
    },

    "deaths":
    {
        "locations":{},
        "latest":1327228,
        "last updated":"2020-11-17T07:50:19.998032Z",
        "source":"https://github.com/ExpDev07/coronavirus-tracker-api"
    },
    "recoverd":
    {
        "locations":{},
        "latest":35349444,
        "last updated":"2020-11-17T07:50:27.499343Z",
        "source":"https://github.com/ExpDev07/coronavirus-tracker-api"
    },
    "latest":
    {
        "confirmed":55021938,
        "deaths":1327228,
        "recovered":35349444
    },
}
``` 

The file structure:

```
.
|-- covid-19_data_<date>.json
```

## How to use

### Download to local

You can download the `covid-19_data.json` file by click the `Download` buttton. Please notice that the file is not the latest one. We don't maintain the latest version in marketplace.

If you want get the latest version, please access the website https://coronavirus-tracker-api.herokuapp.com/all and fetch the latest data.

### Use via OpenPAI job submission

Please follow this command to add dataset to your job.
```
mkdir -p /data/covid19/data/
cd /data/covid19/data/
wget <% $data.uri[0] %>
export DATA_DIR=/data/covid19/data/
```

The parameter `data.uri[0]` is defined in the config file (under the `prerequisites` and `taskToles` items), which indicates the dataset address on Azure Blob Storage.

### Use in the code

You can load the data via url:

```
URL = 'https://coronavirus-tracker-api.herokuapp.com/all'
    try:
        url = urllib.request.urlopen(urllib.request.Request(URL, headers={
            'User-Agent': 'https://github.com/coronafighter/coronaSEIR'}))
        r = url.read()
    except:
        raise Exception("Data source of epidemic propagation model closed.")
```

## Related project

[Coronavirus Tracker API](https://github.com/ExpDev07/coronavirus-tracker-api)
