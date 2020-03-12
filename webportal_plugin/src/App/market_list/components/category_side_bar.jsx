
import React, { useContext, useCallback } from 'react';
import { Stack, Text, Checkbox, FontWeights } from 'office-ui-fabric-react';

import Context from '../../context';
import Filter from '../../filter';

export const CategorySideBar = () => {
  const { filter, setFilter } = useContext(Context);

  const changeCustomCheckbox = useCallback((event, isChecked) => {
    const { keyword, authors, official } = filter;
    if (isChecked) {
      setFilter(new Filter(keyword, authors, true, official));
    } else {
      setFilter(new Filter(keyword, authors, false, official));
    }
  });

  const changeOfficialCheckbox = useCallback((event, isChecked) => {
    const { keyword, authors, custom } = filter;
    if (isChecked) {
      setFilter(new Filter(keyword, authors, custom, true));
    } else {
      setFilter(new Filter(keyword, authors, custom, false));
    }
  });

  return (
    <Stack gap='m'>
      <Text
        styles={{
          root: {
            fontSize: 16,
            fontWeight: FontWeights.semibold,
          },
        }}
      >
        Filter
      </Text>
      <Text
        styles={{
          root: {
            fontSize: 14,
            fontWeight: FontWeights.regular,
          },
        }}
      > Categories </Text>
      <Checkbox
        label='Custom'
        styles={{
          root: {
            fontSize: 14,
            fontWeight: FontWeights.regular,
          },
        }}
        onChange={changeCustomCheckbox}
      ></Checkbox>
      <Checkbox
        label='OpenPAI Official'
        styles={{
          root: {
            fontSize: 14,
            fontWeight: FontWeights.regular,
          },
        }}
        onChange={changeOfficialCheckbox}
      ></Checkbox>
    </Stack>
  );
};
