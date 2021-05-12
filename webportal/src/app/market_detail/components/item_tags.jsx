// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, CommandBar, CommandBarButton } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateItem } from 'App/utils/marketplace_api';
import { isEmpty, isArray, cloneDeep } from 'lodash';

const deleteTag = (item, tag) => {
  const newItem = cloneDeep(item);

};

const generateBarItems = (item, editable, maxLength) => {
  const tags = item.tags;
  const items = [];
  if (isArray(tags) && !isEmpty(tags)) {
    for (const tag of tags) {
      items.push({
        key: tag,
        text: tag,
        editable: editable,
        onClick: () => alert('1'),
      });
    }
  }
  items.push({ addTagButton: true });
  return items;
};

const TagButton = props => {
  // eslint-disable-next-line
  const buttonOnMouseClick = () => alert(`${props.text} clicked`);
  if (props.addTagButton) {
    return (
      <CommandBarButton
        onClick={() => alert('add tag!')}
        iconProps={{ iconName: 'Add' }}
        styles={{
          root: {
            padding: 0,
            minWidth: 0,
          },
        }}
      />
    );
  } else {
    return (
      <Stack horizontal>
        <CommandBarButton
          {...props}
          onClick={buttonOnMouseClick}
          styles={{
            root: {
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',
              borderTopRightRadius: props.editable ? '0' : '12px',
              borderBottomRightRadius: props.editable ? '0' : '12px',
            },
          }}
        />
        {props.editable && (
          <CommandBarButton
            iconProps={{ iconName: 'Cancel' }}
            styles={{
              root: {
                padding: 0,
                marginRight: '8px',
                minWidth: 0,
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
              },
            }}
          />
        )}
      </Stack>
    );
  }
};

TagButton.propTypes = {
  editable: PropTypes.bool,
};

export const ItemTags = props => {
  const { marketItem, marketItemDispatch, api } = props;
  const items = generateBarItems(marketItem, true, marketItemDispatch, api);

  return (
    <CommandBar
      styles={{
        root: { height: '18px', padding: 0, backgroundColor: 'white' },
      }}
      items={items}
      buttonAs={TagButton}
    />
  );
};

ItemTags.propTypes = {
  marketItem: PropTypes.object,
  marketItemDispatch: PropTypes.func,
  api: PropTypes.string,
};
