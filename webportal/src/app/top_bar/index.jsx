// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useEffect, useState, useContext } from 'react';
import {
  Stack,
  CommandButton,
  ActionButton,
  FontWeights,
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';

import CreateDialog from './components/create_dialog';
import JobListDialog from './components/job_list_dialog';
import Context from 'App/context';

export const TopBar = React.memo(props => {
  const { pageType, status } = props;
  const { history } = useContext(Context);
  const [hideCreateDialog, setHideCreateDialog] = useState(true);
  const [hideJobListDialog, setHideJobListDialog] = useState(true);
  const [itemCreated, setItemCreated] = useState(false);
  const [jobConfig, setJobConfig] = useState(null);

  useEffect(() => {
    if (hideCreateDialog) {
      setJobConfig(null);
    }
  }, [hideCreateDialog]);

  const menuProps = {
    items: [
      {
        key: 'new',
        text: 'New',
        onClick() {
          setHideCreateDialog(false);
        },
      },
      {
        key: 'myJob',
        text: 'From my jobs',
        onClick() {
          setHideJobListDialog(false);
        },
      },
    ],
  };

  return (
    <Stack>
      <Stack horizontal horizontalAlign='begin' verticalAlign='baseline'>
        {pageType === 'detail' && status === 'approved' && (
          <ActionButton
            iconProps={{ iconName: 'revToggleKey' }}
            onClick={() => {
              history.push('/');
            }}
          >
            Back to market list
          </ActionButton>
        )}
        {pageType === 'detail' && status === 'pending' && (
          <ActionButton
            iconProps={{ iconName: 'revToggleKey' }}
            onClick={() => {
              history.push('/?status=pending');
            }}
          >
            Back to pending list
          </ActionButton>
        )}
        <CommandButton
          text='Create'
          iconProps={{ iconName: 'Add' }}
          menuProps={menuProps}
          styles={{
            root: {
              fontSize: 14,
              fontWeight: FontWeights.regular,
            },
          }}
        />
      </Stack>
      {itemCreated && (
        <MessageBar
          onDismiss={() => {
            setItemCreated(false);
          }}
          dismissButtonAriaLabel='Close'
          messageBarType={MessageBarType.success}
          isMultiline={false}
        >
          You have successfully submitted a marketplace item. Please wait for
          admin to review.
        </MessageBar>
      )}
      {!hideCreateDialog && (
        <CreateDialog
          setHideCreateDialog={setHideCreateDialog}
          setItemCreated={setItemCreated}
          initJobConfig={jobConfig}
        />
      )}
      {!hideJobListDialog && (
        <JobListDialog
          setHideListDialog={setHideJobListDialog}
          setHideCreateDialog={setHideCreateDialog}
          setItemCreated={setItemCreated}
          setJobConfig={setJobConfig}
        />
      )}
    </Stack>
  );
});

TopBar.propTypes = {
  pageType: PropTypes.string,
  status: PropTypes.string,
};
