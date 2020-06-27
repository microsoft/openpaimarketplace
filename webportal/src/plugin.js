// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

class PAIMarketplacePluginElement extends HTMLElement {
  connectedCallback() {
    const api = this.getAttribute('pai-rest-server-uri');
    const user = this.getAttribute('pai-user');
    const token = this.getAttribute('pai-rest-server-token');
    const isAdmin = cookies.get('admin') === 'true';
    if (user === null || token === null) {
      window.location.href = '/login.html';
      return;
    }
    ReactDOM.render(
      React.createElement(App, { api, user, token, isAdmin }),
      this,
    );
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

window.customElements.define('pai-plugin', PAIMarketplacePluginElement);
