// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, DefaultButton, Modal, TextField } from 'office-ui-fabric-react';
import React, { useReducer, useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { updateItem } from 'App/utils/marketplace_api';
import Context from 'App/context';
import { ShareOptions } from 'App/market_detail/components/share_options';
import Card from 'App/components/card';

const editTempItemReducer = (state, action) => {
  switch (action.type) {
    case 'setState':
      return {
        name: action.value.name,
        summary: action.value.summary,
        description: action.value.description,
        isPublic: action.value.isPublic,
        isPrivate: action.value.isPrivate,
        groupList: action.value.groupList,
      };
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

export const EditPopup = props => {
  const { isModalOpen, hideModal, marketItem, marketItemDispatch } = props;
  const { api } = useContext(Context);
  const [editTempItem, editTempItemDispatch] = useReducer(editTempItemReducer, {
    name: marketItem.name,
    summary: marketItem.summary,
    description: marketItem.description,
    isPublic: marketItem.isPublic,
    isPrivate: marketItem.isPrivate,
    groupList: marketItem.groupList,
  });

  useEffect(() => {
    editTempItemDispatch({ type: 'setState', value: marketItem });
  }, [marketItem]);

  return (
    <Modal
      isOpen={isModalOpen}
      onDismiss={() => {
        editTempItemDispatch({
          type: 'setState',
          value: marketItem,
        });
        hideModal();
      }}
      isBlocking={false}
    >
      <Card>
        <Stack gap='m'>
          <TextField
            label='Name'
            defaultValue={editTempItem.name}
            onChange={debounce((_, name) => {
              editTempItemDispatch({ type: 'setName', value: name });
            }, 100)}
            styles={{ root: { minWidth: 400, maxWidth: 500 } }}
          />
          <ShareOptions
            marketItem={editTempItem}
            dispatch={editTempItemDispatch}
            api={api}
          />
          <TextField
            label='Summary'
            defaultValue={editTempItem.summary}
            onChange={debounce((_, summary) => {
              editTempItemDispatch({ type: 'setSummary', value: summary });
            }, 100)}
          />
          <TextField
            label='Description'
            defaultValue={marketItem.description}
            onChange={debounce((_, desc) => {
              editTempItemDispatch({ type: 'setDescription', value: desc });
            }, 100)}
            multiline={true}
            rows={6}
            styles={{ root: { minWidth: 400, maxWidth: 500 } }}
          />
          <DefaultButton
            text='Submit'
            onClick={() => {
              marketItemDispatch({ type: 'updateItem', value: editTempItem });
              // Dispatch is handled asynchronously and API does not provide any way of executing a piece of code after the dispatch has been executed.
              // The marketItem here may be the old one, so we merge the item manually.
              const newItem = { ...marketItem, ...editTempItem };
              updateItem(
                {
                  ...newItem,
                  protocol: JSON.stringify(newItem.protocol),
                },
                newItem.itemId,
              ).then(() => {
                hideModal();
              });
            }}
          />
        </Stack>
      </Card>
    </Modal>
  );
};

EditPopup.propTypes = {
  isModalOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  marketItem: PropTypes.object,
  marketItemDispatch: PropTypes.func,
};
