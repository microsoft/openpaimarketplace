import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";

import React, { useState, useEffect } from "react";
import { Fabric, Stack, Pivot, PivotItem } from "office-ui-fabric-react";
import { isNil } from "lodash";
import qs from "query-string";

import { TopBar } from "App/top_bar";
import Context from "../context";
import ListView from "./list_view";

import { getPendingItems, ensureUser } from "App/utils/marketplace_api";

const MarketList = props => {
  const { api, user, routeProps } = props;
  const admin = cookies.get("admin");

  const [status, setStatus] = useState(initStatus());
  const [pendingListNumber, setPendingListNumber] = useState(0);

  function initStatus() {
    const status = qs.parse(routeProps.location.search).status;
    if (!admin) {
      return "approved";
    }
    if (isNil(status)) {
      return "approved";
    } else if (status === "pending") {
      return "pending";
    } else {
      return "approved";
    }
  }

  const context = {
    api,
    user,
    history: routeProps.history
  };

  useEffect(() => {
    ensureUser(user);
  }, []);

  useEffect(() => {
    countPending();
  }, [status]);

  async function countPending() {
    try {
      const items = await getPendingItems();
      setPendingListNumber(items.length);
    } catch (err) {
      alert(err.message);
    }
  }

  function clickPivot(item) {
    if (item.props.headerText === "Market list") {
      setStatus("approved");
    } else {
      setStatus("pending");
    }
  }

  return (
    <Context.Provider value={context}>
      <Fabric style={{ height: "100%", margin: "0 auto", maxWidth: 1050 }}>
        <Stack padding="l1" gap="m">
          <TopBar pageType="list" status={status} />
          <Pivot onLinkClick={clickPivot} selectedKey={status}>
            <PivotItem
              itemKey="approved"
              headerText="Market list"
              itemIcon="Bank"
            >
              <ListView status={status} />
            </PivotItem>
            {admin && (
              <PivotItem
                itemKey="pending"
                headerText="Pending list"
                itemIcon="IssueTrackingMirrored"
                itemCount={pendingListNumber}
              >
                <ListView status={status} />
              </PivotItem>
            )}
          </Pivot>
        </Stack>
      </Fabric>
    </Context.Provider>
  );
};

export default MarketList;
