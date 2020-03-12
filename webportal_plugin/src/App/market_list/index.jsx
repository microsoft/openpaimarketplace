import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";

import React, { useState, useEffect } from "react";
import { Fabric, Stack } from "office-ui-fabric-react";
import { isNil } from "lodash";

import { TopBar } from "./components/top_bar";
import { CategorySideBar } from "./components/category_side_bar";
import { FilterBar } from "./components/filter_bar";
import { ItemList } from "./components/item_list";
import { MarketItem } from "../models/market_item";
import Context from "../context";
import Filter from "../models/filter";
import Paginator from "../components/paginator";
import Pagination from "../models/pagination";
import { getItems, ensureUser } from "../utils/marketplace_api";

const MarketList = props => {
  const { api, user, token, history } = props;

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
      const items = await getItems();
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

  const context = {
    api,
    user,
    token,
    history
  };

  return (
    <Context.Provider value={context}>
      <Fabric style={{ height: "100%", margin: "0 auto", maxWidth: 1200 }}>
        <Stack padding="l1" gap="l1">
          <TopBar />
          <Stack horizontal gap="l2">
            <CategorySideBar filter={filter} setFilter={setFilter} />
            <Stack.Item grow>
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
                />
              </Stack>
              {!isNil(filteredItems) && filteredItems.length > 5 && (
                <Paginator
                  items={filteredItems}
                  pagination={pagination}
                  setPagination={setPagination}
                />
              )}
            </Stack.Item>
          </Stack>
        </Stack>
      </Fabric>
    </Context.Provider>
  );
};

export default MarketList;
