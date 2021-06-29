// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Pivot, PivotItem, IconButton, getTheme } from 'office-ui-fabric-react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import yaml from 'js-yaml';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useBoolean } from '@uifabric/react-hooks';

import DataTemplateDetail from './data_template_detail';
import JobTemplateDetail from './job_template_detail';
import OldTemplateDetail from './old_template_detail';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import { TYPE_ENUM } from 'App/utils/constants';
import CodeWrapper from 'App/components/code_wrapper';
import { updateItem } from 'App/utils/marketplace_api';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

const PivotItemWrapper = styled.div`
  padding: ${spacing.l1};
`;

const PivotCard = props => {
  const { marketItem, marketItemDispatch } = props;
  const [markdown, setMarkdown] = useState(marketItem.description);
  const [
    isEditingDescription,
    {
      setTrue: setIsEditingDescriptionTrue,
      setFalse: setIsEditingDescriptionFalse,
    },
  ] = useBoolean(false);

  return (
    <Wrapper>
      <Pivot>
        <PivotItem headerText='Description'>
          <PivotItemWrapper>
            {isEditingDescription && (
              <>
                <IconButton
                  iconProps={{ iconName: 'Cancel' }}
                  title='Cancel'
                  ariaLabel='Cancel'
                  onClick={() => {
                    setIsEditingDescriptionFalse();
                    setMarkdown(marketItem.description);
                  }}
                  styles={{ root: { marginTop: '-55px', marginRight: '25px', float: 'right' } }}
                />
                <IconButton
                  iconProps={{ iconName: 'Save' }}
                  title='Save'
                  ariaLabel='Save'
                  onClick={() => {
                    setIsEditingDescriptionFalse();
                    if (marketItem.description !== markdown) {
                      marketItemDispatch({
                        type: 'updateItem',
                        value: { description: markdown },
                      });
                      const newItem = {
                        ...marketItem,
                        ...{ description: markdown },
                      };
                      updateItem(
                        {
                          ...newItem,
                          protocol: JSON.stringify(newItem.protocol),
                        },
                        newItem.itemId,
                      ).catch(err => {
                        alert(err);
                      });
                    }
                  }}
                  styles={{ root: { marginTop: '-55px', float: 'right' } }}
                />
                <MarkdownEditor
                  value={markdown}
                  onChange={(_, __, value) => setMarkdown(value)}
                  visible={true}
                  options={{
                    autofocus: true,
                    showCursorWhenSelecting: true,
                  }}
                  height={700}
                />
              </>
            )}
            {!isEditingDescription && (
              <>
                <IconButton
                  iconProps={{ iconName: 'Edit' }}
                  title='Edit'
                  ariaLabel='Edit'
                  onClick={() => {
                    setIsEditingDescriptionTrue();
                  }}
                  styles={{ root: { marginTop: '-55px', float: 'right' } }}
                />
                <ReactMarkdown
                  className='markdown-body'
                  source={marketItem.description}
                />
              </>
            )}
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
  marketItemDispatch: PropTypes.func,
  api: PropTypes.string,
};

export default PivotCard;
