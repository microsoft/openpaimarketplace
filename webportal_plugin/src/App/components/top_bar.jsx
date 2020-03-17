import React, { useState, useContext } from "react";
import {
  Stack,
  CommandButton,
  DefaultButton,
  ActionButton,
  FontWeights,
  getTheme
} from "office-ui-fabric-react";

import CreateItemDialog from "./create_item_dialog";
import JobList from "./job_list";
import Context from "App/context";

export const TopBar = React.memo(props => {
  const { spacing, palette } = getTheme();
  const { pageType, status } = props;
  const { history } = useContext(Context);
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
        {pageType === "detail" && status === "approved" && (
          <ActionButton
            iconProps={{ iconName: "revToggleKey" }}
            onClick={() => {
              history.push("/");
            }}
          >
            Back to market list
          </ActionButton>
        )}
        {pageType === "detail" && status === "pending" && (
          <ActionButton
            iconProps={{ iconName: "revToggleKey" }}
            onClick={() => {
              history.push("/?status=pending");
            }}
          >
            Back to pending list
          </ActionButton>
        )}
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
      <JobList
        hideDialog={hideJobListDialog}
        setHideDialog={setHideJobListDialog}
      />
    </Stack>
  );
});
