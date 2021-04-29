// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, Text, TooltipHost, ActionButton } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateItem } from 'App/utils/marketplace_api';
import { listGroups } from 'App/utils/pai_api';

export const AccessInfo = props => {
  const { marketItem, marketItemDispatch, api } = props;
  const [selection, setSelection] = useState({});
  const [groupList, setGroupList] = useState([]);

  const onToggleSelect = React.useCallback(
    (ev, item) => {
      ev && ev.preventDefault();
      if (item) {
        const newSelection = {
          ...selection,
          [item.key]:
            selection[item.key] === undefined ? true : !selection[item.key],
        };
        setSelection(newSelection);
      }
    },
    [selection],
  );

  function getGroupListOptions() {
    const options = [];
    for (const group of groupList) {
      options.push({
        key: group.groupname,
        text: group.groupname,
        canCheck: true,
        isChecked: selection[group.groupname],
        onClick: onToggleSelect,
      });
    }
    return options;
  }

  useEffect(() => {
    const getGroupList = async () => {
      const groups = await listGroups(api);
      setGroupList(groups);
    };
    getGroupList();
  }, []);

  let groupListInfo = marketItem.groupList.toString();
  if (groupListInfo === '') {
    groupListInfo = 'No group is shared currently';
  }

  function accessInfoText() {
    if (marketItem.isPublic === true) {
      return 'Public';
    } else if (marketItem.isPrivate === true) {
      return 'Private';
    } else {
      return 'Protected';
    }
  }

  const optionTypes = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    PROTECTED: 'protected',
  };

  function update(item) {
    marketItemDispatch({
      type: 'updateItem',
      value: item,
    });
    const newItem = { ...marketItem, ...item };
    updateItem(
      {
        ...newItem,
        protocol: JSON.stringify(newItem.protocol),
      },
      newItem.itemId,
    ).catch(err => {
      alert(err);
    });
  }

  function getSelectedGroups() {
    const groups = [];
    for (const [key, value] of Object.entries(selection)) {
      if (value) {
        groups.push(key);
      }
    }
    return groups;
  }

  const options = React.useMemo(
    () => [
      {
        key: optionTypes.PRIVATE,
        text: 'Private',
        onClick: () => {
          update({ isPrivate: true, isPublic: false, groupList: [] });
        },
      },
      {
        key: optionTypes.PUBLIC,
        text: 'Public',
        onClick: () => {
          update({ isPublic: true, isPrivate: false, groupList: [] });
        },
      },
      {
        key: optionTypes.PROTECTED,
        text: 'Protected',
        subMenuProps: {
          items: getGroupListOptions(),
        },
        split: true,
        onClick: () => {
          update({
            isPublic: false,
            isPrivate: false,
            groupList: getSelectedGroups(),
          });
        },
      },
    ],
    [groupList, selection, onToggleSelect],
  );

  return (
    <TooltipHost
      calloutProps={{
        isBeakVisible: false,
      }}
      delay={0}
      tooltipProps={{
        onRenderContent: () => {
          return (
            <Stack gap='m'>
              <Text>Access Info</Text>
              {marketItem.isPublic === false && marketItem.isPrivate === false && (
                <Stack gap='s1'>
                  <Text variant={'small'}>Share-to groups:</Text>
                  <Text>{groupListInfo}</Text>
                </Stack>
              )}
            </Stack>
          );
        },
      }}
    >
      <Stack horizontal gap='s1'>
        <ActionButton
          menuProps={{ shouldFocusOnMout: true, items: options }}
          styles={{
            root: { height: '18px', borderWidth: '0px', padding: '0px' },
          }}
        >
          {accessInfoText()}
        </ActionButton>
      </Stack>
    </TooltipHost>
  );
};

AccessInfo.propTypes = {
  marketItem: PropTypes.object,
  marketItemDispatch: PropTypes.func,
  api: PropTypes.string,
};
