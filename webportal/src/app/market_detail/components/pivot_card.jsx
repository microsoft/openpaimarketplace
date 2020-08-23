// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Pivot, PivotItem, getTheme } from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DataDetail from './data_detail';
import TemplateDetail from './template_detail';
import OldDetail from './old_detail';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
  height: 1700px;
  overflow-y: none;
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
              source={marketItem.protocol.description}
            />
          </PivotItemWrapper>
        </PivotItem>
        <PivotItem headerText='Detail'>
          <PivotItemWrapper>
            {marketItem.type === 'data' && (
              <DataDetail marketItem={marketItem} />
            )}
            {marketItem.type === 'template' && (
              <TemplateDetail marketItem={marketItem} />
            )}
            {marketItem.type === 'old' && <OldDetail marketItem={marketItem} />}
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
