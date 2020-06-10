// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import c from 'classnames';

import { Pivot, PivotItem, FontWeights } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';

import t from '../../components/tachyons.scss';
import Card from './card';
import Description from './description';
import TaskRoles from './taskRoles';
import YamlFileRender from 'App/components/yaml_file_render';

export default function Detail(props) {
  const { marketItem } = props;

  return (
    <div className={c(t.bgWhite, t.mt3)}>
      {/* summary */}
      <Card className={c(t.pv4, t.ph5)}>
        <Pivot>
          <PivotItem
            headerText='Description'
            styles={{
              root: {
                fontSize: 14,
                fontWeight: FontWeights.regular,
              },
            }}
          >
            <Description content={marketItem.description} />
          </PivotItem>
          <PivotItem
            headerText='Task Roles'
            styles={{
              root: {
                fontSize: 14,
                fontWeight: FontWeights.regular,
              },
            }}
          >
            <TaskRoles marketItem={marketItem} />
          </PivotItem>
          <PivotItem
            headerText='Yaml File'
            styles={{
              root: {
                fontSize: 14,
                fontWeight: FontWeights.regular,
              },
            }}
          >
            <YamlFileRender yamlConfig={marketItem.jobConfig} />
          </PivotItem>
        </Pivot>
      </Card>
    </div>
  );
}

Detail.propTypes = {
  marketItem: PropTypes.object,
};
