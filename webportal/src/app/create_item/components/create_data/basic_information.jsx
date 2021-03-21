// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ChoiceGroup,
  DefaultButton,
  Dropdown,
  PrimaryButton,
  Stack,
  Text,
  TextField,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { cloneDeep, isEmpty } from 'lodash';
import { useBoolean } from '@uifabric/react-hooks';
import { createItem } from 'App/utils/marketplace_api';
import generateDataTemplate from './data_template';
import { listGroups } from 'App/utils/pai_api';

const BasicInformationArea = styled.div`
  margin-bottom: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const BasicInformation = props => {
  const { state, setState } = props;
  const [errorMessage, setErrorMessage] = useState(false);
  const [
    advancedDescription,
    { toggle: toggleAdvancedDescription },
  ] = useBoolean(false);

  const [groupListOptions, setGroupListOpptions] = useState([]);
  useEffect(() => {
    const getGroupList = async () => {
      const groups = await listGroups();
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

  const choiceGroupOptions = [
    {
      key: 'public',
      text: 'Public\u00A0\u00A0',
    },
    {
      key: 'private',
      text: 'Private\u00A0\u00A0',
    },
    {
      key: 'shared',
      text: 'Shared\u00A0\u00A0',
      onRenderField: (props, render) => {
        return (
          <Stack horizontal horizontalAlign='space-between'>
            {render(props)}
            <Dropdown
              options={groupListOptions}
              multiSelect
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
            ></Dropdown>
          </Stack>
        );
      },
    },
  ];

  const columnProps = {
    tokens: { childrenGap: 'm' },
    styles: {
      root: {
        minWidth: 300,
        fontSize: FontSizes.mediumPlus,
        fontWeight: FontWeights.semibold,
      },
    },
  };

  const textStyles = {
    fieldGroup: { borderRadius: '5px' },
    subComponentStyles: {
      label: {
        root: {
          fontSize: FontSizes.mediumPlus,
          fontWeight: FontWeights.semibold,
        },
      },
    },
  };

  function generateDescription(state) {
    return (
      `# ${state.itemObject.name}\n\n${state.itemDescription.description}\n\n` +
      (isEmpty(state.itemDescription.getRawData.value) &&
      isEmpty(state.itemDescription.useViaOpenPaiJobSubmition.value) &&
      isEmpty(state.itemDescription.useInTheCode.value)
        ? ''
        : '## About teh dataset\n\n') +
      (isEmpty(state.itemDescription.getRawData.value)
        ? ''
        : `### Get raw data\n\n${state.itemDescription.getRawData.value}\n\n`) +
      (isEmpty(state.itemDescription.useViaOpenPaiJobSubmition.value)
        ? ''
        : `### Use via OpenPAI job submission\n\n${state.itemDescription.useViaOpenPaiJobSubmition.value}\n\n`) +
      (isEmpty(state.itemDescription.useInTheCode.value)
        ? ''
        : `### Use in the code\n\n${state.itemDescription.useInTheCode.value}\n\n`) +
      (isEmpty(state.itemDescription.relatedProject.value)
        ? ''
        : `## Related project\n\n${state.itemDescription.relatedProject.value}\n\n`)
    );
  }

  function submit() {
    const dataTemplateObject = {
      dockerImage: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
      storageType: 'data',
      storageName: 'data',
      storagePath: state.itemObject.dataUrl,
      commands: '',
    };
    state.itemObject.protocol = generateDataTemplate(
      dataTemplateObject,
      state.itemObject,
    );
    createItem(state.itemObject)
      .then(id =>
        setState({
          itemId: id,
          step: 'completed',
        }),
      )
      .catch(err => {
        throw err;
      });
  }

  return (
    <BasicInformationArea>
      <Stack {...columnProps}>
        <TextField
          label='Title'
          required
          value={state.itemObject.name}
          onChange={(event, newValue) => {
            const itemObject = cloneDeep(state.itemObject);
            itemObject.name = newValue;
            setState({ itemObject });
          }}
          errorMessage={
            errorMessage && isEmpty(state.itemObject.name)
              ? 'Please enter name here.'
              : undefined
          }
          styles={textStyles}
        />
        <TextField
          label='Data url'
          required
          value={state.itemObject.dataUrl}
          onChange={(event, newValue) => {
            const itemObject = cloneDeep(state.itemObject);
            itemObject.dataUrl = newValue;
            itemObject.dataType = newValue.startsWith('https://github.com/')
              ? 'github'
              : 'blob';
            setState({ itemObject });
          }}
          styles={textStyles}
        />
        <TextField
          label='Short summary'
          description='(No more than 100 characters)'
          value={state.itemObject.summary}
          onChange={(event, newValue) => {
            const itemObject = cloneDeep(state.itemObject);
            itemObject.summary = newValue;
            setState({ itemObject });
          }}
          errorMessage={
            errorMessage && isEmpty(state.itemObject.summary)
              ? 'Please enter summary here.'
              : undefined
          }
          styles={textStyles}
        />
        <TextField
          label='Description'
          multiline={true}
          rows={2}
          value={state.itemDescription.description}
          onChange={(event, newValue) => {
            const itemDescription = cloneDeep(state.itemDescription);
            itemDescription.description = newValue;
            setState({ itemDescription });
          }}
          errorMessage={
            errorMessage && isEmpty(state.itemDescription.description)
              ? 'Please enter description here.'
              : undefined
          }
          styles={textStyles}
        />
        {advancedDescription && (
          <>
            <TextField
              label={state.itemDescription.getRawData.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.getRawData.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.getRawData.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.getRawData.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.useViaOpenPaiJobSubmition.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.useViaOpenPaiJobSubmition.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.useViaOpenPaiJobSubmition.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={
                state.itemDescription.useViaOpenPaiJobSubmition.placeholder
              }
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.useInTheCode.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.useInTheCode.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.useInTheCode.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.useInTheCode.placeholder}
              styles={textStyles}
            />
            <TextField
              label={state.itemDescription.relatedProject.label}
              multiline={true}
              rows={5}
              value={state.itemDescription.relatedProject.value}
              onChange={(event, newValue) => {
                const itemDescription = cloneDeep(state.itemDescription);
                itemDescription.relatedProject.value = newValue;
                setState({ itemDescription });
              }}
              placeholder={state.itemDescription.relatedProject.placeholder}
              styles={textStyles}
            />
          </>
        )}
        <Stack horizontal horizontalAlign='space-between'>
          <Text>*Please follow the Markdown syntax to fill the contents.</Text>
          <DefaultButton
            iconProps={{
              iconName: advancedDescription ? 'ChevronUp' : 'ChevronDown',
            }}
            onClick={toggleAdvancedDescription}
          >
            Advanced
          </DefaultButton>
        </Stack>
      </Stack>
      <ChoiceGroup
        styles={{ flexContainer: { display: 'flex' } }}
        defaultSelectedKey='public'
        options={choiceGroupOptions}
        onChange={(_, option) => {
          const itemObject = cloneDeep(state.itemObject);
          if (option.key === 'public') {
            itemObject.public = true;
            itemObject.private = false;
          } else if (option.key === 'private') {
            itemObject.public = false;
            itemObject.private = true;
          } else {
            itemObject.public = false;
            itemObject.private = false;
          }
          setState({ itemObject });
        }}
      />
      <Stack
        horizontal
        horizontalAlign='space-between'
        gap='l1'
        styles={{
          root: {
            marginTop: '10px',
          },
        }}
      >
        <DefaultButton
          text='Back'
          onClick={() => {
            setErrorMessage(false);
            setState({ step: 'selectType' });
          }}
        />
        <PrimaryButton
          text='Next'
          onClick={() => {
            if (
              isEmpty(state.itemObject.name) ||
              isEmpty(state.itemObject.type) ||
              isEmpty(state.itemObject.dataUrl)
            ) {
              setErrorMessage(true);
              alert('please enter all required fields.');
            } else {
              setErrorMessage(false);
              state.itemObject.description = generateDescription(state);
              setState({
                step: 'detail',
                itemObject: state.itemObject,
              });
              submit();
            }
          }}
        />
      </Stack>
    </BasicInformationArea>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
  itemDescription: PropTypes.object,
};

export default BasicInformation;
