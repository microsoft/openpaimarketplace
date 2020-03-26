import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Text,
  Stack,
  DefaultButton,
  PrimaryButton,
  TooltipHost,
  FontWeights,
  Link,
} from 'office-ui-fabric-react';
import { getTheme } from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { isNil } from 'lodash';

import { TagBar } from 'App/components/tag_bar';
import ConfirmDialog from 'App/components/confirm_dialog';
import Card from 'App/components/card';
import Context from 'App/context';
import { increaseSubmits } from 'App/utils/marketplace_api';

const ItemCard = props => {
  const { item, status } = props;
  const { spacing } = getTheme();

  const { history } = useContext(Context);
  const [hideApproveDialog, setHideApproveDialog] = useState(true);
  const [hideRejectDialog, setHideRejectDialog] = useState(true);

  const clickSubmit = async () => {
    // save jobConfig to localStorage
    window.localStorage.removeItem('marketItem');
    window.localStorage.setItem('marketItem', JSON.stringify(item.jobConfig));
    await increaseSubmits(item.id);
    if (isJobV2(item.jobConfig)) {
      window.location.href = `/submit.html`;
    } else {
      window.location.href = `/submit_v1.html`;
    }
  };

  const isJobV2 = jobConfig => {
    return (
      !isNil(jobConfig.protocol_version) || !isNil(jobConfig.protocolVersion)
    );
  };

  const populateCreatedTime = () => {
    const uploadedTime = Math.floor(
      Math.abs(new Date() - new Date(item.createdAt)) / 1000 / 3600 / 24,
    );
    return uploadedTime === 0
      ? 'not long ago'
      : uploadedTime + (uploadedTime > 1 ? ' days ago' : ' day ago');
  };

  return (
    <Card key={item.Id}>
      <Stack>
        <Stack horizontal horizontalAlign='space-between' gap='l2'>
          <Stack gap='l1' styles={{ root: [{ width: '80%' }] }}>
            <Link
              styles={{
                root: {
                  fontSize: 16,
                  fontWeight: FontWeights.semibold,
                },
              }}
              onClick={() => {
                window.localStorage.removeItem('itemId');
                window.localStorage.setItem('itemId', item.id);
                history.push(`/market_detail?itemId=${item.id}`);
              }}
            >
              {item.name}
            </Link>
            <Text
              styles={{
                root: {
                  fontSize: 14,
                  fontWeight: FontWeights.regular,
                },
              }}
            >
              Author: {item.author}
            </Text>
            <Text
              nowrap
              styles={{
                root: {
                  fontSize: 14,
                  fontWeight: FontWeights.regular,
                },
              }}
            >
              {item.introduction}
            </Text>
            <TagBar tags={item.tags} />
            <Stack
              styles={{
                root: {
                  fontSize: 12,
                  fontWeight: FontWeights.regular,
                },
              }}
            >
              created {populateCreatedTime()}
            </Stack>
          </Stack>
          <Stack gap='l2'>
            <Stack horizontal gap='l2'>
              <TooltipHost
                content='submits'
                styles={{
                  root: {
                    display: status === 'pending' ? 'none ' : 'inline-block',
                  },
                }}
              >
                <Stack horizontal gap='s1'>
                  <Icon iconName='Copy' />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: FontWeights.regular,
                    }}
                  >
                    {item.submits}
                  </div>
                </Stack>
              </TooltipHost>
              <TooltipHost
                content='stars'
                styles={{
                  root: {
                    display: status === 'pending' ? 'none ' : 'inline-block',
                  },
                }}
              >
                <Stack horizontal gap='s1'>
                  <Icon iconName='Like' />
                  <div
                    style={{
                      fontSize: 12,
                      FontWeights: FontWeights.regular,
                    }}
                  >
                    {item.starNumber}
                  </div>
                </Stack>
              </TooltipHost>
            </Stack>
            <Stack gap='m' styles={{ root: [{ paddingRight: spacing.l2 }] }}>
              {status === 'approved' && (
                <PrimaryButton
                  styles={{
                    root: {
                      fontSize: 14,
                      fontWeight: FontWeights.regular,
                    },
                  }}
                  onClick={clickSubmit}
                >
                  Submit
                </PrimaryButton>
              )}
              {status === 'pending' && (
                <PrimaryButton
                  styles={{
                    root: {
                      fontSize: 14,
                      fontWeight: FontWeights.regular,
                    },
                  }}
                  onClick={e => {
                    setHideApproveDialog(false);
                  }}
                >
                  Approve
                </PrimaryButton>
              )}
              <ConfirmDialog
                hideDialog={hideApproveDialog}
                setHideDialog={setHideApproveDialog}
                action='approve'
                inDetail={true}
                itemId={item.id}
              />
              {status === 'approved' && (
                <DefaultButton
                  styles={{
                    root: {
                      fontSize: 14,
                      fontWeight: FontWeights.regular,
                    },
                  }}
                  onClick={() => {
                    window.localStorage.removeItem('itemId');
                    window.localStorage.setItem('itemId', item.id);
                    history.push(`/market_detail?itemId=${item.id}`);
                  }}
                >
                  View
                </DefaultButton>
              )}
              {status === 'pending' && (
                <DefaultButton
                  styles={{
                    root: {
                      fontSize: 14,
                      fontWeight: FontWeights.regular,
                    },
                  }}
                  onClick={e => {
                    setHideRejectDialog(false);
                  }}
                >
                  Reject
                </DefaultButton>
              )}
              <ConfirmDialog
                hideDialog={hideRejectDialog}
                setHideDialog={setHideRejectDialog}
                action='reject'
                pageType='list'
                itemId={item.id}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default ItemCard;
