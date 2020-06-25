// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import c from 'classnames';
import {
  Pivot,
  PivotItem,
  FontWeights,
  getTheme,
} from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Description from './description';
import TaskRoles from './taskRoles';
import YamlFileRender from 'App/components/yaml_file_render';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

export default function Detail(props) {
  const { marketItem } = props;

  return (
    <Wrapper>
      <Pivot>
        <PivotItem headerText='Description'>
          <Description content={marketItem.description} />
        </PivotItem>
      </Pivot>
    </Wrapper>
  );
}

Detail.propTypes = {
  marketItem: PropTypes.object,
};
