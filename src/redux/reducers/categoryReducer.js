import { ADD_TO_CATEGORY } from "../actions/categoryAction";

const initState = {
  main: [],
  sub: [],
};

const categoryReducer = (state = initState, action) => {
  if (action.type === ADD_TO_CATEGORY) {
    return {
      ...state,
      main: action.payload.main,
      sub: action.payload.sub,
    };
  }

  return state;
};

export default categoryReducer;
