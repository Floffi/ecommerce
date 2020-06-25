// Action Types

// Reducer
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
export const getUsers = () => async (dispatch) => {};
