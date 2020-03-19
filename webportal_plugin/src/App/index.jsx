import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Fabric } from "office-ui-fabric-react";

import MarketList from "../app/market_list";
import MarketDetail from "../app/market_detail";

const App = props => {
  const { api, user, token } = props;

  return (
    <Fabric style={{ height: "100%" }}>
      <Router>
        <Route
          path="/"
          exact
          render={props => (
            <MarketList api={api} user={user} routeProps={props} />
          )}
        />
        <Route
          path={`/market_detail`}
          render={props => (
            <MarketDetail api={api} user={user} routeProps={props} />
          )}
        />
      </Router>
    </Fabric>
  );
};

export default App;
