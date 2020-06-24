import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import refreshToken from '../../utilities/refreshToken';
import Layout from '../Layout';
import Home from '../../routes/Home';
import Shop from '../../routes/Shop';
import Cart from '../../routes/Cart';
import Product from '../../routes/Product';
import Register from '../../routes/Register';
import Login from '../../routes/Login';
import AuthRoute from '../AuthRoute';
import Dashboard from '../../routes/Dashboard';
import { loadSession } from '../../redux/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      const accessToken = localStorage.getItem('accessToken');
      // Check if we have access token.
      if (accessToken) {
        // Decode the access token.
        const { exp } = jwtDecode(accessToken);
        // If the access token is expired, go fetch a new one.
        if (Date.now() > exp * 1000) {
          await refreshToken();
        } else {
          setTimeout(refreshToken, exp * 1000 - Date.now());
        }
        dispatch(loadSession());
      }
    };

    initializeSession();
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route path='/product/:productId' component={Product} />
          <Route path='/dashboard/:section?' component={Dashboard} />
          <AuthRoute path='/register' component={Register} />
          <AuthRoute path='/login' component={Login} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
