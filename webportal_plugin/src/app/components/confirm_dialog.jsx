// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useContext } from 'react';
import {
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogFooter,
  DialogType,
  FontClassNames,
  FontSizes,
  FontWeights,
  Text,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';

import { approveItem, rejectItem } from 'App/utils/marketplace_api';
import Context from 'App/context';

const ConfirmDialog = props => {
  const { hideDialog, setHideDialog, action, pageType, itemId } = props;
  const { history } = useContext(Context);

  async function approve(itemId) {
    try {
      setHideDialog(true);
      await approveItem(itemId);
      if (pageType === 'detail') {
        history.push('/');
      } else {
        history.push('/empty');
        history.replace('/');
      }
    } catch (err) {
      alert(err);
    }
  }

  async function reject(itemId) {
    try {
      setHideDialog(true);
      await rejectItem(itemId);
      if (pageType === 'detail') {
        history.push('/?status=pending');
      } else {
        history.push('/empty');
        history.replace('/?status=pending');
      }
    } catch (err) {
      alert(err);
    }
  }

  function closeDialog() {
    setHideDialog(true);
  }

  return (
    <Dialog
      hidden={hideDialog}
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
            {`${action} Item`}
          </Text>
        ),
        subText: (
          <span className={FontClassNames.medium}>
            {`Do you want to ${action} this market item?`}
          </span>
        ),
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 450 } },
      }}
    >
      <DialogFooter>
        <PrimaryButton
          onClick={async () => {
            if (action === 'approve') {
              approve(itemId);
            } else {
              reject(itemId);
            }
          }}
          text='Confirm'
        />
        <DefaultButton onClick={closeDialog} text='Cancel' />
      </DialogFooter>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  hideDialog: PropTypes.bool,
  setHideDialog: PropTypes.func,
  action: PropTypes.string,
  pageType: PropTypes.string,
  itemId: PropTypes.string,
};

export default ConfirmDialog;
