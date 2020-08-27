import React from 'react';

import Layout from "./components/stateful/Layout/Layout"
import BurgerBuilder from './components/stateful/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div >
      <Layout>
      </Layout>
      <BurgerBuilder />
    </div>
  );
}

export default App;
