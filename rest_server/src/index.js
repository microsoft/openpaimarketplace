// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
const dotnev = require('dotenv');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler');

dotnev.config();

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(cors());

app.get('/', function(req, res) {
  res.send('Welcome to marketplace!');
});

app.use('/', router);

app.use(errorHandler);

app.listen(process.env.PORT, function() {
  console.log(`Marketplace service listening on port ${process.env.PORT}!`);
});
