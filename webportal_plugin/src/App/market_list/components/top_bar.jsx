
import React, { useState, useContext } from "react";
import { Stack, CommandButton, FontWeights } from "office-ui-fabric-react";

import CreateItemDialog from "./create_item_dialog";
import SuccessJobsDialog from "../../success_job_list/components/success_jobs_dialog";
import Context from "../context";

export const TopBar = React.memo(() => {
  const { api } = useContext(Context);
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
      {/* <CreateItemDialog hideDialog={hideCreateDialog} setHideDialog={setHideCreateDialog} /> */}
      <SuccessJobsDialog
        hideDialog={hideJobListDialog}
        setHideDialog={setHideJobListDialog}
        api={api}
      />
    </Stack>
  );
});
