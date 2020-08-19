import React from 'react';

import Layout from "./components/Layout/Layout"
import BurgerBuilder from './components/stateful/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div >
      <Layout>
        <p>Hello, world!</p>
      </Layout>
      <BurgerBuilder />
    </div>
  );
}

export default App;
