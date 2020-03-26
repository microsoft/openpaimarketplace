import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
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

import Context from '../../context';
import { MARKETPLACE_API } from '../../utils/constants';

export default function CreateItemDialog(props) {
  const { hideDialog, setHideDialog, marketItem } = props;
  const { history } = useContext(Context);

  const onConfirm = async () => {
    setHideDialog(true);

    const itemId = await createMarketItem(marketItem);
    history.push(`/market_detail?itemId=${itemId}`);
  };

  const closeDialog = useCallback(() => {
    setHideDialog(true);
  });

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
            {`Publish`}
          </Text>
        ),
        subText: (
          <span className={FontClassNames.medium}>
            Are you sure to publish this item? You will receive an email
            notification once admin approves it.
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

  async function createMarketItem(marketItem) {
    const url = `${MARKETPLACE_API}/items`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: marketItem.name,
        author: marketItem.author,
        category: marketItem.category,
        introduction: marketItem.introduction,
        description: marketItem.description,
        jobConfig: marketItem.jobConfig,
        tags: marketItem.tags,
        status: marketItem.status,
      }),
    });
    if (res.ok) {
      const result = await res.json();
      return result.id;
    } else {
      throw new Error(res.statusText);
    }
  }
}

CreateItemDialog.propTypes = {
  hideDialog: PropTypes.bool.isRequired,
  setHideDialog: PropTypes.func.isRequired,
  marketItem: PropTypes.object,
};
