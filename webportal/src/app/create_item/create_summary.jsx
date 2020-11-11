// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import PropTypes from 'prop-types';
import { Stack, TextField } from 'office-ui-fabric-react';

const CreateSummary = props => {
  const {
    user,
    itemProtocol,
    setItemProtocol,
    itemObject,
    setItemObject,
  } = props;

  const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { minWidth: 300 } },
  };

  return (
    <Stack {...columnProps}>
      <TextField
        label='Title:'
        value={itemProtocol.name}
        onChange={(event, newValue) => {
          itemProtocol.name = newValue;
          setItemProtocol(itemProtocol);
        }}
      />
      <TextField label='Auther:' readOnly={true} value={user} />
      <TextField
        label='type:'
        value={itemObject.type}
        onChange={(event, newValue) => {
          itemObject.type = newValue;
          setItemObject(itemObject);
        }}
      />
      <TextField
        label='Short summary:'
        value={itemObject.summary}
        onChange={(event, newValue) => {
          itemObject.summary = newValue;
          setItemObject(itemObject);
        }}
      />
      <TextField
        label='Description:'
        multiline={true}
        rows={10}
        value={itemProtocol.description}
        onChange={(event, newValue) => {
          itemProtocol.description = newValue;
          setItemProtocol(itemObject);
        }}
      />
    </Stack>
  );
};

CreateSummary.propTypes = {
  user: PropTypes.string,
  itemProtocol: PropTypes.object,
  setItemProtocol: PropTypes.func,
  itemObject: PropTypes.object,
  setItemObject: PropTypes.func,
};

export default CreateSummary;
