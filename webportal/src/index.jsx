// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

const api = 'https://10.151.40.234/rest_server';
const user = 'admin';
const token = 'asdf';
const isAdmin = cookies.get('admin') === 'true';

ReactDOM.render(
  <App api={api} user={user} token={token} isAdmin={isAdmin} />,
  document.getElementById('container'),
);
