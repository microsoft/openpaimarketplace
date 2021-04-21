// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Label,
  ChoiceGroup,
  Dropdown,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import { listGroups } from 'App/utils/pai_api';

const optionTypes = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  PROTECTED: 'protected',
};

function getOptionTypes(item) {
  if (item.isPrivate) {
    return optionTypes.PRIVATE;
  } else if (item.isPublic) {
    return optionTypes.PUBLIC;
  } else {
    return optionTypes.PROTECTED;
  }
}

export const ShareOptions = props => {
  const { marketItem, dispatch, api } = props;
  var groupList = marketItem.groupList;

  const [groupListOptions, setGroupListOpptions] = useState([]);
  useEffect(() => {
    const getGroupList = async () => {
      const groups = await listGroups(api);
      const options = [];
      for (const [index, group] of groups.entries()) {
        options.push({
          key: index.toString(),
          text: group.groupname,
        });
      }
      setGroupListOpptions(options);
    };
    getGroupList();
  }, []);

  const options = [
    { key: optionTypes.PRIVATE, text: 'Private' },
    { key: optionTypes.PUBLIC, text: 'Public' },
    {
      key: optionTypes.PROTECTED,
      text: 'Protected',
      onRenderField: (props, render) => {
        return (
          <Stack
            horizontal
            verticalAlign='center'
            horizontalAlign='space-between'
            gap='s1'
          >
            {render(props)}
            <Dropdown
              placeholder='Select groups to share'
              options={groupListOptions}
              multiSelect
              // eslint-disable-next-line
              disabled={props ? !props.checked : false}
              styles={{ root: { minWidth: 200, maxWidth: 300 } }}
              onChange={(_, item) => {
                if (item) {
                  if (!groupList) {
                    groupList = [];
                  }
                  groupList = item.selected
                    ? [...groupList, item.text]
                    : groupList.filter(text => text !== item.text);
                  dispatch({ type: 'setGroupList', value: groupList });
                }
              }}
            />
          </Stack>
        );
      },
    },
  ];

  const onChoiceChange = (_, option) => {
    if (option.key === optionTypes.PUBLIC) {
      dispatch({ type: 'setPublic' });
    } else if (option.key === optionTypes.PRIVATE) {
      dispatch({ type: 'setPrivate' });
    } else if (option.key === optionTypes.PROTECTED) {
      dispatch({ type: 'setGroupList', value: groupList });
    }
  };

  return (
    <>
      <Label
        required
        styles={{
          root: {
            fontSize: FontSizes.mediumPlus,
            fontWeight: FontWeights.semibold,
          },
        }}
      >
        Share Option
      </Label>
      <ChoiceGroup
        defaultSelectedKey={getOptionTypes(marketItem)}
        options={options}
        onChange={onChoiceChange}
      />
    </>
  );
};

ShareOptions.propTypes = {
  marketItem: PropTypes.object,
  dispatch: PropTypes.func,
  api: PropTypes.string,
};
