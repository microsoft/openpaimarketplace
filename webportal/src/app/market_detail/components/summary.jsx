// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultButton,
  PrimaryButton,
  Stack,
  Text,
  TextField,
  getTheme,
  Icon,
  IconButton,
  TooltipHost,
} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize, debounce, isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import { saveAs } from 'file-saver';
import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as JobIcon } from 'App/assets/job.svg';
import VerticalLine from 'App/components/vertical_line';
import { generateJobProtocol } from '../utils/generate_job_protocol';
import { getFileName } from 'App/utils/file_name_util';
import Context from 'App/context';
import { TYPE_ENUM } from 'App/utils/constants';
import { deleteItem, updateItem } from 'App/utils/marketplace_api';
import { AccessInfo } from 'App/market_detail/components/access_info';
import { CopyPopup } from 'App/market_detail/components/copy_popup';
import { EditPopup } from 'App/market_detail/components/edit_popup';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

export default function Summary(props) {
  const { marketItem, marketItemDispatch, api } = props;
  const { user, token, isAdmin, history } = useContext(Context);
  const [
    isCopyPopupOpen,
    { setTrue: showCopyPopup, setFalse: hideCopyPopup },
  ] = useBoolean(false);
  const [
    isEditPopupOpen,
    { setTrue: showEditPopup, setFalse: hideEditPopup },
  ] = useBoolean(false);
  const [
    isEditingName,
    { setTrue: setIsEditingNameTrue, setFalse: setIsEditingNameFalse },
  ] = useBoolean(false);
  const [
    isEditingSummary,
    { setTrue: setIsEditingSummaryTrue, setFalse: setIsEditingSummaryFalse },
  ] = useBoolean(false);
  const [
    itemUpdate,
    { setTrue: setItemUpdateTrue, setFalse: setItemUpdateFalse },
  ] = useBoolean(false);
  const [
    emptyNameError,
    { setTrue: showEmptyNameError, setFalse: hideEmptyNameError },
  ] = useBoolean(false);

  function update() {
    if (itemUpdate) {
      if (isEmpty(marketItem.name)) {
        setIsEditingNameTrue();
      } else {
        updateItem(
          {
            ...marketItem,
            protocol: JSON.stringify(marketItem.protocol),
          },
          marketItem.itemId,
        )
          .then(() => {
            setItemUpdateFalse();
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }

  async function clickUse() {
    try {
      const jobProtocol = await generateJobProtocol(
        marketItem,
        user,
        marketItem.useBlob,
      );
      window.localStorage.removeItem('marketItem');
      window.localStorage.setItem('marketItem', JSON.stringify(jobProtocol));
      window.location.href = `/submit.html`;
    } catch (err) {
      alert(err.message);
    }
  }

  const menuProps = {
    items: [
      {
        key: 'copyItem',
        text: 'Copy',
        iconProps: { iconName: 'Copy' },
        onClick: showCopyPopup,
      },
      {
        key: 'editItem',
        text: 'Edit',
        iconProps: { iconName: 'Edit' },
        disabled: !isAdmin && user !== marketItem.author,
        onClick: showEditPopup,
      },
      {
        key: 'deleteItem',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
        disabled: !isAdmin && user !== marketItem.author,
        onClick: () => {
          if (confirm('Are you sure you want to delete this item?')) {
            deleteItem(marketItem.id, { user, token, isAdmin })
              .then(() => history.push('/'))
              .catch(err => alert(err.message));
          }
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Stack gap={'l1'}>
        <Stack horizontal horizontalAlign='space-between'>
          <Stack horizontal verticalAlign='center' gap='l2'>
            {marketItem.type === TYPE_ENUM.DATA_TEMPLATE && <DataIcon />}
            {marketItem.type === TYPE_ENUM.JOB_TEMPLATE && <JobIcon />}
            {marketItem.type === TYPE_ENUM.OLD_TEMPLATE && <JobIcon />}
            <Stack gap='m'>
              {isEditingName && (
                <TextField
                  borderless={!isEditingName}
                  defaultValue={marketItem.name}
                  styles={{
                    field: {
                      fontSize: '20px',
                      fontWeight: '600',
                    },
                    fieldGroup: {
                      width: '800px',
                    },
                    root: {
                      marginLeft: '-12px',
                    },
                  }}
                  onChange={debounce((_, name) => {
                    marketItemDispatch({ type: 'updateItem', value: { name } });
                    if (isEmpty(name)) {
                      showEmptyNameError();
                    } else {
                      hideEmptyNameError();
                    }
                    setItemUpdateTrue();
                  }, 100)}
                  onBlur={() => {
                    setIsEditingNameFalse();
                    update();
                  }}
                  errorMessage={
                    emptyNameError ? 'Empty name is invalid.' : undefined
                  }
                  autoFocus={isEditingName}
                />
              )}
              {!isEditingName && (
                <Stack gap='m' horizontal verticalAlign='center'>
                  <Text variant='xLarge'>{marketItem.name}</Text>
                  <IconButton
                    iconProps={{ iconName: 'Edit' }}
                    title='Edit'
                    ariaLabel='Edit'
                    onClick={() => {
                      setIsEditingNameTrue();
                    }}
                  />
                </Stack>
              )}
              {isEditingSummary && (
                <TextField
                  borderless={!isEditingSummary}
                  defaultValue={marketItem.summary}
                  styles={{
                    field: {
                      fontSize: '16px',
                      fontWeight: '400',
                    },
                    fieldGroup: {
                      width: '800px',
                    },
                    root: {
                      marginLeft: '-12px',
                    },
                  }}
                  onChange={debounce((_, summary) => {
                    marketItemDispatch({
                      type: 'updateItem',
                      value: { summary },
                    });
                    setItemUpdateTrue();
                  }, 100)}
                  onBlur={() => {
                    setIsEditingSummaryFalse();
                    update();
                  }}
                  autoFocus={isEditingSummary}
                />
              )}
              {!isEditingSummary && (
                <Stack gap='m' horizontal verticalAlign='center'>
                  <Text variant='large'>{marketItem.summary}</Text>
                  <IconButton
                    iconProps={{ iconName: 'Edit' }}
                    title='Edit'
                    ariaLabel='Edit'
                    onClick={() => {
                      setIsEditingSummaryTrue();
                    }}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>

          <DefaultButton
            styles={{ root: { height: '30px', background: 'white' } }}
            menuProps={menuProps}
            menuIconProps={{
              iconName: 'More',
              styles: { root: { fontSize: '20px' } },
            }}
          />
        </Stack>
        <Stack
          horizontal
          verticalAlign='center'
          horizontalAlign='space-between'
        >
          <Stack horizontal gap='l1'>
            <TooltipHost
              calloutProps={{
                isBeakVisible: false,
              }}
              delay={0}
              tooltipProps={{
                onRenderContent: () => <Text>Author</Text>,
              }}
            >
              <Stack horizontal gap='s1'>
                <Icon iconName='Contact' />
                <Text>{marketItem.author}</Text>
              </Stack>
            </TooltipHost>
            <VerticalLine />
            <TooltipHost
              calloutProps={{
                isBeakVisible: false,
              }}
              delay={0}
              tooltipProps={{
                onRenderContent: () => <Text>Update Time</Text>,
              }}
            >
              <Stack horizontal gap='s1'>
                <Icon iconName='Clock' />
                <Text>
                  {DateTime.fromISO(marketItem.updatedAt).toLocaleString()}
                </Text>
              </Stack>
            </TooltipHost>
            <VerticalLine />
            <TooltipHost
              calloutProps={{
                isBeakVisible: false,
              }}
              delay={0}
              tooltipProps={{
                onRenderContent: () => <Text>Type</Text>,
              }}
            >
              <Stack horizontal gap='s1'>
                <Text>{capitalize(marketItem.type)}</Text>
              </Stack>
            </TooltipHost>
            <VerticalLine />
            <AccessInfo
              marketItem={marketItem}
              marketItemDispatch={marketItemDispatch}
              api={api}
            />
          </Stack>
          <Stack horizontal gap='s1'>
            {marketItem.type === TYPE_ENUM.DATA_TEMPLATE &&
              marketItem.dataType === 'blob' && (
                <DefaultButton
                  text='Download'
                  onClick={async () => {
                    const fileName = getFileName(marketItem.dataUrl);
                    const res = await fetch(marketItem.dataUrl);
                    const content = await res.blob();
                    saveAs(content, fileName);
                  }}
                />
              )}
            {marketItem.type === TYPE_ENUM.DATA_TEMPLATE &&
              marketItem.dataType === 'github' && (
                <DefaultButton
                  text='Download'
                  onClick={async () => {
                    const fileName = getFileName(marketItem.dataUrl);
                    const res = await fetch(marketItem.dataUrl, {
                      mode: 'no-cors',
                    });
                    const content = await res.blob();
                    saveAs(content, fileName);
                  }}
                />
              )}
            <PrimaryButton
              text='Use'
              onClick={async () => {
                await clickUse();
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <CopyPopup
        isModalOpen={isCopyPopupOpen}
        hideModal={hideCopyPopup}
        marketItem={marketItem}
        marketItemDispatch={marketItemDispatch}
      />
      <EditPopup
        isModalOpen={isEditPopupOpen}
        hideModal={hideEditPopup}
        marketItem={marketItem}
        marketItemDispatch={marketItemDispatch}
      />
    </Wrapper>
  );
}

Summary.propTypes = {
  marketItem: PropTypes.object,
  marketItemDispatch: PropTypes.func,
  api: PropTypes.string,
};
