// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
import {
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogType,
  DialogFooter,
  FontClassNames,
  FontSizes,
  FontWeights,
  Text,
} from 'office-ui-fabric-react';

import Context from 'App/context';
import { deleteItem } from '../../utils/marketplace_api';

export default function DeleteMarketItem(props) {
  const { hideDeleteDialog, setHideDeleteDialog, itemId } = props;
  const { history } = useContext(Context);

  async function onConfirm() {
    setHideDeleteDialog(true);
    try {
      await deleteItem(itemId);
      history.push('/');
    } catch (err) {
      alert(err);
    }
  }

  const closeDialog = useCallback(() => {
    setHideDeleteDialog(true);
  });

  return (
    <Dialog
      hidden={hideDeleteDialog}
      onDismiss={closeDialog}
      minWidth={400}
      maxWidth={400}
      dialogContentProps={{
        type: DialogType.normal,
        title: (
          <Text
            styles={{
              root: {
                fontSize: FontSizes.large,
                fontWeight: FontWeights.semibold,
              },
            }}
          >
            Delete Item
          </Text>
        ),
        subText: (
          <span className={FontClassNames.medium}>
            Do you want to delete this market item permanently?
          </span>
        ),
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 450 } },
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={onConfirm} text='Confirm' />
        <DefaultButton onClick={closeDialog} text='Cancel' />
      </DialogFooter>
    </Dialog>
  );
}

DeleteMarketItem.propTypes = {
  hideDeleteDialog: PropTypes.bool.isRequired,
  setHideDeleteDialog: PropTypes.func.isRequired,
  itemId: PropTypes.string,
};
