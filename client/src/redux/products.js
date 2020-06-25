// Action Types
const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

const initialState = {
  items: [],
  isFetching: false,
  isCreating: false,
};
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        items: [...state.items, action.product],
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        isCreating: false,
      };
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.products,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

// Action Creators
const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  product,
});

const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  error,
});

const getProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});

const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  products,
});

const getProductsFailure = (error) => ({
  type: GET_PRODUCTS_FAILURE,
  error,
});

export const createProduct = (inputData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return dispatch(createProductFailure('Access token not found'));
    }
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(inputData),
    });
    const { status, data, error } = await response.json();
    if (response.ok) {
      if (status === 'success') {
        dispatch(createProductSuccess(data.product));
      } else {
        dispatch(createProductFailure(error));
      }
    }
  } catch (error) {
    dispatch(createProductFailure(error));
  }
};

export const getProducts = () => async (dispatch) => {
  dispatch(getProductsRequest());
  try {
    const response = await fetch('/api/products');
    const { status, data, error } = await response.json();
    if (response.ok) {
      if (status === 'success') {
        dispatch(getProductsSuccess(data.products));
      } else {
        dispatch(getProductsFailure(error));
      }
    }
  } catch (error) {
    dispatch(getProductsFailure(error));
  }
};

export const updateProduct = () => async (dispatch) => {};
