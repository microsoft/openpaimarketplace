
import React, { useContext, useState } from 'react';
import {
  Stack,
  Link,
  ColorClassNames,
  FontWeights,
  FontSizes,
} from 'office-ui-fabric-react';
import c from 'classnames';
import t from '../../components/tachyons.scss';
import { FontClassNames } from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { isNil } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import Context from '../context';
import Filter from '../Filter';
import ItemCard from './item-card';

const ItemListScroller = () => {
  const { filteredItems, setFilter } = useContext(Context);

  const [cards, setCards] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [index, setIndex] = useState(0);

  console.log(hasMoreItems);
  console.log(index);
  console.log(cards);

  function loadItems(page) {
    if (index < filteredItems.length - 1) {
      var newCards = cards;
      for (var i = index + 1; i <= index + 5 && i < filteredItems.length; i++) {
        newCards.push(filteredItems[i]);
      }
      setCards(newCards);
      setIndex(index + 5);
    } else {
      setHasMoreItems(false);
    }
  }

  if (isNil(filteredItems)) {
    return <Stack></Stack>;
  } else if (filteredItems.length === 0) {
    return (
      <div className={c(t.h100, t.flex, t.itemsCenter, t.justifyCenter)}>
        <div className={c(t.tc)}>
          <div>
            <Icon
              className={c(ColorClassNames.themePrimary)}
              style={{ fontSize: FontSizes.xxLarge }}
              iconName='Error'
            />
          </div>
          <div
            className={c(t.mt5, FontClassNames.xLarge)}
            style={{ fontWeight: FontWeights.semibold }}
          >
            No results matched your search.
          </div>
          <div className={c(t.mt4, FontClassNames.mediumPlus)}>
            You could search{' '}
            <Link onClick={() => setFilter(new Filter())}>
              all the marketItems
            </Link>{' '}
            or try advanced search with Filters.
          </div>
        </div>
      </div>
    );
  } else {
    // const items = pagination.apply(filteredItems);

    var items = [];
    cards.map((item, id) => {
      items.push(<ItemCard key={id} item={item} />);
    });

    const loader = (
      <div className='loader' key={0}>
        Loading...
      </div>
    );

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={e => loadItems(e)}
        hasMore={hasMoreItems}
        loader={loader}
      >
        {items}
      </InfiniteScroll>
    );
  }
};

export default ItemListScroller;
