import React from 'react';

import { Route, Switch } from "react-router-dom";

import Layout from "./components/stateful/Layout/Layout"
import BurgerBuilder from './components/stateful/BurgerBuilder/BurgerBuilder';
import Checkout from "./components/stateful/Checkout/Checkout"

function App() {
  return (
    <div >
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
