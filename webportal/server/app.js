// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.s
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appRoot = require('app-root-path');
const config = require('./config');
const logger = require('./logger');
const dotnev = require('dotenv');

const app = express();
dotnev.config();

app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev', { stream: logger.stream }));

const oneMonth = 3600 * 24 * 30 * 1000;

app.use(
  '/scripts',
  express.static(path.join(appRoot.path, 'dist/scripts'), { maxAge: oneMonth }),
);
app.use(express.static(path.join(appRoot.path, 'dist')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  logger.warn(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: config.env === 'development' ? err.stack : {},
  });
});

// module exports
module.exports = app;
