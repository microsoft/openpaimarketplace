import { isNil, isEmpty } from 'lodash';
import React, { useContext, useCallback } from 'react';
import {
  getTheme,
  ColorClassNames,
  CommandBarButton,
  SearchBox,
  Stack,
  FontWeights,
} from 'office-ui-fabric-react';

import FilterButton from './filter_button';
import Context from '../context';
import Filter from '../filter';

export const FilterBar = () => {
  const { spacing } = getTheme();

  const { itemList, filteredItems, filter, setFilter } = useContext(Context);

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
      <Stack
        horizontal
        verticalAlign='stretch'
        horizontalAlign='space-between'
      >
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
          }}>
          {filteredItems.length} results
        </Stack>
      )}
    </Stack>
  );
};
