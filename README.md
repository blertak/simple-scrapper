# Simple scrapper

This project demonstrates a simple example of web scrapping using puppeteer and data fetching from REST API using axios.
These data are shown in a simple user interface.

## Setup 

Firstly you need to run:
```console
npm install
bash setup-config.sh
```
After that you will need to set up your database connection string on `.env` file.

Next step is running the scripts:

```console
node fetch-api.js # fetch users
node fetch-web.js # fetch performance data
```

To be able to view the results you will need to run:
```
npm start
```
