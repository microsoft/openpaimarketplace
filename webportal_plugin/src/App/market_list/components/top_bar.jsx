import React, { useState } from "react";
import { Stack, CommandButton, FontWeights } from "office-ui-fabric-react";

import CreateItemDialog from "./create_item_dialog";

export const TopBar = React.memo(() => {
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
      <Stack horizontal horizontalAlign="begin">
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
