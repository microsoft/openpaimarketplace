// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';

const Context = React.createContext({
  marketItem: null,
  user: null,
  api: null,
  history: null,
});

export default Context;
