// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { FontClassNames } from '@uifabric/styling';
import Card from './card';
import yaml from 'js-yaml';
import PropTypes from 'prop-types';

const YamlFileRender = props => {
  const { yamlConfig } = props;
  return (
    <Card
      style={{
        whiteSpace: 'pre-wrap',
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#f8f8f8',
      }}
      className={FontClassNames.mediumPlus}
    >
      <div>{yaml.safeDump(yamlConfig)}</div>
    </Card>
  );
};

YamlFileRender.propTypes = {
  yamlConfig: PropTypes.object,
};

export default YamlFileRender;
