import React, { useState } from "react";
import {
  Stack,
  CommandButton,
  DefaultButton,
  FontWeights,
  getTheme
} from "office-ui-fabric-react";

import CreateItemDialog from "./create_item_dialog";

export const TopBar = React.memo(props => {
  const { spacing, palette } = getTheme();
  const { status, setStatus } = props;
  const [hideCreateDialog, setHideCreateDialog] = useState(true);
  const [hideJobListDialog, setHideJobListDialog] = useState(true);
  const menuProps = {
    items: [
      {
        key: "new",
        text: "New",
        onClick() {
          setHideCreateDialog(false);
        }
      },
      {
        key: "myJob",
        text: "From my jobs",
        onClick() {
          setHideJobListDialog(false);
        }
      }
    ]
  };

  return (
    <Stack>
      <Stack horizontal horizontalAlign="begin" verticalAlign="baseline">
        <CommandButton
          text="Create"
          iconProps={{ iconName: "Add" }}
          menuProps={menuProps}
          styles={{
            root: {
              fontSize: 14,
              fontWeight: FontWeights.regular
            }
          }}
        />
        <DefaultButton
          text={"Pending approvals"}
          iconProps={
            status === "pending"
              ? { iconName: "BulletedList" }
              : { iconName: "checkList" }
          }
          styles={{
            root: {
              fontSize: 14,
              fontWeight: FontWeights.regular,
              backgroundColor:
                status === "pending"
                  ? `${palette.neutralQuaternary}`
                  : `${palette.neutralLighter}`
            }
          }}
          onClick={() => {
            status === "pending" ? setStatus("approved") : setStatus("pending");
          }}
        />
      </Stack>
      <CreateItemDialog
        hideDialog={hideCreateDialog}
        setHideDialog={setHideCreateDialog}
      />
      {/* <SuccessJobsDialog
        hideDialog={hideJobListDialog}
        setHideDialog={setHideJobListDialog}
        api={api}
      /> */}
    </Stack>
  );
});
