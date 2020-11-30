// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultButton,
  PrimaryButton,
  Stack,
  Text,
  getTheme,
  Icon,
  TooltipHost,
} from 'office-ui-fabric-react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from 'lodash';
import { DateTime } from 'luxon';
import { saveAs } from 'file-saver';
import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as JobIcon } from 'App/assets/job.svg';
import VerticalLine from 'App/components/vertical_line';
import { generateJobProtocol } from '../utils/generate_job_protocol';
import { getFileName } from 'App/utils/file_name_util';
import Context from 'App/context';
import { TYPE_ENUM } from 'App/utils/constants';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

export default function Summary(props) {
  const { marketItem } = props;
  const { user } = useContext(Context);

  async function clickUse() {
    try {
      const jobProtocol = await generateJobProtocol(marketItem, user);
      window.localStorage.removeItem('marketItem');
      window.localStorage.setItem('marketItem', JSON.stringify(jobProtocol));
      window.location.href = `/submit.html`;
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Wrapper>
      <Stack gap={'l1'}>
        <Stack horizontal verticalAlign='center' gap='l2'>
          {marketItem.type === TYPE_ENUM.DATA_TEMPLATE && <DataIcon />}
          {marketItem.type === TYPE_ENUM.JOB_TEMPLATE && <JobIcon />}
          {marketItem.type === TYPE_ENUM.OLD_TEMPLATE && <JobIcon />}
          <Stack gap='m'>
            <Text variant={'xLarge'}>{marketItem.name}</Text>
            <Text variant={'large'}>{marketItem.summary}</Text>
          </Stack>
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
                onRenderContent: () => <Text>Create Time</Text>,
              }}
            >
              <Stack horizontal gap='s1'>
                <Icon iconName='Clock' />
                <Text>
                  {DateTime.fromISO(marketItem.createdAt).toLocaleString()}
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
    </Wrapper>
  );
}

Summary.propTypes = {
  marketItem: PropTypes.object,
};
