// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import yaml from 'js-yaml';
import { DefaultButton } from 'office-ui-fabric-react';

import Page from 'App/components/page';
import { createMarketItem } from 'App/utils/marketplace_api';
import TopBar from '../market_detail/components/top_bar';
import TemplateDetail from '../market_detail/components/template_detail';
import DataDetail from '../market_detail/components/data_detail';
import Context from 'App/context';
import HorizontalLine from 'App/components/horizontal_line';
import YamlFileRender from 'App/components/yaml_file_render';
import CreateSummary from './create_summary';

const UploadYaml = props => {
  const { api, user, token, isAdmin, routeProps } = props;
  const [loadYamlError, setLoadYamlError] = useState(null);

  const [itemProtocol, setItemProtocol] = useState(null);
  const [itemObject, setItemObject] = useState({
    summary: '',
    type: '',
  });
  const [step, setStep] = useState('upload');

  const onDrop = useCallback(files => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      try {
        setItemProtocol(yaml.safeLoad(reader.result));
        setStep('summary');
      } catch (err) {
        setLoadYamlError(err.message);
      }
    };
    reader.readAsText(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const submit = () => {
    createMarketItem({
      ...itemObject,
      ...{
        name: itemProtocol.name,
        author: user,
        categories: itemProtocol.categories,
        protocol: yaml.safeDump(itemProtocol),
        status: 'approved',
      },
    })
      .then(id => {
        window.location.href = `${window.location.href.slice(
          0,
          window.location.href.lastIndexOf('/'),
        )}market_detail?itemId=${id}`;
      })
      .catch(err => {
        throw err;
      });
  };

  const context = {
    user,
    api,
    token,
    isAdmin,
    history: routeProps.history,
    itemProtocol,
    setItemProtocol,
    itemObject,
    setItemObject,
  };

  return (
    <Context.Provider value={context}>
      <Page>
        <TopBar />
        <HorizontalLine />
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag and drop file here, or click to select files</p>
          )}
        </div>
        {loadYamlError !== null && <p>{loadYamlError}</p>}
        {step === 'summary' && (
          <>
            <CreateSummary
              user={user}
              itemProtocol={itemProtocol}
              setItemProtocol={setItemProtocol}
              itemObject={itemObject}
              setItemObject={setItemObject}
            />
            <DefaultButton text='Next' onClick={() => setStep('detail')} />
          </>
        )}
        {step === 'detail' &&
          (itemObject.type === 'data' ? (
            <>
              <DataDetail marketItem={{ protocol: itemProtocol }} />
              <DefaultButton text='Submit' onClick={submit} />
            </>
          ) : (
            <>
              <TemplateDetail marketItem={{ protocol: itemProtocol }} />
              <DefaultButton text='Submit' onClick={submit} />
            </>
          ))}
        <HorizontalLine />
        {itemProtocol !== null && <YamlFileRender yamlConfig={itemProtocol} />}
      </Page>
    </Context.Provider>
  );
};

UploadYaml.propTypes = {
  api: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
  routeProps: PropTypes.object,
};

export default UploadYaml;
