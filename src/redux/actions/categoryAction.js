export const ADD_TO_CATEGORY = "ADD_TO_CATEGORY";

export const setCategory = (payload) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CATEGORY, payload: payload });
  };
};
