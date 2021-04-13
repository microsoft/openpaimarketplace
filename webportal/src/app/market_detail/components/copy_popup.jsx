// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, DefaultButton, Modal, TextField } from 'office-ui-fabric-react';
import React, { useReducer, useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { createItem } from 'App/utils/marketplace_api';
import Context from 'App/context';
import { ShareOptions } from 'App/market_detail/components/share_options';
import Card from 'App/components/card';
import queryString from 'query-string';

const copyMarketItemReducer = (state, action) => {
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

export const CopyPopup = props => {
  const { isModalOpen, hideModal, marketItem, marketItemDispatch } = props;
  const { user, api, history } = useContext(Context);

  const [copyMarketItem, dispatch] = useReducer(copyMarketItemReducer, {
    name: `${marketItem.name}(${user})`,
    summary: marketItem.summary,
    description: marketItem.description,
    isPublic: marketItem.isPublic,
    isPrivate: marketItem.isPrivate,
    groupList: marketItem.groupList,
  });

  useEffect(() => {
    dispatch({
      type: 'setState',
      value: { ...marketItem, name: `${marketItem.name}(${user})` },
    });
  }, [marketItem]);

  return (
    <Modal
      isOpen={isModalOpen}
      onDismiss={() => {
        dispatch({
          type: 'setState',
          value: { ...marketItem, name: `${marketItem.name}(${user})` },
        });
        hideModal();
      }}
      isBlocking={false}
    >
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
              createItem({
                ...marketItem,
                ...copyMarketItem,
                author: user,
                protocol: JSON.stringify(marketItem.protocol),
              }).then(itemId => {
                hideModal();
                const qs = queryString.stringify({
                  itemId: itemId,
                });
                marketItemDispatch({
                  type: 'updateItem',
                  value: {
                    ...copyMarketItem,
                    author: user,
                  },
                });
                history.push(`/market_detail?${qs}`);
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
  marketItemDispatch: PropTypes.func,
};
