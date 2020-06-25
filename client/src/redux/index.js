import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import products from './products';
import orders from './orders';
import users from './users';
import { LOGOUT_SUCCESS } from './auth';

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== LOGOUT_SUCCESS) return rootReducer(state, action);

  const newState = rootReducer(undefined, {});

  return newState;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

const reducer = combineReducers({
  auth,
  categories,
  products,
  orders,
  users,
});

const store = createStore(
  resetEnhancer(reducer),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
