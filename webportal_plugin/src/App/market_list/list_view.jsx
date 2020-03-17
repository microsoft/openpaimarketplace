import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";

import React, { useState, useEffect, useContext } from "react";
import { Fabric, Stack, getTheme } from "office-ui-fabric-react";
import { isNil } from "lodash";

import { TopBar } from "../components/top_bar";
import { CategorySideBar } from "./components/category_side_bar";
import { FilterBar } from "./components/filter_bar";
import { ItemList } from "./components/item_list";
import { MarketItem } from "../models/market_item";
import Context from "App/context";
import Filter from "../models/filter";
import Paginator from "../components/paginator";
import Pagination from "../models/pagination";
import {
  getApprovedItems,
  ensureUser,
  getPendingItems
} from "App/utils/marketplace_api";

const ListView = props => {
  const { status } = props;
  const { user } = useContext(Context);
  const { spacing } = getTheme();

  const [itemList, setItemList] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [filter, setFilter] = useState(new Filter());
  const [pagination, setPagination] = useState(new Pagination());

  useEffect(() => {
    setFilteredItems(filter.apply(itemList));
  }, [itemList, filter]);

  useEffect(() => {
    setPagination(new Pagination(pagination.itemsPerPage, 0));
  }, [filteredItems]);

  useEffect(() => {
    reload();
  }, []);

  async function reload() {
    let itemList = [];
    try {
      await ensureUser(user);
      let items;
      if (status === "approved") {
        items = await getApprovedItems();
      } else {
        items = await getPendingItems();
      }
      items.forEach(item => {
        const marketItem = new MarketItem({
          id: item.id,
          name: item.name,
          author: item.author,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          category: item.category,
          tags: item.tags,
          introduction: item.introduction,
          description: item.description,
          jobConfig: item.jobConfig,
          submits: item.submits,
          starNumber: item.starNumber,
          status: item.status
        });
        itemList.push(marketItem);
      });

      setItemList(itemList);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Stack styles={{ root: { paddingTop: spacing.l1 } }} gap="l1">
      <Stack gap="s" styles={{ root: [{ minWidth: 0 }] }}>
        <FilterBar
          itemList={itemList}
          filteredItems={filteredItems}
          filter={filter}
          setFilter={setFilter}
        />
        <ItemList
          filteredItems={filteredItems}
          setFilter={setFilter}
          pagination={pagination}
          status={status}
        />
      </Stack>
      {!isNil(filteredItems) && filteredItems.length > 5 && (
        <Paginator
          items={filteredItems}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </Stack>
  );
};

export default ListView;
