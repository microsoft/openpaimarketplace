
import React, { useState, useCallback } from 'react';
import { DefaultButton, Stack, Text } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';


import { JobProtocol } from '../models/job-protocol';

const ImportYamlFile = props => {
  const { setYamlText } = props;
  const [yamlFileName, setYamlFileName] = useState('');
  const uploadFile = React.createRef();

  const importFile = useCallback(event => {
    event.preventDefault();
    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const text = String(fileReader.result);
      const valid = JobProtocol.validateFromYaml(text);
      if (valid) {
        alert(`Yaml file is invalid. ${valid}`);
        return;
      }
      setYamlText(text);
      setYamlFileName(files[0].name);
    });
    fileReader.readAsText(files[0]);
  });

  return (
    <div>
      <Stack horizontal verticalAlign='baseline' gap='m'>
        <DefaultButton
          text='Upload yaml file'
          onClick={() => {
            uploadFile.current.click();
          }}
        />
        <Text>{yamlFileName}</Text>
      </Stack>
      <input
        type='file'
        ref={uploadFile}
        accept='.yml,.yaml'
        style={{ display: 'none' }}
        onChange={importFile}
      />
    </div>
  );
};

ImportYamlFile.propTypes = {
  setYamlText: PropTypes.func,
};

export default ImportYamlFile;
