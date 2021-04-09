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
import { cloneDeep } from 'lodash';

export const ShareOptions = props => {
  const { state, setState, api } = props;
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

  const optionTypes = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    PROTECTED: 'protected',
  };

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
                  const itemObject = cloneDeep(state.itemObject);
                  if (!itemObject.groupList) {
                    itemObject.groupList = [];
                  }
                  itemObject.groupList = item.selected
                    ? [...itemObject.groupList, item.text]
                    : itemObject.groupList.filter(text => text !== item.text);
                  setState({ itemObject });
                }
              }}
            />
          </Stack>
        );
      },
    },
  ];

  const onChoiceChange = (_, option) => {
    const itemObject = cloneDeep(state.itemObject);
    if (option.key === optionTypes.PUBLIC) {
      itemObject.isPublic = true;
      itemObject.isPrivate = false;
      itemObject.groupList = [];
    } else if (option.key === optionTypes.PRIVATE) {
      itemObject.isPublic = false;
      itemObject.isPrivate = true;
      itemObject.groupList = [];
    } else if (option.key === optionTypes.PROTECTED) {
      itemObject.isPublic = false;
      itemObject.isPrivate = false;
    }
    setState({ itemObject });
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
        defaultSelectedKey={optionTypes.PRIVATE}
        options={options}
        onChange={onChoiceChange}
      />
    </>
  );
};

ShareOptions.propTypes = {
  state: PropTypes.object,
  setState: PropTypes.func,
  api: PropTypes.string,
};
