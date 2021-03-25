// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultButton,
  PrimaryButton,
  Stack,
  Text,
  getTheme,
  mergeStyleSets,
  FontWeights,
  Callout,
  Icon,
  TooltipHost,
} from 'office-ui-fabric-react';
import React, { useContext } from 'react';
import { useBoolean, useId } from '@uifabric/react-hooks';
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
import { deleteItem } from 'App/utils/marketplace_api';

const { spacing, palette } = getTheme();
const theme = getTheme();

const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300,
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});


const ProtectedInfo = (props) => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const { groupList} = props;
  console.log(groupList);
  const groupListItems = groupList.map((group) => <li>{group}</li>);
  const labelId = useId('protected-callout-label');
  const descriptionId = useId('share-to-group-list');
  return (
    <>
      <div className={styles.buttonArea}>
        <div onClick={toggleIsCalloutVisible}>Protected</div>
      </div>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          gapSpace={0}
          target={`.${styles.buttonArea}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <div className={styles.header}>
            <Text className={styles.title} id={labelId}>
              Share-to group list
            </Text>
          </div>
          <div className={styles.inner}>
            <ul>{groupListItems}</ul>
          </div>
        </Callout>
      )}
    </>
  );
};

export const AccessInfo = (props) => {
  const { isPublic, isPrivate, groupList } = props;
  if (isPublic) {
    return <Text>Public</Text>;
  } else if (isPrivate) {
    return <Text>Private</Text>;
  } else {
    return <ProtectedInfo groupList={groupList} />;
  }
}
