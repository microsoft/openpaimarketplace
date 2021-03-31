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

export const EditPopup = props => {
  const { isModalOpen, hideModal, marketItem, marketItemDispatch } = props;
  const { api } = useContext(Context);

  return (
    <Modal isOpen={isModalOpen} onDismiss={hideModal} isBlocking={false}>
      <Card>
        <Stack gap='m'>
          <TextField
            label='Name'
            defaultValue={copyMarketItem.name}
            onChange={debounce((_, name) => {
              marketItemDispatch({ type: 'setName', value: name });
            }, 100)}
            styles={{ root: { minWidth: 400, maxWidth: 500 } }}
          />
          <ShareOptions
            copyItem={marketItem}
            dispatch={marketItemDispatch}
            api={api}
          />
          <TextField
            label='Summary'
            defaultValue={copyMarketItem.summary}
            onChange={debounce((_, summary) => {
              marketItemDispatch({ type: 'setSummary', value: summary });
            }, 100)}
          />
          <TextField
            label='Description'
            defaultValue={copyMarketItem.description}
            onChange={debounce((_, desc) => {
              marketItemDispatch({ type: 'setDescription', value: desc });
            }, 100)}
            multiline={true}
            rows={6}
            styles={{ root: { minWidth: 400, maxWidth: 500 } }}
          />
          <DefaultButton
            text='Submit'
            onClick={() => {
              createItem(copyMarketItem);
              hideModal();
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
