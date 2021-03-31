// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, DefaultButton, Modal, TextField } from 'office-ui-fabric-react';
import React, { useReducer, useContext } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { createItem } from 'App/utils/marketplace_api';
import Context from 'App/context';
import { ShareOptions } from 'App/market_detail/components/share_options';
import Card from 'App/components/card';

const copyMarketItemReducer = (state, action) => {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.value };
    case 'setSummary':
      return { ...state, summary: action.value };
    case 'setDescription':
      return { ...state, description: action.value };
    case 'setPublic':
      return { ...state, isPublic: true, isPrivate: false, groupList: [] };
    case 'setPrivate':
      return { ...state, isPrivate: true, isPublic: false, groupList: [] };
    case 'setGroupList':
      return {
        ...state,
        isPublic: false,
        isPrivate: false,
        groupList: action.value,
      };
    default:
      throw new Error();
  }
};

export const CopyPopup = props => {
  const { isModalOpen, hideModal, marketItem } = props;
  const { user, api } = useContext(Context);

  const [copyMarketItem, dispatch] = useReducer(copyMarketItemReducer, {
    name: `${marketItem.name}(${user})`,
    author: user,
    type: marketItem.type,
    source: 'marketplace',
    isPublic: marketItem.isPublic,
    isPrivate: marketItem.isPrivate,
    groupList: marketItem.groupList,
    dataType: marketItem.dataType,
    dataUrl: marketItem.dataUrl,
    useBlob: marketItem.useBlob,
    categories: marketItem.categories,
    tags: marketItem.tags,
    summary: marketItem.summary,
    description: marketItem.description,
    protocol: JSON.stringify(marketItem.protocol),
    status: marketItem.status,
  });

  return (
    <Modal isOpen={isModalOpen} onDismiss={hideModal} isBlocking={false}>
      <Card>
        <Stack gap='m'>
          <TextField
            label='Name'
            defaultValue={copyMarketItem.name}
            onChange={debounce((_, name) => {
              dispatch({ type: 'setName', value: name });
            }, 100)}
            styles={{ root: { minWidth: 400, maxWidth: 500 } }}
          />
          <ShareOptions
            marketItem={copyMarketItem}
            dispatch={dispatch}
            api={api}
          />
          <TextField
            label='Summary'
            defaultValue={copyMarketItem.summary}
            onChange={debounce((_, summary) => {
              dispatch({ type: 'setSummary', value: summary });
            }, 100)}
          />
          <TextField
            label='Description'
            defaultValue={copyMarketItem.description}
            onChange={debounce((_, desc) => {
              dispatch({ type: 'setDescription', value: desc });
            }, 100)}
            multiline={true}
            rows={6}
            styles={{ root: { minWidth: 400, maxWidth: 500 } }}
          />
          <DefaultButton
            text='Submit'
            onClick={() => {
              createItem(copyMarketItem).then(() => {
                hideModal();
              });
            }}
          />
        </Stack>
      </Card>
    </Modal>
  );
};

CopyPopup.propTypes = {
  isModalOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  marketItem: PropTypes.object,
};
