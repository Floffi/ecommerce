import { combineReducers } from 'redux';

// Action Types
const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';
const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

const initialState = {
  items: [],
  isFetching: false,
  isCreating: false,
};
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isCreating: false,
        items: [...state.items, action.category],
      };
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        isCreating: false,
      };
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.categories,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

// Action Creators
const createCategoryRequest = () => ({
  type: CREATE_CATEGORY_REQUEST,
});

const createCategorySuccess = (category) => ({
  type: CREATE_CATEGORY_SUCCESS,
  category,
});

const createCategoryFailure = (error) => ({
  type: CREATE_CATEGORY_FAILURE,
  error,
});

const getCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST,
});

const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});

const getCategoriesFailure = (error) => ({
  type: GET_CATEGORIES_FAILURE,
  error,
});

const updateCategoryRequest = () => ({
  type: UPDATE_CATEGORY_REQUEST,
});

const updateCategorySuccess = () => ({
  type: UPDATE_CATEGORY_SUCCESS,
});

const updateCategoryFailure = () => ({
  type: UPDATE_CATEGORY_FAILURE,
});

export const createCategory = (category) => async (dispatch) => {
  dispatch(createCategoryRequest());
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return dispatch(createCategoryFailure('Access token not found'));
    }
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(category),
    });
    const { status, data, error } = await response.json();
    if (response.ok) {
      if (status === 'success') {
        dispatch(createCategorySuccess(data.category));
      } else {
        dispatch(createCategoryFailure(error));
      }
    }
  } catch (error) {
    dispatch(createCategoryFailure(error));
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch(getCategoriesRequest());
  try {
    const response = await fetch('/api/categories');
    const { status, data, error } = await response.json();
    if (response.ok) {
      if (status === 'success') {
        dispatch(getCategoriesSuccess(data.categories));
      } else {
        dispatch(getCategoriesFailure(error));
      }
    }
  } catch (error) {
    dispatch(getCategoriesFailure(error));
  }
};

export const updateCategory = (categoryId, inputData) => async (dispatch) => {
  dispatch(updateCategoryRequest());
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return dispatch(updateCategoryFailure('Access token not found'));
    }
    const response = await fetch(`/api/categories/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(inputData),
    });
    const { status, data, error } = await response.json();
    if (response.ok) {
      if (status === 'success') {
        dispatch(updateCategorySuccess(data.category));
      } else {
        dispatch(updateCategoryFailure(error));
      }
    }
  } catch (error) {
    dispatch(updateCategoryFailure(error));
  }
};
