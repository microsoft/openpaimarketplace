/*
 * Copyright (c) Microsoft Corporation
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";

import React, { useState, useEffect } from "react";
import { initializeIcons, Fabric, Stack } from "office-ui-fabric-react";
import { isNil } from "lodash";

import { initTheme } from "../components/theme";
import { TopBar } from "./components/top_bar";
import { CategorySideBar } from "./components/category_side_bar";
import { FilterBar } from "./components/filter_bar";
import { ItemList } from "./components/item_list";
import { MarketItem } from "../models/market_item";
import Context from "./context";
import Filter from "./filter";
import Paginator from "./components/paginator";
import Pagination from "./pagination";
import { MARKETPLACE_API } from "../utils/constants";

initTheme();
initializeIcons();

const MarketList = props => {
  const { api, user, token } = props;

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
    const nextState = {
      loading: false,
      reloading: false,
      error: null,
      itemList: []
    };

    try {
      const items = await fetchMarketItemList();
      items.forEach(item => {
        const marketItem = new MarketItem(
          item.id,
          item.name,
          item.author,
          item.createdAt,
          item.updatedAt,
          item.category,
          item.tags,
          item.introduction,
          item.description,
          item.jobConfig,
          item.submits,
          item.starNumber,
          item.status
        );
        nextState.itemList.push(marketItem);
      });

      setItemList(nextState.itemList);
    } catch (err) {
      alert(err.message);
    }
  }

  const context = {
    itemList,
    filteredItems, // used in <ItemList>
    filter, // changed in <SearchBox>
    setFilter, // used in <SearchBox>
    pagination,
    setPagination,
    api,
    user,
    token
  };

  return (
    <Context.Provider value={context}>
      <Fabric style={{ height: "100%", margin: "0 auto", maxWidth: 1200 }}>
        <Stack padding="l1" gap="l1">
          <TopBar />
          <Stack horizontal gap="l2">
            <CategorySideBar />
            <Stack.Item grow>
              <Stack gap="s" styles={{ root: [{ minWidth: 0 }] }}>
                <FilterBar />
                {/* <ItemListScroller /> */}
                <ItemList />
              </Stack>
            </Stack.Item>
          </Stack>
        </Stack>
      </Fabric>
    </Context.Provider>
  );

  async function fetchMarketItemList() {
    const url = `${MARKETPLACE_API}/items`;
    const res = await fetch(url);
    if (res.ok) {
      const items = await res.json();
      // order by updateDate
      // items.sort(function(a, b) {
      //   return new Date(b.updatedAt) - new Date(a.updatedAt);
      // });
      return items;
    } else {
      throw new Error(res.statusText);
    }
  }
};

export default MarketList;
