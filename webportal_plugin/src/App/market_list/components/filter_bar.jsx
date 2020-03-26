import { isNil, isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import {
  getTheme,
  CommandBarButton,
  SearchBox,
  Stack,
  FontWeights,
} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';

import FilterButton from './filter_button';
import Filter from '../../models/filter';

export const FilterBar = props => {
  const { spacing } = getTheme();
  const { itemList, filteredItems, filter, setFilter } = props;

  const changeKeyword = useCallback(keyword => {
    const { authors, custom, official } = filter;
    setFilter(new Filter(keyword, authors, custom, official));
  });

  // get distinct authors from all
  var allAuthors = [];
  if (!isNil(itemList)) {
    allAuthors = itemList.map(item => {
      return item.author;
    });
  }
  const authorItems = Array.from(new Set(allAuthors));

  // delete all authors
  const clickCancel = useCallback(() => {
    const { keyword, custom, official } = filter;
    setFilter(new Filter(keyword, new Set(), custom, official));
  });

  return (
    <Stack>
      <Stack horizontal verticalAlign='stretch' horizontalAlign='space-between'>
        <SearchBox
          underlined={true}
          placeholder='Search'
          styles={{
            root: {
              fontSize: 14,
              fontWeight: FontWeights.regular,
            },
          }}
          onChange={changeKeyword}
        />
        <Stack horizontal>
          <FilterButton
            styles={{ root: { backgroundColor: 'transparent' } }}
            text='Author'
            iconProps={{ iconName: 'Contact' }}
            items={authorItems}
            selectedItems={Array.from(filter.authors)}
            onSelect={authors => {
              const { keyword, custom, official } = filter;
              const authorsFilter = new Set(authors);
              setFilter(new Filter(keyword, authorsFilter, custom, official));
            }}
            searchBox
            clearButton
          />
          <CommandBarButton
            styles={{
              root: { backgroundColor: 'transparent', height: '100%' },
            }}
            iconProps={{ iconName: 'Cancel' }}
            onClick={clickCancel}
          />
        </Stack>
      </Stack>
      {!isNil(filteredItems) && !isEmpty(filteredItems) && (
        <Stack
          padding={spacing.s2}
          styles={{
            root: {
              fontSize: 14,
              fontWeight: FontWeights.regular,
            },
          }}
        >
          {filteredItems.length} results
        </Stack>
      )}
    </Stack>
  );
};

FilterBar.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.object),
  filteredItems: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};
