import React, { useContext } from "react";
import {
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogFooter,
  DialogType,
  FontClassNames,
  FontSizes,
  FontWeights,
  Text
} from "office-ui-fabric-react";

import { approveItem, rejectItem } from "App/utils/marketplace_api";
import Context from "App/market_detail/context";

const ConfirmDialog = props => {
  const { hideDialog, setHideDialog, action, inDetail, itemId } = props;
  const { history } = useContext(Context);

  async function approve(itemId) {
    try {
      setHideDialog(true);
      const result = await approveItem(itemId);
      if (inDetail) {
        history.push("/");
      } else {
        window.location.reload(true);
      }
    } catch (err) {
      alert(err);
    }
  }

  async function reject(itemId) {
    try {
      setHideDialog(true);
      const result = await rejectItem(itemId);
      if (inDetail) {
        history.push("/");
      } else {
        window.location.reload(true);
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
                fontWeight: FontWeights.semibold
              }
            }}
          >
            {`${action} Item`}
          </Text>
        ),
        subText: (
          <span className={FontClassNames.medium}>
            {`Do you want to ${action} this market item?`}
          </span>
        )
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 450 } }
      }}
    >
      <DialogFooter>
        <PrimaryButton
          onClick={async () => {
            if (action === "approve") {
              approve(itemId);
            } else {
              reject(itemId);
            }
          }}
          text="Confirm"
        />
        <DefaultButton onClick={closeDialog} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialog;
