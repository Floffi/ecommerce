import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../../routes/Home';
import Shop from '../../routes/Shop';
import Cart from '../../routes/Cart';
import Product from '../../routes/Product';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route path='/product/:productId' component={Product} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
