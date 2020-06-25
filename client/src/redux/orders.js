// Action Types
const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

const initialState = {
  items: [],
  isFetching: false,
};
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Action Creators
const getOrdersRequest = () => ({
  type: GET_ORDERS_REQUEST,
});

const getOrdersSuccess = () => ({
  type: GET_ORDERS_SUCCESS,
});

const getOrdersFailure = () => ({
  type: GET_ORDERS_FAILURE,
});

export const getOrders = () => async (dispatch) => {};
