// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Pivot, PivotItem, getTheme } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import yaml from 'js-yaml';

import DataTemplateDetail from './data_template_detail';
import JobTemplateDetail from './job_template_detail';
import OldTemplateDetail from './old_template_detail';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import { TYPE_ENUM } from 'App/utils/constants';
import CodeWrapper from 'App/components/code_wrapper';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

const PivotItemWrapper = styled.div`
  padding: ${spacing.l1};
`;

const PivotCard = props => {
  const { marketItem } = props;

  return (
    <Wrapper>
      <Pivot>
        <PivotItem headerText='Description'>
          <PivotItemWrapper>
            <ReactMarkdown
              className='markdown-body'
              source={marketItem.description}
            />
          </PivotItemWrapper>
        </PivotItem>
        <PivotItem headerText='Detail'>
          <PivotItemWrapper>
            {marketItem.type === TYPE_ENUM.DATA_TEMPLATE && (
              <DataTemplateDetail marketItem={marketItem} />
            )}
            {marketItem.type === TYPE_ENUM.DATA_TEMPLATE && (
              <JobTemplateDetail marketItem={marketItem} />
            )}
            {marketItem.type === TYPE_ENUM.OLD_TEMPLATE && (
              <OldTemplateDetail marketItem={marketItem} />
            )}
          </PivotItemWrapper>
        </PivotItem>
        <PivotItem headerText='Protocol'>
          <PivotItemWrapper>
            <CodeWrapper>{yaml.safeDump(marketItem.protocol)}</CodeWrapper>
          </PivotItemWrapper>
        </PivotItem>
      </Pivot>
    </Wrapper>
  );
};

PivotCard.propTypes = {
  marketItem: PropTypes.object,
};

export default PivotCard;
