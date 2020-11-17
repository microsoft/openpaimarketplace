# Coronavirus Public Dataset

This dataset is downloaded from [Coronavirus Tracker API](https://github.com/ExpDev07/coronavirus-tracker-api). It provides up-to-date data about Coronavirus outbreak, including numbers about confirmed cases, deaths and recovered. Please refer to the project for more details.

## Dataset Introduction

Currently 3 different data-sources are available to retrieve the data:

- **jhu** - https://github.com/CSSEGISandData/COVID-19 - Worldwide Data repository operated by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).

- **csbs** - https://www.csbs.org/information-covid-19-coronavirus - U.S. County data that comes from the Conference of State Bank Supervisors.

- **nyt** - https://github.com/nytimes/covid-19-data - The New York Times is releasing a series of data files with cumulative counts of coronavirus cases in the United States. This API provides the timeseries at the US county level.

**jhu** data-source will be used as a default source if you do not specify a _source parameter_ in your request.

## The file stucture

```
.
|-- covid-19_data_<date>.json
```

The suffix <date> indicates the date when it was downloaded. The data source will update by date.

## How to use

The data will be mounted at ```DATA_DIR``` environment variable. You could use ```$DATA_DIR``` in your command when submit jobs in pai.

You could also fetch data from https://coronavirus-tracker-api.herokuapp.com/all api, and use it directly.
