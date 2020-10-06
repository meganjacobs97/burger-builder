import React from 'react';

import { Route, Switch } from "react-router-dom";

import Layout from "./components/stateful/Layout/Layout"
import BurgerBuilder from './components/stateful/BurgerBuilder/BurgerBuilder';
import Checkout from "./components/stateful/Checkout/Checkout"
import Orders from "./components/stateful/Orders/Orders"
import Auth from "./components/stateful/Auth/Auth"

function App() {
  return (
    <div >
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />

        </Switch>
      </Layout>
    </div>
  );
}

export default App;
