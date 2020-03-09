// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { get, isNil, isEmpty } from 'lodash';
import { removeEmptyProperties } from '../utils/utils';
import { SECRET_PATTERN, DOCKER_OPTIONS } from '../utils/constants';

export class DockerInfo {
  constructor(props) {
    const { uri, auth, secretRef, name, isUseCustomizedDocker } = props;
    this.uri = uri || '';
    this.auth = auth || {};
    this.secretRef = !isEmpty(secretRef) ? secretRef : '';
    this.name = name || '';
    this.isUseCustomizedDocker = isUseCustomizedDocker || false;
  }

  static fromProtocol(dockerInfoProtocol, secrets) {
    let secretRef = get(dockerInfoProtocol, 'auth.password', '');
    let auth;
    if (!isNil(secretRef)) {
      let secretKey = SECRET_PATTERN.exec(secretRef);
      secretKey = isEmpty(secretKey) ? '' : secretKey[1];
      if (!isEmpty(secretKey) && !isNil(secrets[secretKey])) {
        auth = { ...dockerInfoProtocol.auth, password: secrets[secretKey] };
      } else {
        auth = {};
        secretRef = '';
      }
    }
    const isUseCustomizedDocker = DockerInfo.isUseCustomizedDocker(
      dockerInfoProtocol.uri,
    );
    return new DockerInfo({
      ...dockerInfoProtocol,
      auth: auth,
      secretRef: secretRef,
      isUseCustomizedDocker: isUseCustomizedDocker,
    });
  }

  static isUseCustomizedDocker(uri) {
    return isNil(
      DOCKER_OPTIONS.find(dockerOption => dockerOption.image === uri),
    );
  }

  convertToProtocolFormat() {
    const prunedAuth = { ...this.auth };
    if (!isEmpty(this.secretRef)) {
      prunedAuth.password = this.secretRef;
    }
    return removeEmptyProperties({
      type: 'dockerimage',
      auth: prunedAuth,
      uri: this.uri.trim(),
      name: this.name,
    });
  }
}
