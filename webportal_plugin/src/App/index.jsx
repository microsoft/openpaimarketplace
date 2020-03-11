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
          render={({history}) => (
            <MarketList api={api} user={user} token={token} history={history} />
          )}
        />
        <Route
          path={`/market_detail`}
          render={({history}) => <MarketDetail api={api} history={history} />}
        />
      </Router>
    </Fabric>
  );
};

export default App;
