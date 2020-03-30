// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { TextField, Stack, Icon, FontWeights } from 'office-ui-fabric-react';
import { FontClassNames, getTheme } from '@uifabric/styling';
import styled from 'styled-components';
import { isNil } from 'lodash';

const { spacing, palette } = getTheme();

const TagCard = styled.div`
  padding: ${spacing.s};
  background: ${palette.neutralLighter};
`;

export const TagBar = props => {
  const { tags, setTags } = props;
  const [editingTag, setEditingTag] = useState('');

  const deleteTagCliked = useCallback(tagToDelete => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  });

  const addTagCliked = useCallback(e => {
    // check empty
    if (editingTag === '') {
      return;
    }
    // check tag duplicates
    if (tags.includes(editingTag)) {
      alert('duplicated tags');
      setEditingTag('');
      return;
    }
    setTags([...tags, editingTag]);
    setEditingTag('');
  });

  return (
    <Stack horizontal gap='s1' verticalAlign='center'>
      {tags.map(tag => {
        return (
          <TagCard key={tag}>
            <Stack horizontal>
              <div
                className={FontClassNames.small}
                style={{
                  padding: spacing.s1,
                  fontSize: 14,
                  fontWeight: FontWeights.regular,
                }}
              >
                #{tag}
              </div>
              {!isNil(setTags) && (
                <button
                  onClick={() => deleteTagCliked(tag)}
                  style={{ border: 'none' }}
                >
                  <Icon iconName='Cancel' />
                </button>
              )}
            </Stack>
          </TagCard>
        );
      })}
      {!isNil(setTags) && (
        <Stack horizontal>
          <TextField
            value={editingTag}
            styles={{ fieldGroup: { width: 80 } }}
            onChange={e => {
              setEditingTag(e.target.value);
            }}
          />
          <button
            onClick={addTagCliked}
            style={{ backgroundColor: 'Transparent', border: 'none' }}
          >
            <Icon iconName='Add' />
          </button>
        </Stack>
      )}
    </Stack>
  );
};

TagBar.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func,
};
