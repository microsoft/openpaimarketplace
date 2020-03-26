// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
