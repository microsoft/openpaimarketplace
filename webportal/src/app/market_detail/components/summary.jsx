// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PrimaryButton,
  Stack,
  Text,
  getTheme,
  Icon,
  TooltipHost,
} from 'office-ui-fabric-react';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from 'lodash';
import { DateTime } from 'luxon';
import { ReactComponent as DataIcon } from 'App/assets/data.svg';
import { ReactComponent as TemplateIcon } from 'App/assets/template.svg';
import VerticalLine from 'App/components/vertical_line';
import { generateJobProtocol } from '../utils/generate_job_protocol';

const { spacing, palette } = getTheme();

const Wrapper = styled.div`
  background-color: ${palette.white};
  padding: ${spacing.l2};
`;

export default function Summary(props) {
  const { marketItem } = props;

  const clickUse = () => {
    const jobProtocol = generateJobProtocol(marketItem);
    window.localStorage.removeItem('marketItem');
    window.localStorage.setItem('marketItem', JSON.stringify(jobProtocol));
    window.location.href = `/submit.html`;
  };

  return (
    <Wrapper>
      <Stack gap={'l1'}>
        <Stack horizontal verticalAlign='center' gap='l2'>
          {marketItem.type === 'data' && <DataIcon />}
          {marketItem.type === 'template' && <TemplateIcon />}
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
          <PrimaryButton text='use' onClick={clickUse} />
        </Stack>
      </Stack>
    </Wrapper>
  );
}

Summary.propTypes = {
  marketItem: PropTypes.object,
};
