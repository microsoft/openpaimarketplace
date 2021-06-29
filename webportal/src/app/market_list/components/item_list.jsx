// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import { Stack, Text, getTheme, ActionButton } from 'office-ui-fabric-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { capitalize, isNil, isEmpty } from 'lodash';
import ItemCard from './item_card';
import HorizontalLine from 'App/components/horizontal_line';
import { listItems } from 'App/utils/marketplace_api';
import Loading from 'App/components/loading';

const { spacing, palette } = getTheme();

const isOfficial = item => {
  return (
    !isNil(item.ItemCategories) &&
    item.ItemCategories.some(category => category.name === 'official example')
  );
};

const Section = styled.div`
  padding: ${spacing.m};
  background: ${palette.white};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m};
`;

const ItemList = props => {
  const { type, author, keyword, category } = props;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPartialOfficial, setIsPartialOfficial] = useState(true);
  const [isPartialPublic, setIsPartialPublic] = useState(true);
  const [isPartialPrivate, setIsPartialPrivate] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const items = await listItems(type, author, keyword, category);
        setItems(items);
        setLoading(false);
      } catch (e) {
        alert(e.message);
        setItems([]);
        setLoading(false);
      }
    }
    fetchData();
  }, [type, author, keyword, category]);

  return (
    <div>
      {loading && (
        <div style={{ height: '400px' }}>
          <Loading />
        </div>
      )}
      {!loading && (
        <Stack gap={spacing.m}>
          <Text variant={'xxLarge'}>
            {isNil(type) ? 'All' : capitalize(type)}
          </Text>
          <HorizontalLine />
          <Section>
            <Stack gap='s1'>
              <Text variant={'large'}>Official</Text>
              {!isEmpty(
                items.filter(item => {
                  return isOfficial(item);
                }),
              ) && (
                <div>
                  <GridWrapper>
                    {isPartialOfficial
                      ? items
                          .filter(item => {
                            return isOfficial(item);
                          })
                          .slice(0, 6)
                          .map(item => <ItemCard key={item.id} item={item} />)
                      : items
                          .filter(item => {
                            return isOfficial(item);
                          })
                          .map(item => <ItemCard key={item.id} item={item} />)}
                  </GridWrapper>
                  {isPartialOfficial ? (
                    <ActionButton
                      onClick={() => {
                        setIsPartialOfficial(false);
                      }}
                      iconProps={{ iconName: 'Add' }}
                    >
                      More
                    </ActionButton>
                  ) : (
                    <ActionButton
                      onClick={() => {
                        setIsPartialOfficial(true);
                      }}
                      iconProps={{ iconName: 'Remove' }}
                    >
                      Less
                    </ActionButton>
                  )}
                </div>
              )}
            </Stack>
          </Section>
          <Section>
            <Text variant={'large'}>Public</Text>
            {!isEmpty(
              items.filter(item => {
                return !isOfficial(item) && item.isPublic;
              }),
            ) && (
              <div>
                <GridWrapper>
                  {isPartialPublic
                    ? items
                        .filter(item => {
                          return !isOfficial(item) && item.isPublic;
                        })
                        .slice(0, 6)
                        .map(item => <ItemCard key={item.id} item={item} />)
                    : items
                        .filter(item => {
                          return !isOfficial(item) && item.isPublic;
                        })
                        .map(item => <ItemCard key={item.id} item={item} />)}
                </GridWrapper>
                {isPartialPublic ? (
                  <ActionButton
                    onClick={() => {
                      setIsPartialPublic(false);
                    }}
                    iconProps={{ iconName: 'Add' }}
                  >
                    More
                  </ActionButton>
                ) : (
                  <ActionButton
                    onClick={() => {
                      setIsPartialPublic(true);
                    }}
                    iconProps={{ iconName: 'Remove' }}
                  >
                    Less
                  </ActionButton>
                )}
              </div>
            )}
          </Section>
          <Section>
            <Text variant={'large'}>Private</Text>
            {!isEmpty(
              items.filter(item => {
                return !isOfficial(item) && item.isPrivate;
              }),
            ) && (
              <div>
                <GridWrapper>
                  {isPartialPrivate
                    ? items
                        .filter(item => {
                          return !isOfficial(item) && item.isPrivate;
                        })
                        .slice(0, 6)
                        .map(item => <ItemCard key={item.id} item={item} />)
                    : items
                        .filter(item => {
                          return !isOfficial(item) && item.isPrivate;
                        })
                        .map(item => <ItemCard key={item.id} item={item} />)}
                </GridWrapper>
                {isPartialPrivate ? (
                  <ActionButton
                    onClick={() => {
                      setIsPartialPrivate(false);
                    }}
                    iconProps={{ iconName: 'Add' }}
                  >
                    More
                  </ActionButton>
                ) : (
                  <ActionButton
                    onClick={() => {
                      setIsPartialPrivate(true);
                    }}
                    iconProps={{ iconName: 'Remove' }}
                  >
                    Less
                  </ActionButton>
                )}
              </div>
            )}
          </Section>
        </Stack>
      )}
    </div>
  );
};

ItemList.propTypes = {
  type: PropTypes.string,
  author: PropTypes.string,
  keyword: PropTypes.string,
  category: PropTypes.string,
};

export default ItemList;
