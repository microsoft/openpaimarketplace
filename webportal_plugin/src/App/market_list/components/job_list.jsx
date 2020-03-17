import React, { useCallback, useState, useContext } from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  Stack,
  FontClassNames,
  FontWeights
} from "office-ui-fabric-react";
import c from "classnames";

import t from "../../components/tachyons.scss";

const JobList = props => {
  const { hideDialog, setHideDialog } = props;

  function publishItem() {
    setHideDialog(true);
  }

  function closeDialog() {
    setHideDialog(true);
  }

  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={closeDialog}
      minWidth={800}
      maxWidth={2000}
      dialogContentProps={{
        styles: {
          title: { padding: "20px 36px 12px 20px" },
          inner: { padding: "0px 40px 20px 20px" },
          topButton: { padding: "20px 20px 0px 0px" }
        },
        title: (
          <span
            className={c(t.mb2, t.fw6, FontClassNames.semibold)}
            style={{
              fontSize: 16,
              fontWeight: FontWeights.semibold
            }}
          >
            Success Job List
          </span>
        ),
        type: DialogType.normal,
        showCloseButton: false
      }}
      modalProps={{
        isBlocking: true
      }}
    >
      {/* <Stack styles={{ root: { height: "100%", minHeight: 500 } }}>
        <SuccessJobList />}
      </Stack> */}
      <DialogFooter>
        <PrimaryButton onClick={publishItem} text="Publish" />
        <DefaultButton onClick={closeDialog} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

export default JobList;
