import React from "react";
import {
  Stack,
  Link,
  ColorClassNames,
  FontWeights,
  FontSizes
} from "office-ui-fabric-react";
import c from "classnames";
import t from "../../components/tachyons.scss";
import { FontClassNames } from "@uifabric/styling";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { isNil } from "lodash";

import Filter from "../../models/filter";
import ItemCard from "./item_card";

export const ItemList = props => {
  const { filteredItems, setFilter, pagination, status } = props;

  if (isNil(filteredItems)) {
    return <Stack> </Stack>;
  } else if (filteredItems.length === 0) {
    return (
      <div className={c(t.h100, t.flex, t.itemsCenter, t.justifyCenter)}>
        <div className={c(t.tc)}>
          <div>
            <Icon
              className={c(ColorClassNames.themePrimary)}
              style={{ fontSize: FontSizes.xxLarge }}
              iconName="Error"
            />
          </div>
          <div
            className={c(t.mt5, FontClassNames.xLarge)}
            style={{ fontWeight: FontWeights.semibold }}
          >
            No results matched your search.
          </div>
          <div className={c(t.mt4, FontClassNames.mediumPlus)}>
            You could search{" "}
            <Link onClick={() => setFilter(new Filter())}>
              all the marketItems
            </Link>{" "}
            or try advanced search with Filters.
          </div>
        </div>
      </div>
    );
  } else {
    const items = pagination.apply(filteredItems);
    return (
      <Stack>
        {items.map(item => (
          <ItemCard key={item.id} item={item} status={status} />
        ))}
      </Stack>
    );
  }
};
