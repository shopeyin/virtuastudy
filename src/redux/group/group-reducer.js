import GroupActionTypes from "./group-type";
const INITIAL_STATE = {
  group: [],
  loading: false,
  hasErrors: false,
};

const groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GroupActionTypes.GET_GROUPS:
      return { ...state, loading: true };
    case GroupActionTypes.SET_GROUP:

      return { group: action.payload, loading: false, hasErrors: false };

    case GroupActionTypes.GET_GROUP_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
};

export default groupReducer;
