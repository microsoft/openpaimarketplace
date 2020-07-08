// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';

export default React.createContext({
  api: null,
  user: null,
  token: null,
  isAdmin: false,
  history: null,
});
