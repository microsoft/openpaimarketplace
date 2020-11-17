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
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from 'lodash';
import { DateTime } from 'luxon';
import { saveAs } from 'file-saver';
import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as TemplateIcon } from 'App/assets/template.svg';
import VerticalLine from 'App/components/vertical_line';
import { generateJobProtocol } from '../utils/generate_job_protocol';
import { getFileName } from 'App/utils/fileNameUtil';
import Context from 'App/context';

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
          {marketItem.type === 'data' && <DataIcon />}
          {marketItem.type === 'template' && <TemplateIcon />}
          {marketItem.type === 'old' && <TemplateIcon />}
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
            {marketItem.type === 'data' && marketItem.dataType === 'blob' && (
              <DefaultButton
                text='download'
                onClick={async () => {
                  const fileName = getFileName(marketItem.dataUrl);
                  const res = await fetch(marketItem.dataUrl);
                  const content = await res.blob();
                  saveAs(content, fileName);
                }}
              />
            )}
            {marketItem.type === 'data' && marketItem.dataType === 'github' && (
              <DefaultButton
                text='download'
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
              text='use'
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
